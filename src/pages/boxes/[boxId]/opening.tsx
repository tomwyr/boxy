import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { useRouter } from "next/router"
import { Ref, useEffect, useRef, useState } from "react"
import Spinner from "../../../client/components/icons/spinner"
import { PageLayout } from "../../../client/components/page/layout"
import PageLoading from "../../../client/components/page/loading"
import { Box } from "../../../server/types/box"
import { BoxOpening } from "../../../server/types/boxOpening"
import { BoxStatus } from "../../../server/types/boxStatus"
import { Item } from "../../../server/types/item"
import { trpc } from "../../../utils/trpc"
import { ItemImage } from "../../../client/components/item/image"
import { ItemTile } from "../../../client/components/item/tile"

export default function BoxOpeningPage() {
  const initialStatus = useRef<BoxStatus | undefined>()
  const queryClient = useQueryClient()
  const router = useRouter()

  const boxId = router.query.boxId as string
  const { data: box } = trpc.getBox.useQuery(boxId)

  const invalidateQueries = () => {
    queryClient.invalidateQueries([
      getQueryKey(trpc.getBoxes),
      getQueryKey(trpc.getBox),
    ])
  }

  if (!initialStatus.current && box) {
    initialStatus.current = box.status
  }

  if (!box) {
    return <PageLoading />
  }

  const content = (() => {
    switch (initialStatus.current) {
      case "open":
        return <span>The box has already been opened.</span>
      case "closed":
        return <BoxOpener box={box} onBoxOpened={invalidateQueries} />
    }
  })()

  return (
    <PageLayout
      title="Opening"
      backAction={{
        label: "Box Details",
        onClick: () => router.push(`/boxes/${box.id}`),
      }}
    >
      {content}
    </PageLayout>
  )
}

interface BoxOpenerProps {
  box: Box
  onBoxOpened: () => void
}

function BoxOpener({ box, onBoxOpened }: BoxOpenerProps) {
  const { data: boxOpening, status } = trpc.openBox.useQuery(box.id)

  useEffect(() => {
    if (status == "success") {
      onBoxOpened()
    }
  }, [onBoxOpened, status])

  if (!boxOpening) {
    return <Spinner />
  }

  const items = getOpeningItems(box, boxOpening)

  if (!items) {
    return <span>Invalid items data.</span>
  }

  const itemsPastReward = 5
  const itemsCount = boxOpening.animation.rewardPosition + itemsPastReward
  const displayedItems = Array(itemsCount)
    .fill(0)
    .map((_, index) => items[index % items.length])

  return <OpeningAnimation items={displayedItems} boxOpening={boxOpening} />
}

interface OpeningAnimationProps {
  items: Item[]
  boxOpening: BoxOpening
}

function OpeningAnimation({ items, boxOpening }: OpeningAnimationProps) {
  const animationDelay = 1000
  const animationDuration = 5000

  const listRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), animationDelay)
    setTimeout(() => setAnimationDone(true), animationDelay + animationDuration)
  }, [])

  useEffect(() => {
    const rewardPosition = boxOpening.animation.rewardPosition
    const listWidth = listRef.current?.offsetWidth ?? 0

    const itemPadding = 16
    const itemWidth = 96
    const gapWidth = 8
    const segmentWidth = itemPadding + itemWidth + gapWidth
    const centerOffset = -(listWidth - segmentWidth) / 2

    const totalTranslation =
      rewardPosition * segmentWidth - gapWidth + centerOffset

    if (animate && listRef.current) {
      listRef.current.style.transform = `translateX(${-totalTranslation}px)`
    }
  }, [animate, boxOpening.animation.rewardPosition, items.length])

  return (
    <>
      <span className="py-2 inline-block text-2xl">Box items</span>
      <div className="overflow-x-hidden">
        <div
          ref={listRef}
          className={`flex gap-2 my-8 transition-transform duration-[5000ms]`}
        >
          {items.map((item, index) => {
            const opacity =
              animationDone && index != boxOpening.animation.rewardPosition
                ? "opacity-50"
                : ""

            return (
              <div
                key={index}
                className={`aspect-[2/1] p-2 w-min flex justify-center ${opacity}`}
              >
                <ItemImage url={item.imageUrl} />
              </div>
            )
          })}
        </div>

        {animationDone && (
          <>
            <span className="py-2 inline-block text-2xl">Reward</span>
            <ItemTile
              item={boxOpening.reward}
              bordered={true}
              selected={true}
            />
          </>
        )}
      </div>
    </>
  )
}

function getOpeningItems(box: Box, boxOpening: BoxOpening): Item[] | undefined {
  const items = boxOpening.animation.itemsOrder.map((itemId) =>
    box.items.find((item) => item.id == itemId),
  )

  if (items.some((item) => !item)) {
    return undefined
  }

  return items as Item[]
}

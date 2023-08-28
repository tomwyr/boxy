import { useRouter } from "next/router"
import { ItemTile } from "../../client/components/item/tile"
import { ListButtonItem } from "../../client/components/list/buttonItem"
import { PageLayout } from "../../client/components/page/layout"
import PageLoading from "../../client/components/page/loading"
import { Box } from "../../server/types/box"
import { Item } from "../../server/types/item"
import { trpc } from "../../utils/trpc"

export default function BoxDetails() {
  const router = useRouter()

  const boxId = router.query.boxId as string
  const { data: box } = trpc.getBox.useQuery(boxId)

  if (!box) {
    return <PageLoading />
  }

  return (
    <PageLayout
      title="Box"
      backAction={{
        label: "Boxes",
        onClick: () => router.push("/boxes"),
      }}
    >
      <h2 className="text-2xl mt-4">Items</h2>
      <BoxItems items={box.items} />

      <h2 className="text-2xl mt-4">Reward</h2>
      <BoxReward
        box={box}
        onOpenBox={() => router.push(`/boxes/${boxId}/opening`)}
      />
    </PageLayout>
  )
}

interface BoxItemsProps {
  items: Item[]
}

function BoxItems({ items }: BoxItemsProps) {
  return (
    <ul>
      {items.map((item) => (
        <ItemTile key={item.id} item={item} />
      ))}
    </ul>
  )
}

interface BoxRewardProps {
  box: Box
  onOpenBox: () => void
}

function BoxReward({ box, onOpenBox }: BoxRewardProps) {
  switch (box.status) {
    case "closed":
      return <ListButtonItem onClick={onOpenBox}>Open</ListButtonItem>
    case "open":
      return <ItemTile item={box.reward} />
  }
}

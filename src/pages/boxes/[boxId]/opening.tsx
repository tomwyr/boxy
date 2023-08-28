import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { PageLayout } from "../../../client/components/page/layout"
import { BoxStatus } from "../../../server/types/boxStatus"
import { trpc } from "../../../utils/trpc"
import PageLoading from "../../../client/components/page/loading"

export default function BoxOpening() {
  const initialStatus = useRef<BoxStatus | undefined>()
  const router = useRouter()

  const boxId = router.query.boxId as string
  const { data: box } = trpc.getBox.useQuery(boxId)

  if (!initialStatus.current && box) {
    initialStatus.current = box.status
  }

  if (!box) {
    return <PageLoading />
  }

  const content = (() => {
    switch (initialStatus.current) {
      case "open":
        return <BoxOpeningOpen />
      case "closed":
        return (
          <BoxOpeningClosed
            boxId={box.id}
            boxInitialStatus={initialStatus.current}
          />
        )
    }
  })()

  return (
    <PageLayout
      title="Box Opening"
      backAction={{
        label: "Box Details",
        onClick: () => router.push(`/boxes/${box.id}`),
      }}
    >
      {content}
    </PageLayout>
  )
}

function BoxOpeningOpen() {
  return <span>The box has already been opened.</span>
}

interface BoxOpeningClosedProps {
  boxId: string
  boxInitialStatus: BoxStatus
}

function BoxOpeningClosed({ boxId, boxInitialStatus }: BoxOpeningClosedProps) {
  const queryClient = useQueryClient()
  const { data: openBox, status } = trpc.openBox.useQuery(boxId)

  useEffect(() => {
    if (boxInitialStatus == "closed" && status == "success") {
      queryClient.invalidateQueries([
        getQueryKey(trpc.getBoxes),
        getQueryKey(trpc.getBox),
      ])
    }
  }, [boxInitialStatus, queryClient, status])

  return !openBox ? "Opening..." : `${openBox.reward.name} 🎉🎉🎉`
}

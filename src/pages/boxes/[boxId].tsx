import { useRouter } from "next/router"
import { ItemTile } from "../../client/components/item/tile"
import { ListButtonItem } from "../../client/components/list/buttonItem"
import { PageLayout } from "../../client/components/page/layout"
import PageLoading from "../../client/components/page/loading"
import { trpc } from "../../utils/trpc"

export default function BoxDetails() {
  const router = useRouter()

  const boxId = router.query.boxId as string
  const { data: box } = trpc.getBox.useQuery(boxId)

  if (!box) {
    return <PageLoading />
  }

  const rewardId = box.status == "open" ? box.reward.id : undefined

  return (
    <PageLayout
      title="Box"
      backAction={{
        label: "Boxes",
        onClick: () => router.push("/boxes"),
      }}
    >
      <h2 className="text-2xl my-4">Items</h2>
      <ul>
        {box.items.map((item) => {
          const selected = rewardId ? rewardId == item.id : false
          return (
            <ItemTile
              key={item.id}
              item={item}
              selected={selected}
              bordered={selected}
            />
          )
        })}
      </ul>

      {box.status == "closed" && (
        <ListButtonItem onClick={() => router.push(`/boxes/${boxId}/opening`)}>
          Open
        </ListButtonItem>
      )}
    </PageLayout>
  )
}

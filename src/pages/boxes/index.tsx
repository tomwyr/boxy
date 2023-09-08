import { useRouter } from "next/router"
import { ListButtonItem } from "../../client/components/list/buttonItem"
import { ListItem } from "../../client/components/list/item"
import { PageLayout } from "../../client/components/page/layout"
import PageLoading from "../../client/components/page/loading"
import { BoxStatusProps } from "../../client/utils/boxStatusProps"
import { Box } from "../../server/types/box"
import { trpc } from "../../utils/trpc"

export default function BoxesPage() {
  const router = useRouter()
  const { data: boxes } = trpc.getBoxes.useQuery()

  if (!boxes) {
    return <PageLoading />
  }

  return (
    <PageLayout title="Boxes">
      <ul>
        {boxes.length > 0 ? (
          <BoxesList
            items={boxes}
            onItemClick={(box) => router.push(`/boxes/${box.id}`)}
          />
        ) : (
          <span className="pb-2 inline-block text-gray-500">
            Not boxes yet.
          </span>
        )}
      </ul>

      <ListButtonItem onClick={() => router.push("/boxes/new")}>
        New Box
      </ListButtonItem>
    </PageLayout>
  )
}

interface BoxesListProps {
  items: Box[]
  onItemClick: (box: Box) => void
}

function BoxesList({ items, onItemClick }: BoxesListProps) {
  return items.map((box) => {
    const statusProps = BoxStatusProps(box.status)

    const fontStyle = box.status == "closed" && "font-bold"

    return (
      <ListItem
        key={box.id}
        className="hover:bg-slate-100"
        onClick={() => onItemClick(box)}
      >
        <span className={`${fontStyle}`}>{box.items.length} item(s)</span>
        <span className={`ml-auto ${fontStyle}`}>{statusProps.name}</span>
      </ListItem>
    )
  })
}

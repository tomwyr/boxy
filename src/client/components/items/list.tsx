import { useSubscription } from "observable-hooks"
import { ReactNode } from "react"
import { Item } from "../../../server/types/item"
import { trpc } from "../../../utils/trpc"
import { ItemTile } from "../item/tile"
import PageLoading from "../page/loading"
import { useItemsContext } from "./controller"

export interface ItemsListProps {
  onItemClick: (item: Item) => void
  selectedItemIds?: string[]
  headerItemBuilder?: (items: Item[]) => ReactNode
  footerItem?: ReactNode
}

export function ItemsList({
  onItemClick,
  selectedItemIds = [],
  headerItemBuilder,
  footerItem,
}: ItemsListProps) {
  const { data: items, refetch: refetchItems } = trpc.getItems.useQuery()
  const itemsContext = useItemsContext()
  useSubscription(itemsContext.itemsChangedEvents, () => refetchItems())

  if (!items) {
    return <PageLoading />
  }

  return (
    <>
      {headerItemBuilder?.(items)}

      <ul>
        {items.map((item) => (
          <ItemTile
            key={item.id}
            item={item}
            selected={selectedItemIds.includes(item.id)}
            onClick={() => onItemClick(item)}
          />
        ))}

        {footerItem}
      </ul>
    </>
  )
}

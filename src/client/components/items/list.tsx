import { useSubscription } from "observable-hooks"
import { ReactNode } from "react"
import { Item } from "../../../server/types/item"
import { trpc } from "../../../utils/trpc"
import { ItemTile } from "../item/tile"
import { useItemsContext } from "./controller"
import PageLoading from "../page/loading"

export interface ItemsListProps {
  onItemClick: (item: Item) => void
  selectedItemIds?: string[]
  footerItem?: ReactNode
}

export function ItemsList({
  onItemClick,
  selectedItemIds = [],
  footerItem,
}: ItemsListProps) {
  const { data: items, refetch: refetchItems } = trpc.getItems.useQuery()
  const itemsContext = useItemsContext()
  useSubscription(itemsContext.itemsChangedEvents, () => refetchItems())

  if (!items) {
    return <PageLoading />
  }

  return (
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
  )
}

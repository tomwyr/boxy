import { useSubscription } from "observable-hooks"
import { ReactNode } from "react"
import { Item } from "../../../../server/models/item"
import { trpc } from "../../../../utils/trpc"
import { useItemFormContext } from "../form/controller"
import { ItemTile } from "../tile"

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
  const result = trpc.getItems.useQuery()
  const itemFormContext = useItemFormContext()
  useSubscription(itemFormContext.itemsChangedEvents, () => result.refetch())

  return (
    <div className="p-4">
      {!result.data ? (
        "Loading..."
      ) : (
        <>
          <ul className="list-none">
            {result.data.map((item) => (
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
      )}
    </div>
  )
}

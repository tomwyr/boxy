import { useState } from "react"
import { Item } from "../../../server/models/item"
import { NewItemButton } from "../newItem/button"
import { useNewItemContext } from "../newItem/controller"
import { ItemTile } from "./tile"

export interface ItemListProps {
  items: Item[]
}

export function ItemList({ items }: ItemListProps) {
  const newItemContext = useNewItemContext()
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  function onItemClick(item: Item) {
    const index = selectedItems.indexOf(item)
    const updatedItems = [...selectedItems]

    if (index == -1) {
      updatedItems.push(item)
    } else {
      updatedItems.splice(index, 1)
    }

    setSelectedItems(updatedItems)
  }

  return (
    <ul className="list-none p-4">
      {items.map((item) => (
        <ItemTile
          key={item.id}
          item={item}
          selected={selectedItems.includes(item)}
          onClick={() => onItemClick(item)}
        />
      ))}

      <NewItemButton key="new-item-button" onClick={newItemContext.showForm} />
    </ul>
  )
}

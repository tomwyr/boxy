import { useState } from "react"
import { Item } from "../../../server/models/item"
import { NewItemButton } from "./newButton"
import { useItemFormContext } from "./form/controller"
import { ItemTile } from "./tile"

export interface ItemListProps {
  items: Item[]
}

export function ItemList({ items }: ItemListProps) {
  const itemFormContext = useItemFormContext()
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  function switchItemSelection(item: Item) {
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
    <>
      <ul className="list-none">
        {items.map((item) => (
          <ItemTile
            key={item.id}
            item={item}
            onClick={() => itemFormContext.showForm(item)}
          />
        ))}
      </ul>

      <NewItemButton onClick={() => itemFormContext.showForm()} />
    </>
  )
}

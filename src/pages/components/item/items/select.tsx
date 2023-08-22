import { useState } from "react"
import { Item } from "../../../../server/models/item"
import { DiceIcon } from "../../icons/dice"
import { ItemsLayout } from "./layout"
import { ItemsList } from "./list"
import { ItemsListButton } from "./listButton"

export interface SelectItemProps {
  onEdit: () => void
}

export function SelectItems({ onEdit }: SelectItemProps) {
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([])

  function switchItemSelection(item: Item) {
    const index = selectedItemsIds.indexOf(item.id)
    const updatedItemIds = [...selectedItemsIds]

    if (index == -1) {
      updatedItemIds.push(item.id)
    } else {
      updatedItemIds.splice(index, 1)
    }

    setSelectedItemsIds(updatedItemIds)
  }

  return (
    <ItemsLayout
      title="Select items"
      action={{
        label: "Edit",
        onClick: onEdit,
      }}
    >
      <ItemsList
        onItemClick={switchItemSelection}
        selectedItemIds={selectedItemsIds}
        footerItem={
          <ItemsListButton
            enabled={selectedItemsIds.length > 0}
            onClick={() => console.log("TAP")}
          >
            <DiceIcon />
          </ItemsListButton>
        }
      />
    </ItemsLayout>
  )
}

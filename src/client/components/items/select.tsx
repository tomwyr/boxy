import { useState } from "react"
import { Item } from "../../../server/models/item"
import { trpc } from "../../../utils/trpc"
import { DiceIcon } from "../icons/dice"
import { ItemsLayout } from "./layout"
import { ItemsList } from "./list"
import { ItemsListButton } from "./listButton"

export interface SelectItemProps {
  onEdit: () => void
  onShowBox: (boxId: string) => void
}

export function SelectItems({ onEdit, onShowBox }: SelectItemProps) {
  const createBox = trpc.createBox.useMutation().mutateAsync

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

  const switchItemSelection = (item: Item) => {
    const index = selectedItemIds.indexOf(item.id)
    const updatedItemIds = [...selectedItemIds]

    if (index == -1) {
      updatedItemIds.push(item.id)
    } else {
      updatedItemIds.splice(index, 1)
    }

    setSelectedItemIds(updatedItemIds)
  }

  const onConfirmSelection = async () => {
    const box = await createBox({
      itemIds: selectedItemIds,
    })
    onShowBox(box.id)
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
        selectedItemIds={selectedItemIds}
        footerItem={
          <ItemsListButton
            enabled={selectedItemIds.length > 0}
            onClick={onConfirmSelection}
          >
            <DiceIcon />
          </ItemsListButton>
        }
      />
    </ItemsLayout>
  )
}

import { Item } from "../../../../server/models/item"
import { trpc } from "../../../../utils/trpc"
import { ItemFormFooter } from "./footer"

export interface ItemFormDeleteConfirmationProps {
  item: Item
  onSuccess: () => void
  onCancel: () => void
}

export function ItemFormDeleteConfirmation({
  item,
  onSuccess,
  onCancel,
}: ItemFormDeleteConfirmationProps) {
  const deleteItem = trpc.deleteItem.useMutation().mutateAsync

  const onSubmit = async () => {
    await deleteItem(item.id)
    onSuccess()
  }

  return (
    <>
      <h1 className="text-2xl">Delete item</h1>

      <div className="mt-2 mb-4">
        {"Do you want to delete item "}
        <span className="font-bold">{item.name}</span>
        {"? This action cannot be undone."}
      </div>

      <ItemFormFooter
        confirmLabel="Delete"
        confirmBg="bg-red-400"
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}

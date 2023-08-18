import { trpc } from "../../../../utils/trpc"
import { Dialog } from "../../dialog"
import { ItemFormSubmitAction } from "./utils/submitAction"
import { ItemFormActions } from "./actions"
import { useItemFormContext } from "./controller"
import { ItemFormImage } from "./image"
import { ItemFormName } from "./name"
import { getItemFormProcessor } from "./utils/processor"
import { ItemFormRarity } from "./rarity"

export interface ItemFormProps {
  action: ItemFormSubmitAction
}

export function ItemForm({ action }: ItemFormProps) {
  const formName = "item-form"
  const itemFormContext = useItemFormContext()

  const addItemMutation = trpc.addItem.useMutation()
  const updateItemMutation = trpc.updateItem.useMutation()
  const deleteItemMutation = trpc.deleteItem.useMutation()

  const itemProcessor = getItemFormProcessor({
    formName: formName,
    action: action,
    itemFormContext: itemFormContext,
    addItem: (newItem) => addItemMutation.mutateAsync(newItem),
    updateItem: (item) => updateItemMutation.mutateAsync(item),
    deleteItem: (input) => deleteItemMutation.mutateAsync(input),
  })

  const { initialValue, title, submitLabel } = getActionProps(action)

  return (
    <Dialog>
      <form
        encType="multipart/form-data"
        name={formName}
        action="#"
        method="post"
      >
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          {itemProcessor.onDelete && (
            <button className="text-red-500 " onClick={itemProcessor.onDelete}>
              Delete
            </button>
          )}
        </div>

        <div className="my-2 flex flex-col">
          <ItemFormName initialValue={initialValue?.name} />
          <ItemFormRarity initialValue={initialValue?.rarity} />
          <ItemFormImage initialValue={initialValue?.imageUrl} />
        </div>

        <ItemFormActions
          submitLabel={submitLabel}
          onSubmit={itemProcessor.onSubmit}
          onCancel={itemFormContext.closeForm}
        />
      </form>
    </Dialog>
  )
}

function getActionProps(action: ItemFormSubmitAction) {
  switch (action.kind) {
    case "add":
      return {
        initialValue: undefined,
        title: "Add item",
        submitLabel: "Add",
      }

    case "edit":
      return {
        initialValue: action.item,
        title: "Edit item",
        submitLabel: "Save",
      }
  }
}

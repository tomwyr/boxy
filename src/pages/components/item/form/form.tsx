import { trpc } from "../../../../utils/trpc"
import { Dialog } from "../../dialog"
import { useItemFormContext } from "./controller"
import { ItemFormFooter } from "./footer"
import { ItemFormHeader } from "./header"
import { ItemFormImage } from "./image"
import { ItemFormName } from "./name"
import { ItemFormRarity } from "./rarity"
import { getItemFormProcessor } from "./utils/processor"
import { ItemFormSubmitAction } from "./utils/submitAction"

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
        <ItemFormHeader title={title} onDelete={itemProcessor.onDelete} />

        <div className="my-2 flex flex-col">
          <ItemFormName initialValue={initialValue?.name} />
          <ItemFormRarity initialValue={initialValue?.rarity} />
          <ItemFormImage initialValue={initialValue?.imageUrl} />
        </div>

        <ItemFormFooter
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

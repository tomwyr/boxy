import {
  DeleteItemInput,
  Item,
  ItemSchema,
  NewItem,
  NewItemSchema,
} from "../../../../../server/models/item"
import { ItemFormSubmitAction } from "./submitAction"
import { ItemFormContextType } from "../controller"

interface ItemFormProcessorProps {
  formName: string
  action: ItemFormSubmitAction
  itemFormContext: ItemFormContextType
  addItem: (newItem: NewItem) => Promise<any>
  updateItem: (item: Item) => Promise<any>
  deleteItem: (input: DeleteItemInput) => Promise<any>
}

export function getItemFormProcessor({
  formName,
  action,
  itemFormContext,
  addItem,
  updateItem,
  deleteItem,
}: ItemFormProcessorProps) {
  const getFormData = () => {
    const formSelector = `[name='${formName}']`
    const form = document.querySelector(formSelector) as HTMLFormElement
    const formData = Object.fromEntries<any>(new FormData(form))

    formData.rarity = parseInt(formData.rarity)

    return formData
  }

  const processItemSubmit = async (formData: { [k: string]: any }) => {
    switch (action.kind) {
      case "add":
        const newItem = NewItemSchema.parse(formData)
        await addItem(newItem)
        break

      case "edit":
        const itemData = {
          id: action.item.id,
          ...formData,
        }
        const updatedItem = ItemSchema.parse(itemData)
        await updateItem(updatedItem)
        break
    }
  }

  const onSubmit = async () => {
    await processItemSubmit(getFormData())

    itemFormContext.notifyItemsChanged()
    itemFormContext.closeForm()
  }

  let onDelete: (() => Promise<void>) | undefined
  if (action.kind == "edit") {
    onDelete = async () => {
      await deleteItem({ itemId: action.item.id })

      itemFormContext.notifyItemsChanged()
      itemFormContext.closeForm()
    }
  }

  return {
    onSubmit: onSubmit,
    onDelete: onDelete,
  }
}

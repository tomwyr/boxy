import { NewItemSchema } from "../../../server/models/item"
import { trpc } from "../../../utils/trpc"
import { Dialog } from "../dialog"
import { NewItemActions } from "./actions"
import { useNewItemContext } from "./controller"
import { NewItemImage } from "./image"
import { NewItemName } from "./name"
import { NewItemRarity } from "./rarity"

export function NewItemForm() {
  const newItemContext = useNewItemContext()
  const formName = "new-item-input-form"
  const addItemMutation = trpc.addItem.useMutation()

  const getFormData = () => {
    const formSelector = `[name='${formName}']`
    const form = document.querySelector(formSelector) as HTMLFormElement
    const formData = Object.fromEntries<any>(new FormData(form))
    formData.rarity = parseInt(formData.rarity)

    return formData
  }

  const addItem = async () => {
    const newItem = NewItemSchema.parse(getFormData())
    await addItemMutation.mutateAsync(newItem)

    newItemContext.notifyItemAdded()
    newItemContext.closeForm()
  }

  return (
    <Dialog>
      <form
        encType="multipart/form-data"
        name={formName}
        action="#"
        method="post"
      >
        <h3 className="font-bold">New Item</h3>

        <div className="my-2 flex flex-col">
          <NewItemName />
          <NewItemRarity />
          <NewItemImage />
        </div>

        <NewItemActions
          onSubmit={addItem}
          onCancel={newItemContext.closeForm}
        />
      </form>
    </Dialog>
  )
}

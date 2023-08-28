import { Item } from "../../../../server/types/item"
import { trpc } from "../../../../utils/trpc"
import { itemFormName } from "./common"
import { ItemFormFooter } from "./footer"
import { ItemFormHeader } from "./header"
import { ItemFormImage } from "./image"
import { ItemFormName } from "./name"
import { ItemFormRarity } from "./rarity"

import { ItemFormType } from "../../../../client/components/item/form/types/type"

export interface ItemFormProps {
  formType: ItemFormType
  onDelete: (() => void) | undefined
  onSuccess: () => void
  onCancel: () => void
}

export function ItemForm({
  formType,
  onDelete,
  onSuccess,
  onCancel,
}: ItemFormProps) {
  const addItem = trpc.addItem.useMutation().mutateAsync
  const updateItem = trpc.updateItem.useMutation().mutateAsync

  const { initialValue, title, submitLabel, onSubmit } = (() => {
    switch (formType.kind) {
      case "add":
        return {
          initialValue: undefined,
          title: "New Item",
          submitLabel: "Add",
          onSubmit: async () => {
            const newItem = getItemFormData()
            await addItem(newItem)
            onSuccess()
          },
        }

      case "edit":
        return {
          initialValue: formType.item,
          title: "Edit Item",
          submitLabel: "Save",
          onSubmit: async () => {
            const item: Item = {
              id: formType.item.id,
              ...getItemFormData(),
            }
            await updateItem(item)
            onSuccess()
          },
        }
    }
  })()

  return (
    <form
      encType="multipart/form-data"
      name={itemFormName}
      action="#"
      method="post"
    >
      <ItemFormHeader title={title} onDelete={onDelete} />

      <div className="my-2 flex flex-col">
        <ItemFormName initialValue={initialValue?.name} />
        <ItemFormRarity initialValue={initialValue?.rarity} />
        <ItemFormImage initialValue={initialValue?.imageUrl} />
      </div>

      <ItemFormFooter
        confirmBg="bg-green-400"
        confirmLabel={submitLabel}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </form>
  )
}

function getItemFormData() {
  const formSelector = `[name='${itemFormName}']`
  const form = document.querySelector(formSelector) as HTMLFormElement
  const formData = Object.fromEntries<any>(new FormData(form))

  return {
    name: formData.name,
    imageUrl: formData.imageUrl,
    rarity: formData.rarity,
  }
}

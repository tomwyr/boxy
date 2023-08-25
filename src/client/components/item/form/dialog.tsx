import { useState } from "react"
import { Dialog } from "../../../../client/components/dialog"
import { ItemFormStep } from "../../../../client/components/item/form/types/step"
import { ItemFormType } from "../../../../client/components/item/form/types/type"
import { ItemFormDeleteConfirmation } from "./deleteConfirmation"
import { ItemForm } from "./form"

export interface ItemFormDialogProps {
  formType: ItemFormType
  onSuccess: () => void
  onCancel: () => void
}

export function ItemFormDialog({
  formType,
  onSuccess,
  onCancel,
}: ItemFormDialogProps) {
  const [formStep, setFormStep] = useState<ItemFormStep>({ kind: "input" })

  const content = (() => {
    switch (formStep.kind) {
      case "input":
        const onDelete = (() => {
          switch (formType.kind) {
            case "add":
              return undefined
            case "edit":
              return () => {
                setFormStep({
                  kind: "delete",
                  item: formType.item,
                })
              }
          }
        })()

        return (
          <ItemForm
            formType={formType}
            onDelete={onDelete}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        )

      case "delete":
        return (
          <ItemFormDeleteConfirmation
            item={formStep.item}
            onSuccess={onSuccess}
            onCancel={() => setFormStep({ kind: "input" })}
          />
        )
    }
  })()

  return <Dialog>{content}</Dialog>
}

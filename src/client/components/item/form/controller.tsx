import { ReactNode, createContext, useContext, useState } from "react"
import { Item } from "../../../../server/models/item"
import { useItemsContext } from "../../items/controller"
import { ItemFormDialog } from "./dialog"
import { ItemFormType } from "./types/type"

export const useItemFormContext = () => {
  return useContext(ItemFormContext) as ItemFormContextType
}

export interface ItemFormControllerProps {
  children: ReactNode
}

export function ItemFormController({ children }: ItemFormControllerProps) {
  const itemsContext = useItemsContext()
  const [formType, setFormType] = useState<ItemFormType | undefined>()

  const props = {
    showForm: (item?: Item) => {
      setFormType(item ? { kind: "edit", item: item } : { kind: "add" })
    },
  }

  return (
    <ItemFormContext.Provider value={props}>
      {children}
      {formType && (
        <ItemFormDialog
          formType={formType}
          onSuccess={() => {
            itemsContext.notifyItemsChanged()
            setFormType(undefined)
          }}
          onCancel={() => setFormType(undefined)}
        />
      )}
    </ItemFormContext.Provider>
  )
}

const ItemFormContext = createContext<ItemFormContextType | undefined>(
  undefined,
)

export interface ItemFormContextType {
  showForm: (item?: Item) => void
}

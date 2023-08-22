import { useObservableCallback } from "observable-hooks"
import { ReactNode, createContext, useContext, useState } from "react"
import { Observable } from "rxjs"
import { Item } from "../../../../server/models/item"
import { ItemFormType } from "./types/type"
import { ItemFormDialog } from "./dialog"

export const useItemFormContext = () => {
  return useContext(ItemFormContext) as ItemFormContextType
}

export interface ItemFormControllerProps {
  children: ReactNode
}

export function ItemFormController({ children }: ItemFormControllerProps) {
  const [formType, setFormType] = useState<ItemFormType | undefined>()
  const [notifyItemsChanged, itemsChangedEvents] = useObservableCallback()

  const props = {
    itemsChangedEvents: itemsChangedEvents,
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
            notifyItemsChanged()
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
  itemsChangedEvents: Observable<void>
  showForm: (item?: Item) => void
}

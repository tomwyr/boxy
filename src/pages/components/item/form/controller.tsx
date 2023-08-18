import { useObservableCallback } from "observable-hooks"
import { ReactNode, createContext, useContext, useState } from "react"
import { Observable } from "rxjs"
import { Item } from "../../../../server/models/item"
import { ItemFormSubmitAction } from "./utils/submitAction"
import { ItemForm } from "./form"

export const useItemFormContext = () => {
  return useContext(ItemFormContext) as ItemFormContextType
}

export interface ItemFormControllerProps {
  children: ReactNode
}

export function ItemFormController({ children }: ItemFormControllerProps) {
  const [itemAction, setItemAction] = useState<
    ItemFormSubmitAction | undefined
  >()
  const [notifyItemsChanged, itemsChangedEvents] = useObservableCallback()

  const props = {
    itemsChangedEvents: itemsChangedEvents,
    notifyItemsChanged: notifyItemsChanged,
    showForm: (item?: Item) => {
      setItemAction(item ? { kind: "edit", item: item } : { kind: "add" })
    },
    closeForm: () => {
      setItemAction(undefined)
    },
  }

  return (
    <ItemFormContext.Provider value={props}>
      {children}
      {itemAction && <ItemForm action={itemAction} />}
    </ItemFormContext.Provider>
  )
}

const ItemFormContext = createContext<ItemFormContextType | undefined>(
  undefined,
)

export interface ItemFormContextType {
  itemsChangedEvents: Observable<void>
  notifyItemsChanged: () => void
  showForm: (item?: Item) => void
  closeForm: () => void
}

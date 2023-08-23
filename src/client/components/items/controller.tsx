import { useObservableCallback } from "observable-hooks"
import { ReactNode, createContext, useContext } from "react"
import { Observable } from "rxjs"

export const useItemsContext = () => {
  return useContext(ItemsContext) as ItemsContextType
}

export interface ItemsControllerProps {
  children: ReactNode
}

export function ItemsController({ children }: ItemsControllerProps) {
  const [notifyItemsChanged, itemsChangedEvents] = useObservableCallback()

  const props = {
    itemsChangedEvents: itemsChangedEvents,
    notifyItemsChanged: notifyItemsChanged,
  }

  return <ItemsContext.Provider value={props}>{children}</ItemsContext.Provider>
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined)

export interface ItemsContextType {
  itemsChangedEvents: Observable<void>
  notifyItemsChanged: () => void
}

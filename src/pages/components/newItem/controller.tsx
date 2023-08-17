import { useObservableCallback } from "observable-hooks"
import { ReactNode, createContext, useContext, useState } from "react"
import { Observable } from "rxjs"
import { NewItemForm } from "./form"

export const useNewItemContext = () => {
  return useContext(NewItemContext) as NewItemContextType
}

export interface NewItemControllerProps {
  children: ReactNode
}

export function NewItemController({ children }: NewItemControllerProps) {
  const [visible, setVisible] = useState(false)
  const [notifyItemAdded, itemAddedEvents] = useObservableCallback()

  const props = {
    itemAddedEvents: itemAddedEvents,
    notifyItemAdded: notifyItemAdded,
    showForm: () => setVisible(true),
    closeForm: () => setVisible(false),
  }

  return (
    <NewItemContext.Provider value={props}>
      {children}
      {visible && <NewItemForm />}
    </NewItemContext.Provider>
  )
}

const NewItemContext = createContext<NewItemContextType | null>(null)

interface NewItemContextType {
  itemAddedEvents: Observable<void>
  notifyItemAdded: () => void
  showForm: () => void
  closeForm: () => void
}

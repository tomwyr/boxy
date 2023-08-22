import { useItemFormContext } from "../form/controller"
import { ItemsListButton } from "./listButton"
import { ItemsLayout } from "./layout"
import { ItemsList } from "./list"
import { PlusIcon } from "../../icons/plus"

export interface EditItemProps {
  onBack: () => void
}

export function EditItems({ onBack }: EditItemProps) {
  const itemFormContext = useItemFormContext()

  return (
    <ItemsLayout title="Edit items" onBack={onBack}>
      <ItemsList
        onItemClick={itemFormContext.showForm}
        footerItem={
          <ItemsListButton onClick={itemFormContext.showForm}>
            <PlusIcon />
          </ItemsListButton>
        }
      />
    </ItemsLayout>
  )
}

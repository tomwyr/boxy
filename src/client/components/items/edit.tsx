import { useItemFormContext } from "../item/form/controller"
import { ItemsLayout } from "./layout"
import { ItemsList } from "./list"
import { ItemsListButton } from "./listButton"

export interface EditItemProps {
  onBack: () => void
}

export function EditItems({ onBack }: EditItemProps) {
  const itemFormContext = useItemFormContext()

  return (
    <ItemsLayout title="Edit items" onBack={onBack}>
      <ItemsList
        onItemClick={(item) => itemFormContext.showForm(item)}
        footerItem={
          <ItemsListButton onClick={() => itemFormContext.showForm()}>
            Add Item
          </ItemsListButton>
        }
      />
    </ItemsLayout>
  )
}

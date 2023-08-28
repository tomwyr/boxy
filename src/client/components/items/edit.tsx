import { ButtonAction } from "../../types"
import { useItemFormContext } from "../item/form/controller"
import { PageLayout } from "../page/layout"
import { ItemsList } from "./list"
import { ListButtonItem } from "../list/buttonItem"

export interface EditItemProps {
  backAction: ButtonAction
}

export function EditItems({ backAction }: EditItemProps) {
  const itemFormContext = useItemFormContext()

  return (
    <PageLayout title="Items" backAction={backAction}>
      <ItemsList
        onItemClick={(item) => itemFormContext.showForm(item)}
        footerItem={
          <ListButtonItem onClick={() => itemFormContext.showForm()}>
            New Item
          </ListButtonItem>
        }
      />
    </PageLayout>
  )
}

import { useRouter } from "next/router"
import { ItemFormController } from "../../client/components/item/form/controller"
import { ItemsController } from "../../client/components/items/controller"
import { EditItems } from "../../client/components/items/edit"

export default function ItemsPage() {
  const router = useRouter()

  return (
    <ItemsController>
      <ItemFormController>
        <EditItems
          backAction={{
            label: "Boxes",
            onClick: () => router.push("/boxes"),
          }}
        />
      </ItemFormController>
    </ItemsController>
  )
}

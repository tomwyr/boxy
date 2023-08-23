import { useRouter } from "next/router"
import { SelectItems } from "../client/components/items/select"
import { ItemFormController } from "../client/components/item/form/controller"
import { ItemsController } from "../client/components/items/controller"

export default function Select() {
  const router = useRouter()

  return (
    <ItemsController>
      <SelectItems
        onEdit={() => router.push("/edit")}
        onShowBox={(boxId) => router.push(`/box/${boxId}`)}
      />
    </ItemsController>
  )
}

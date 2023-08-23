import { useRouter } from "next/router"
import { EditItems } from "../client/components/items/edit"
import { ItemFormController } from "../client/components/item/form/controller"
import { ItemsController } from "../client/components/items/controller"

export default function Edit() {
  const router = useRouter()

  return (
    <ItemsController>
      <ItemFormController>
        <EditItems onBack={() => router.push("/select")} />
      </ItemFormController>
    </ItemsController>
  )
}

import { useRouter } from "next/router"
import { ItemsController } from "../../client/components/items/controller"
import { SelectItems } from "../../client/components/items/select"

export default function NewBoxPage() {
  const router = useRouter()

  return (
    <ItemsController>
      <SelectItems
        onEdit={() => router.push("/items")}
        onShowBox={(boxId) => router.push(`/boxes/${boxId}`)}
      />
    </ItemsController>
  )
}

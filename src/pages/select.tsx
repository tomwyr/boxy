import { useRouter } from "next/router"
import { ItemsController } from "../client/components/items/controller"
import { SelectItems } from "../client/components/items/select"

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

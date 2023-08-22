import { useState } from "react"
import { ItemFormController } from "./components/item/form/controller"
import { EditItems } from "./components/item/items/edit"
import { SelectItems } from "./components/item/items/select"

type ItemsViewType = "select" | "edit"

export default function HomePage() {
  const [viewType, setViewType] = useState<ItemsViewType>("select")

  const content = (() => {
    switch (viewType) {
      case "select":
        return <SelectItems onEdit={() => setViewType("edit")} />
      case "edit":
        return <EditItems onBack={() => setViewType("select")} />
    }
  })()

  return <ItemFormController>{content}</ItemFormController>
}

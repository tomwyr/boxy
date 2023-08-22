import { useSubscription } from "observable-hooks"
import { trpc } from "../utils/trpc"
import { ItemList } from "./components/item/list"
import {
  ItemFormController,
  useItemFormContext,
} from "./components/item/form/controller"

export default function HomePage() {
  return (
    <ItemFormController>
      <div className="w-full md:w-7/12 ">
        <div className="p-4 flex justify-between">
          <h1 className="text-4xl">Select items</h1>
          <button className="py-1 px-4 border">Edit</button>
        </div>
        <Items />
      </div>
    </ItemFormController>
  )
}

function Items() {
  const result = trpc.getItems.useQuery()
  const itemFormContext = useItemFormContext()
  useSubscription(itemFormContext.itemsChangedEvents, () => result.refetch())

  return (
    <div className="p-4">
      {!result.data ? "Loading..." : <ItemList items={result.data} />}
    </div>
  )
}

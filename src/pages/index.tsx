import { useSubscription } from "observable-hooks"
import { trpc } from "../utils/trpc"
import { ItemList } from "./components/item/list"
import {
  NewItemController,
  useNewItemContext,
} from "./components/newItem/controller"

export default function HomePage() {
  return (
    <NewItemController>
      <div className="w-full md:w-7/12 ">
        <div className="flex p-4">
          <h1 className="text-4xl">Select items</h1>
          <button className="py-1 px-4 border self-center ml-auto">Edit</button>
        </div>
        <AllItems />
      </div>
    </NewItemController>
  )
}

function AllItems() {
  const result = trpc.getItems.useQuery()

  const newItemContext = useNewItemContext()
  useSubscription(newItemContext.itemAddedEvents, () => result.refetch())

  return !result.data ? "Loading..." : <ItemList items={result.data} />
}

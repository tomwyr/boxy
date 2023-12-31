import { useRouter } from "next/router"
import { useState } from "react"
import { Item } from "../../../server/types/item"
import { trpc } from "../../../utils/trpc"
import { ListButtonItem } from "../list/buttonItem"
import { PageLayout } from "../page/layout"
import { ItemsList } from "./list"

export interface SelectItemProps {
  onShowBox: (boxId: string) => void
}

export function SelectItems({ onShowBox }: SelectItemProps) {
  const router = useRouter()
  const createBox = trpc.createBox.useMutation().mutateAsync

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

  const switchItemSelection = (item: Item) => {
    const index = selectedItemIds.indexOf(item.id)
    const updatedItemIds = [...selectedItemIds]

    if (index == -1) {
      updatedItemIds.push(item.id)
    } else {
      updatedItemIds.splice(index, 1)
    }

    setSelectedItemIds(updatedItemIds)
  }

  const onConfirmSelection = async () => {
    const box = await createBox({
      itemIds: selectedItemIds,
    })
    onShowBox(box.id)
  }

  return (
    <PageLayout
      title="Select items"
      backAction={{
        label: "Boxes",
        onClick: () => router.push("/boxes"),
      }}
    >
      <ItemsList
        onItemClick={switchItemSelection}
        selectedItemIds={selectedItemIds}
        headerItemBuilder={(items) => (
          <SelectFilters
            items={items}
            setSelectedItemIds={setSelectedItemIds}
          />
        )}
        footerItem={
          <ListButtonItem
            enabled={selectedItemIds.length > 0}
            onClick={onConfirmSelection}
          >
            Create Box
          </ListButtonItem>
        }
      />
    </PageLayout>
  )
}

interface SelectFiltersProps {
  items: Item[]
  setSelectedItemIds: (itemIds: string[]) => void
}

function SelectFilters({ items, setSelectedItemIds }: SelectFiltersProps) {
  const itemIds = items.map((item) => item.id)

  const filterButton = (label: string, onClick: () => void) => {
    return (
      <button
        type="button"
        className="min-w-[56px] p-2 my-2 rounded-md hover:bg-slate-50"
        onClick={onClick}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="flex mb-2 gap-2">
      {filterButton("All", () => setSelectedItemIds(itemIds))}
      {filterButton("None", () => setSelectedItemIds([]))}
    </div>
  )
}

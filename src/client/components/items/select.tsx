import { useState } from "react"
import { Item } from "../../../server/types/item"
import { trpc } from "../../../utils/trpc"
import { PageLayout } from "../page/layout"
import { ItemsList } from "./list"
import { ListButtonItem } from "../list/buttonItem"
import { useRouter } from "next/router"

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
        footerItem={
          <ListButtonItem
            enabled={selectedItemIds.length > 1}
            onClick={onConfirmSelection}
          >
            Create Box
          </ListButtonItem>
        }
      />
    </PageLayout>
  )
}

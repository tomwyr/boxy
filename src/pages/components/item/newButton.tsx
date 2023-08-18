import { PlusIcon } from "../icons/plus"
import { ListItem } from "../listItem"

export interface NewItemButtonProps {
  onClick: () => void
}

export function NewItemButton({ onClick }: NewItemButtonProps) {
  return (
    <ListItem
      className="mt-3 justify-center bg-blue-50 hover:bg-blue-100 text-blue-400"
      onClick={onClick}
    >
      <PlusIcon />
    </ListItem>
  )
}

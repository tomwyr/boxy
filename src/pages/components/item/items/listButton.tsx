import { ReactNode } from "react"
import { ListItem } from "../../listItem"

export interface ItemsListButtonProps {
  enabled?: boolean
  onClick: () => void
  children: ReactNode
}

export function ItemsListButton({
  enabled,
  onClick,
  children,
}: ItemsListButtonProps) {
  return (
    <ListItem
      className="mt-3 justify-center bg-blue-50 hover:bg-blue-100 text-blue-400"
      enabled={enabled}
      onClick={onClick}
    >
      {children}
    </ListItem>
  )
}

import { ReactNode } from "react"
import { ListItem } from "./item"

export interface ListButtonItemProps {
  enabled?: boolean
  onClick: () => void
  children: ReactNode
}

export function ListButtonItem({
  enabled,
  onClick,
  children,
}: ListButtonItemProps) {
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

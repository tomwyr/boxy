import { ReactNode } from "react"

export interface ListItemProps {
  className?: string
  onClick?: () => void
  children: ReactNode
}

export function ListItem({ className, onClick, children }: ListItemProps) {
  return (
    <li
      className={`h-16 p-2 rounded-md flex items-center cursor-pointer ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  )
}

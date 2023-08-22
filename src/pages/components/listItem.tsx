import { ReactNode } from "react"

export interface ListItemProps {
  className?: string
  enabled?: boolean
  onClick?: () => void
  children: ReactNode
}

export function ListItem({
  className,
  enabled = true,
  onClick,
  children,
}: ListItemProps) {
  const enabledStyle = enabled
    ? "cursor-pointer"
    : "opacity-50 filter grayscale"

  return (
    <li
      className={`h-16 p-2 rounded-md flex items-center ${className} ${enabledStyle}`}
      onClick={enabled ? onClick : undefined}
    >
      {children}
    </li>
  )
}

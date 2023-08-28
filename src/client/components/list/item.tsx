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
  const cursorStyle = enabled && onClick && "cursor-pointer"
  const disabledStyle = !enabled && "opacity-50 filter grayscale"

  return (
    <li
      className={`h-16 p-2 rounded-md flex items-center ${className} ${cursorStyle} ${disabledStyle}`}
      onClick={enabled ? onClick : undefined}
    >
      {children}
    </li>
  )
}

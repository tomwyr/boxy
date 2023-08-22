import { ReactNode } from "react"
import { ChevronLeftIcon } from "../../icons/chevron_left"

export interface ItemsLayoutProps {
  title: string
  onBack?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  children: ReactNode
}

export function ItemsLayout({
  title,
  onBack,
  action,
  children,
}: ItemsLayoutProps) {
  return (
    <div className="w-full md:w-7/12 ">
      <div className="p-4 flex">
        {onBack && (
          <button className="mx-2" type="button" onClick={onBack}>
            <ChevronLeftIcon />
          </button>
        )}

        <h1 className="text-4xl">{title}</h1>

        {action && (
          <button
            className="py-1 px-4 border ml-auto"
            type="button"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

import { ReactNode } from "react"
import { ButtonAction } from "../../types"
import { ChevronLeftIcon } from "../icons/chevron_left"

export interface PageLayoutProps {
  title?: string
  backAction?: ButtonAction
  children?: ReactNode
}

export function PageLayout({ title, backAction, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 lg:py-4">
      <div className="bg-white w-full p-4 h-full lg:h-auto lg:w-7/12 lg:p-8 lg:shadow-md mx-auto">
        {backAction && (
          <button
            className="flex mt-2 mb-2"
            type="button"
            onClick={backAction.onClick}
          >
            <ChevronLeftIcon />
            {backAction.label}
          </button>
        )}

        {title && <h1 className="text-4xl mb-4">{title}</h1>}

        {children}
      </div>
    </div>
  )
}

import { ReactNode } from "react"

export interface DialogProps {
  children: ReactNode
}

export function Dialog({ children }: DialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="w-dialog max-h-96 p-6 bg-white rounded-md shadow-md">
        {children}
      </div>
    </div>
  )
}

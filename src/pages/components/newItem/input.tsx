export const NewItemInputStyle = "border rounded-md p-2 self-start"

export interface NewItemInputLabelProps {
  name: string
  label: string
}

export function NewItemInputLabel({ name, label }: NewItemInputLabelProps) {
  return (
    <label className="mt-3 mb-1 text-md" htmlFor={name}>
      {label}
    </label>
  )
}

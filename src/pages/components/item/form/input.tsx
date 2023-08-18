export const ItemFormInputStyle = "border rounded-md p-2 self-start"

export interface ItemFormInputLabelProps {
  name: string
  label: string
}

export function ItemFormInputLabel({ name, label }: ItemFormInputLabelProps) {
  return (
    <label className="mt-3 mb-1 text-md" htmlFor={name}>
      {label}
    </label>
  )
}

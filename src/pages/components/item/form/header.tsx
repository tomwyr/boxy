export interface ItemFormHeaderProps {
  title: string
  onDelete: (() => void) | undefined
}

export function ItemFormHeader({ title, onDelete }: ItemFormHeaderProps) {
  return (
    <div className="flex justify-between">
      <h3 className="font-bold">{title}</h3>
      {onDelete && (
        <button className="text-red-500 " type="button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  )
}

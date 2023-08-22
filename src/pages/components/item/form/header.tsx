export interface ItemFormHeaderProps {
  title: string
  onDelete: (() => void) | undefined
}

export function ItemFormHeader({ title, onDelete }: ItemFormHeaderProps) {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl">{title}</h1>

      {onDelete && (
        <button className="text-red-400 " type="button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  )
}

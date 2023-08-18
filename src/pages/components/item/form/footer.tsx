export interface ItemFormFooterProps {
  submitLabel: string
  onSubmit: () => void
  onCancel: () => void
}

export function ItemFormFooter({
  submitLabel,
  onSubmit,
  onCancel,
}: ItemFormFooterProps) {
  return (
    <div className="my-2 flex w-full justify-end">
      <button className="px-4 mx-4" onClick={onCancel}>
        Cancel
      </button>

      <button
        className="px-4 mx-4 bg-green-400"
        type="button"
        onClick={onSubmit}
      >
        {submitLabel}
      </button>
    </div>
  )
}

export interface ItemFormFooterProps {
  confirmBg: string
  confirmLabel: string
  onSubmit: () => void
  onCancel: () => void
}

export function ItemFormFooter({
  confirmBg,
  confirmLabel,
  onSubmit,
  onCancel,
}: ItemFormFooterProps) {
  return (
    <div className="my-2 flex w-full justify-end">
      <button className="px-4 mx-4" type="button" onClick={onCancel}>
        Cancel
      </button>

      <button
        className={`px-4 mx-4 ${confirmBg}`}
        type="button"
        onClick={onSubmit}
      >
        {confirmLabel}
      </button>
    </div>
  )
}

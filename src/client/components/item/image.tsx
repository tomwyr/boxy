export interface ItemImageProps {
  url: string
}

export function ItemImage({ url }: ItemImageProps) {
  return (
    <div className={`w-24 flex flex-shrink-0 items-center justify-center`}>
      <img src={url} alt="Item image" className="max-h-6" />
    </div>
  )
}

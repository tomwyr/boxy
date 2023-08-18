import { ItemFormInputLabel, ItemFormInputStyle } from "./input"

export interface ItemFormImageProps {
  initialValue: string | undefined
}

export function ItemFormImage({ initialValue }: ItemFormImageProps) {
  return (
    <>
      <ItemFormInputLabel name="imageUrl" label="Image url" />
      <input
        className={ItemFormInputStyle}
        defaultValue={initialValue}
        type="url"
        name="imageUrl"
      />
    </>
  )
}

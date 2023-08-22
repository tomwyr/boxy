import { ItemFormInputLabel, ItemFormInputStyle } from "./common"

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

import { ItemFormInputLabel, ItemFormInputStyle } from "./input"

export interface ItemFormNameProps {
  initialValue: string | undefined
}

export function ItemFormName({ initialValue }: ItemFormNameProps) {
  return (
    <>
      <ItemFormInputLabel name="name" label="Name" />
      <input
        className={ItemFormInputStyle}
        defaultValue={initialValue}
        name="name"
        type="text"
      />
    </>
  )
}

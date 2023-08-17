import { NewItemInputLabel, NewItemInputStyle } from "./input"

export function NewItemImage() {
  return (
    <>
      <NewItemInputLabel name="imageUrl" label="Image url" />
      <input className={NewItemInputStyle} type="url" name="imageUrl" />
    </>
  )
}

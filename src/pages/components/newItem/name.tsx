import { NewItemInputLabel, NewItemInputStyle } from "./input"

export function NewItemName() {
  return (
    <>
      <NewItemInputLabel name="name" label="Name" />
      <input className={NewItemInputStyle} name="name" type="text" />
    </>
  )
}

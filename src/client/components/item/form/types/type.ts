import { Item } from "../../../../../server/types/item"

export type ItemFormType = AddItemForm | EditItemForm

export interface AddItemForm {
  kind: "add"
}

export interface EditItemForm {
  kind: "edit"
  item: Item
}

import { Item } from "../../../../../server/models/item"

export type ItemFormSubmitAction = AddItemAction | EditItemAction

export interface AddItemAction {
  kind: "add"
}

export interface EditItemAction {
  kind: "edit"
  item: Item
}

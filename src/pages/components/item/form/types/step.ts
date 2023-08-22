import { Item } from "../../../../../server/models/item"

export type ItemFormStep = ItemInputStep | ItemDeleteStep

export interface ItemInputStep {
  kind: "input"
}

export interface ItemDeleteStep {
  kind: "delete"
  item: Item
}

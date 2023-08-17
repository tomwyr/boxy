import { Item } from "./item"

export type Box = {
  items: Item[]
}

export type BoxOpeningResult = {
  reward: Item
}

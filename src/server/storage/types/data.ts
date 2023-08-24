import { Item } from "../../types/item"
import { DbBox } from "./box"

export type DbData = {
  items: Item[]
  boxes: DbBox[]
}

import { z } from "zod"
import { ItemRarity } from "./itemRarity"

export type Item = z.infer<typeof Item>
export const Item = z.object({
  id: z.string(),
  name: z.string(),
  rarity: ItemRarity,
  imageUrl: z.string(),
})

export type NewItem = z.infer<typeof NewItem>
export const NewItem = z.object({
  name: z.string(),
  rarity: ItemRarity,
  imageUrl: z.string(),
})

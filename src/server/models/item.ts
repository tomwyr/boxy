import { z } from "zod"
import { ItemRarityValues } from "./itemRarity"

export type Item = z.infer<typeof ItemSchema>
export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  rarity: z.enum(ItemRarityValues),
  imageUrl: z.string(),
})

export type NewItem = z.infer<typeof NewItemSchema>
export const NewItemSchema = z.object({
  name: z.string(),
  rarity: z.enum(ItemRarityValues),
  imageUrl: z.string(),
})

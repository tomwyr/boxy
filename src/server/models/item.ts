import { z } from "zod"
import { ItemRarity } from "./itemRarity"

export type Item = z.infer<typeof ItemSchema>
export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  rarity: z.nativeEnum(ItemRarity),
  imageUrl: z.string(),
})

export type NewItem = z.infer<typeof NewItemSchema>
export const NewItemSchema = z.object({
  name: z.string(),
  rarity: z.nativeEnum(ItemRarity),
  imageUrl: z.string(),
})

export type ItemId = z.infer<typeof ItemIdSchema>
export const ItemIdSchema = z.object({
  itemId: z.string(),
})

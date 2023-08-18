import { z } from "zod"
import { ItemRarity } from "./itemRarity"

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  rarity: z.nativeEnum(ItemRarity),
  imageUrl: z.string(),
})

export type Item = z.infer<typeof ItemSchema>

export const NewItemSchema = z.object({
  name: z.string(),
  rarity: z.nativeEnum(ItemRarity),
  imageUrl: z.string(),
})

export type NewItem = z.infer<typeof NewItemSchema>

export const DeleteItemInputSchema = z.object({
  itemId: z.string(),
})

export type DeleteItemInput = z.infer<typeof DeleteItemInputSchema>

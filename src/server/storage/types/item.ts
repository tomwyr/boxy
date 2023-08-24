import { z } from "zod"
import { ItemRarity } from "../../types/itemRarity"

export type DbItem = z.infer<typeof DbItem>
export const DbItem = z.object({
  id: z.string(),
  name: z.string(),
  rarity: ItemRarity,
  imageUrl: z.string(),
})

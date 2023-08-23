import { z } from "zod"
import { Item, ItemSchema } from "./item"

export type Box = z.infer<typeof BoxSchema>
export const BoxSchema = z.object({
  id: z.string(),
  items: z.array(ItemSchema),
})

export type NewBox = z.infer<typeof NewBoxSchema>
export const NewBoxSchema = z.object({
  itemIds: z.array(z.string()),
})

export type BoxId = z.infer<typeof BoxIdSchema>
export const BoxIdSchema = z.object({
  boxId: z.string(),
})

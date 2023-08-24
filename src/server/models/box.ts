import { z } from "zod"
import { ItemSchema } from "./item"

export type Box = z.infer<typeof BoxSchema>
export const BoxSchema = z.object({
  id: z.string(),
  items: z.array(ItemSchema),
})

export type DbBox = z.infer<typeof DbBoxSchema>
export const DbBoxSchema = z.object({
  id: z.string(),
  itemIds: z.array(z.string()),
})

export type NewBox = z.infer<typeof NewBoxSchema>
export const NewBoxSchema = z.object({
  itemIds: z.array(z.string()),
})

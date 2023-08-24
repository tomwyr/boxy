import { z } from "zod"
import { BoxStatusValues } from "./boxStatus"
import { ItemSchema } from "./item"

export type Box = z.infer<typeof BoxSchema>
export const BoxSchema = z.object({
  id: z.string(),
  status: z.enum(BoxStatusValues),
  items: z.array(ItemSchema),
})

export type DbBox = z.infer<typeof DbBoxSchema>
export const DbBoxSchema = z.object({
  id: z.string(),
  status: z.enum(BoxStatusValues),
  itemIds: z.array(z.string()),
})

export type NewBox = z.infer<typeof NewBoxSchema>
export const NewBoxSchema = z.object({
  itemIds: z.array(z.string()),
})

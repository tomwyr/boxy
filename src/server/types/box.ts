import { z } from "zod"
import { BoxStatus } from "./boxStatus"
import { Item } from "./item"

export type BaseBox = z.infer<typeof BaseBox>
export const BaseBox = z.object({
  id: z.string(),
  status: BoxStatus,
  items: z.array(Item),
})

export type ClosedBox = z.infer<typeof ClosedBox>
export const ClosedBox = BaseBox.extend({
  status: z.literal("closed"),
})

export type OpenBox = z.infer<typeof OpenBox>
export const OpenBox = BaseBox.extend({
  status: z.literal("open"),
  reward: Item,
})

export type Box = z.infer<typeof Box>
export const Box = z.discriminatedUnion("status", [ClosedBox, OpenBox])

export type NewBox = z.infer<typeof NewBox>
export const NewBox = z.object({
  itemIds: z.array(z.string()),
})

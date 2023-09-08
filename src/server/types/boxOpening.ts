import { z } from "zod"
import { Item } from "./item"

export type BoxOpening = z.infer<typeof BoxOpening>
export const BoxOpening = z.object({
  reward: Item,
  animation: z.object({
    rewardPosition: z.number(),
    itemsOrder: z.array(z.string()),
  }),
})

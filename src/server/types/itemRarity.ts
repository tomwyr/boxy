import { z } from "zod"

export type ItemRarity = z.infer<typeof ItemRarity>
export const ItemRarity = z.enum([
  "common",
  "rare",
  "unique",
  "epic",
  "legendary",
])

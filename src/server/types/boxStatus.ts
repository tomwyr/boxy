import { z } from "zod"

export type BoxStatus = z.infer<typeof BoxStatus>
export const BoxStatus = z.enum(["closed", "open"])

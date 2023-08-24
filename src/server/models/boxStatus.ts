export const BoxStatusValues = ["closed", "open"] as const

export type BoxStatus = (typeof BoxStatusValues)[number]

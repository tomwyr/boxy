export const ItemRarityValues = [
  "common",
  "rare",
  "unique",
  "epic",
  "legendary",
] as const

export type ItemRarity = (typeof ItemRarityValues)[number]

export function getItemRarityProbability(itemRarity: ItemRarity): number {
  switch (itemRarity) {
    case "common":
      return 0.5
    case "rare":
      return 0.2
    case "unique":
      return 0.15
    case "epic":
      return 0.1
    case "legendary":
      return 0.05
  }
}

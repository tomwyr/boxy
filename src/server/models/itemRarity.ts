export enum ItemRarity {
  common,
  rare,
  unique,
  epic,
  legendary,
}

export function getItemRarityValue(itemRarity: ItemRarity): string {
  return ItemRarity[itemRarity]
}

export function getItemRarityProbability(itemRarity: ItemRarity): number {
  switch (itemRarity) {
    case ItemRarity.common:
      return 0.5
    case ItemRarity.rare:
      return 0.2
    case ItemRarity.unique:
      return 0.15
    case ItemRarity.epic:
      return 0.1
    case ItemRarity.legendary:
      return 0.05
  }
}

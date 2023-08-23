import { ItemRarity } from "../../server/models/itemRarity"

const ItemRarityProps = (itemRarity: ItemRarity) => {
  return {
    get name(): string {
      switch (itemRarity) {
        case ItemRarity.common:
          return "Common"
        case ItemRarity.rare:
          return "Rare"
        case ItemRarity.unique:
          return "Unique"
        case ItemRarity.epic:
          return "Epic"
        case ItemRarity.legendary:
          return "Legendary"
      }
    },

    get textColor(): string {
      switch (itemRarity) {
        case ItemRarity.common:
          return "text-item-rarity-common"
        case ItemRarity.rare:
          return "text-item-rarity-rare"
        case ItemRarity.unique:
          return "text-item-rarity-unique"
        case ItemRarity.epic:
          return "text-item-rarity-epic"
        case ItemRarity.legendary:
          return "text-item-rarity-legendary"
      }
    },

    get bgColor(): string {
      switch (itemRarity) {
        case ItemRarity.common:
          return "bg-item-rarity-common"
        case ItemRarity.rare:
          return "bg-item-rarity-rare"
        case ItemRarity.unique:
          return "bg-item-rarity-unique"
        case ItemRarity.epic:
          return "bg-item-rarity-epic"
        case ItemRarity.legendary:
          return "bg-item-rarity-legendary"
      }
    },
  }
}

export default ItemRarityProps

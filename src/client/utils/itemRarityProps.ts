import { ItemRarity } from "../../server/types/itemRarity"

export const ItemRarityProps = (itemRarity: ItemRarity) => {
  return {
    get name(): string {
      switch (itemRarity) {
        case "common":
          return "Common"
        case "rare":
          return "Rare"
        case "unique":
          return "Unique"
        case "epic":
          return "Epic"
        case "legendary":
          return "Legendary"
      }
    },

    get textColor(): string {
      switch (itemRarity) {
        case "common":
          return "text-item-rarity-common"
        case "rare":
          return "text-item-rarity-rare"
        case "unique":
          return "text-item-rarity-unique"
        case "epic":
          return "text-item-rarity-epic"
        case "legendary":
          return "text-item-rarity-legendary"
      }
    },

    get bgColor(): string {
      switch (itemRarity) {
        case "common":
          return "bg-item-rarity-common"
        case "rare":
          return "bg-item-rarity-rare"
        case "unique":
          return "bg-item-rarity-unique"
        case "epic":
          return "bg-item-rarity-epic"
        case "legendary":
          return "bg-item-rarity-legendary"
      }
    },
  }
}

import { Box } from "../../types/box"
import { Item } from "../../types/item"
import { ItemRarity } from "../../types/itemRarity"

export const boxReward = {
  getRandomReward(box: Box): Item {
    const totalProbability = box.items.reduce(
      (total, item) => total + getItemRarityProbability(item.rarity),
      0.0,
    )

    const rewardProbabilityShift = Math.random() * totalProbability

    let currentProbabilityShift = 0.0
    for (let item of box.items) {
      currentProbabilityShift += getItemRarityProbability(item.rarity)
      if (currentProbabilityShift >= rewardProbabilityShift) {
        return item
      }
    }

    throw "Reward not found."
  },
}

function getItemRarityProbability(itemRarity: ItemRarity): number {
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

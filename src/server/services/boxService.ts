import { Box, BoxOpeningResult } from "../models/box"
import { Item } from "../models/item"
import { getItemRarityProbability } from "../models/itemRarity"

const boxService = {
  open(box: Box): BoxOpeningResult {
    const totalProbability = box.items.reduce(
      (total, item) => total + getItemRarityProbability(item.rarity),
      0.0,
    )

    const rewardProbabilityShift = Math.random() * totalProbability

    let reward: Item | undefined

    let currentProbabilityShift = 0.0
    for (let item of box.items) {
      currentProbabilityShift += getItemRarityProbability(item.rarity)
      if (currentProbabilityShift >= rewardProbabilityShift) {
        reward = item
        break
      }
    }

    if (!reward) {
      throw "Reward not found."
    }

    return {
      reward: reward,
    }
  },
}

export default boxService

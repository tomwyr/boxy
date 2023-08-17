import { Box, BoxOpeningResult } from "../models/box"
import { Item, ItemRarity } from "../models/item"

const boxService = {
  open(box: Box): BoxOpeningResult {
    const totalProbability = box.items.reduce(
      (total, item) => total + ItemRarity.getProbability(item.rarity),
      0.0,
    )

    const rewardProbabilityShift = Math.random() * totalProbability

    let reward: Item | undefined

    let currentProbabilityShift = 0.0
    for (let item of box.items) {
      currentProbabilityShift += ItemRarity.getProbability(item.rarity)
      if (currentProbabilityShift >= rewardProbabilityShift) {
        reward = item
        break
      }
    }

    if (!reward) {
      throw "dupa"
    }

    return {
      reward: reward,
    }
  },
}

export default boxService

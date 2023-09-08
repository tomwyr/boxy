import { Box } from "../../types/box"
import { BoxOpening } from "../../types/boxOpening"
import { Item } from "../../types/item"
import { ItemRarity } from "../../types/itemRarity"

export const boxOpening = {
  getRandomBoxOpening(box: Box): BoxOpening {
    const reward = getReward(box)
    const itemsOrder = getItemsOrder(box)
    const rewardPosition = getRewardPosition(reward.id, itemsOrder)

    return {
      reward: reward,
      animation: {
        rewardPosition: rewardPosition,
        itemsOrder: itemsOrder,
      },
    }
  },
}

function getReward(box: Box): Item {
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
}

function getRewardPosition(rewardId: string, itemsOrder: string[]): number {
  const range = { min: 60, max: 80 }
  const randomLength = Math.floor(
    range.min + Math.random() * (range.max - range.min),
  )

  for (let itemShift = 0; itemShift < itemsOrder.length; itemShift++) {
    const itemIndex = (randomLength + itemShift) % itemsOrder.length
    const itemId = itemsOrder[itemIndex]
    if (itemId == rewardId) {
      return randomLength + itemShift
    }
  }

  throw "Reward not found in box opening items."
}

function getItemsOrder(box: Box): string[] {
  return box.items.map((item) => item.id).sort(() => Math.random() - 0.5)
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

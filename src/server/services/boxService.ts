import { Box, BoxId, NewBox } from "../models/box"
import { Item } from "../models/item"
import { getItemRarityProbability } from "../models/itemRarity"
import { dbInit } from "../storage/db"
import itemService from "./itemService"

const boxService = {
  async getBox(input: BoxId): Promise<Box> {
    const db = await dbInit

    const box = db.data.boxes.find((box) => (box.id = input.boxId))

    if (!box) {
      throw "Box not found."
    }

    return box
  },

  async createBox(input: NewBox): Promise<Box> {
    try {
      const db = await dbInit

      const items = await itemService.getItemsByIds(input.itemIds)

      const box = {
        id: crypto.randomUUID(),
        items: items,
      }
      db.data.boxes.push(box)

      await db.write()

      return box
    } catch (e) {
      console.log(e)

      throw e
    }
  },

  async openBox(input: BoxId): Promise<{ reward: Item }> {
    const box = await this.getBox(input)

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

import { Box, DbBox, NewBox } from "../models/box"
import { Item } from "../models/item"
import { getItemRarityProbability } from "../models/itemRarity"
import { dbInit } from "../storage/db"
import itemService from "./itemService"

const boxService = {
  async getBox(boxId: string): Promise<Box> {
    const db = await dbInit

    const dbBox = db.data.boxes.find((box) => (box.id = boxId))

    if (!dbBox) {
      throw "Box not found."
    }

    const items = await itemService.getItemsByIds(dbBox.itemIds)

    return {
      ...dbBox,
      items: items,
    }
  },

  async createBox(input: NewBox): Promise<Box> {
    const db = await dbInit

    await itemService.verifyAllItemsExist(input.itemIds)

    const dbBox: DbBox = {
      id: crypto.randomUUID(),
      status: "closed",
      itemIds: input.itemIds,
    }
    db.data.boxes.push(dbBox)

    await db.write()

    return await this.getBox(dbBox.id)
  },

  async openBox(boxId: string): Promise<Item> {
    const box = await this.getBox(boxId)

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

    return reward
  },
}

export default boxService

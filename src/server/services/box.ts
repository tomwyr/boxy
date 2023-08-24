import { dbInit } from "../storage/db"
import { DbBox } from "../storage/types/box"
import { NewBox, OpenBox } from "../types/box"
import { itemService } from "./item"
import { boxOpener } from "./utils/boxOpener"

export const boxService = {
  async getBox(boxId: string) {
    const db = await dbInit

    const dbBox = db.data.boxes.find((dbBox) => (dbBox.id = boxId))

    if (!dbBox) {
      throw "Box not found."
    }

    const items = await itemService.getItemsByIds(dbBox.itemIds)

    const box = {
      id: dbBox.id,
      status: dbBox.status,
      items: items,
    }

    switch (dbBox.status) {
      case "closed":
        return {
          ...box,
          status: dbBox.status,
        }
      case "open":
        if (!dbBox.rewardId) {
          throw "Reward id not found."
        }

        const reward = await itemService.getItem(dbBox.rewardId)

        return {
          ...box,
          status: dbBox.status,
          reward: reward,
        }
    }
  },

  async createBox(newBox: NewBox) {
    const db = await dbInit

    await itemService.verifyAllItemsExist(newBox.itemIds)

    const dbBox: DbBox = {
      id: crypto.randomUUID(),
      status: "closed",
      itemIds: newBox.itemIds,
    }
    db.data.boxes.push(dbBox)

    await db.write()

    return await this.getBox(dbBox.id)
  },

  async openBox(boxId: string) {
    const box = await this.getBox(boxId)
    const reward = boxOpener.getRandomReward(box)

    const openBox: OpenBox = {
      id: box.id,
      items: box.items,
      status: "open",
      reward: reward,
    }

    return openBox
  },
}

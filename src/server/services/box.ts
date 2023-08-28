import { dbInit } from "../storage/db"
import { BaseBox, Box, ClosedBox, NewBox, OpenBox } from "../types/box"
import { boxReward } from "./utils/boxReward"

export const boxService = {
  async getBox(boxId: string): Promise<Box> {
    const db = await dbInit

    const data = await db.box.findUniqueOrThrow({
      where: { id: boxId },
      include: {
        items: true,
        reward: true,
      },
    })

    return Box.parse(data)
  },

  async getBoxes(): Promise<Box[]> {
    const db = await dbInit

    const data = await db.box.findMany({
      include: {
        items: true,
        reward: true,
      },
    })

    return data.map((box) => Box.parse(box))
  },

  async updateBox(box: Box): Promise<Box> {
    const db = await dbInit

    const baseBox: BaseBox = box
    const updatedBox = await db.box.update({
      where: { id: box.id },
      data: {
        ...baseBox,
        rewardId: getRewardIdOrNull(box),
        items: {
          set: box.items.map((item) => ({
            id: item.id,
          })),
        },
      },
      include: {
        items: true,
        reward: true,
      },
    })

    return Box.parse(updatedBox)
  },

  async createBox(newBox: NewBox): Promise<ClosedBox> {
    const db = await dbInit

    const data = await db.box.create({
      data: {
        status: "closed",
        items: {
          connect: newBox.itemIds.map((itemId) => ({
            id: itemId,
          })),
        },
      },
      include: {
        items: true,
        reward: true,
      },
    })

    return ClosedBox.parse(data)
  },

  async openBox(boxId: string): Promise<OpenBox> {
    const db = await dbInit

    const box = await this.getBox(boxId)
    const reward = boxReward.getRandomReward(box)

    const updatedBox = await db.box.update({
      where: { id: box.id },
      data: {
        status: "open",
        rewardId: reward.id,
      },
      include: {
        items: true,
        reward: true,
      },
    })

    return OpenBox.parse(updatedBox)
  },
}

function getRewardIdOrNull(box: Box) {
  switch (box.status) {
    case "closed":
      return null
    case "open":
      return box.reward.id
  }
}

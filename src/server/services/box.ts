import { dbInit } from "../storage/db"
import { BaseBox, Box, ClosedBox, NewBox, OpenBox } from "../types/box"
import { BoxOpening } from "../types/boxOpening"
import { boxOpening } from "./utils/boxOpening"

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
      orderBy: {
        createdAt: "desc",
      },
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

  async openBox(boxId: string): Promise<BoxOpening> {
    const db = await dbInit

    const box = await this.getBox(boxId)
    if (box.status == "open") {
      throw "Box has already been opened."
    }

    const opening = boxOpening.getRandomBoxOpening(box)

    await db.box.update({
      where: { id: box.id },
      data: {
        status: "open",
        rewardId: opening.reward.id,
      },
      include: {
        items: true,
        reward: true,
      },
    })

    return BoxOpening.parse(opening)
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

import { dbInit } from "../storage/db"
import { Item, NewItem } from "../types/item"

export const itemService = {
  async getItem(itemId: string): Promise<Item> {
    const db = await dbInit

    const item = await db.item.findUnique({
      where: { id: itemId },
    })
    if (!item) {
      throw "Item not found."
    }

    return item
  },

  async getItems(itemIds?: string[]): Promise<Item[]> {
    const db = await dbInit

    let items: Item[]
    if (itemIds) {
      items = await db.item.findMany()
    } else {
      items = await db.item.findMany({
        where: { id: { in: itemIds } },
      })
    }

    return items
  },

  async addItem(newItem: NewItem): Promise<Item> {
    const db = await dbInit

    const item = await db.item.create({
      data: newItem,
    })

    return item
  },

  async updateItem(item: Item): Promise<Item> {
    const db = await dbInit

    const updatedItem = await db.item.update({
      where: { id: item.id },
      data: item,
    })

    return updatedItem
  },

  async deleteItem(itemId: string): Promise<void> {
    const db = await dbInit

    await db.item.delete({
      where: { id: itemId },
    })
  },
}

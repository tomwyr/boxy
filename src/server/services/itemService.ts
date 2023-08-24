import { Item, NewItem } from "../models/item"
import { dbInit } from "../storage/db"

const itemService = {
  async getItems() {
    const db = await dbInit

    return db.data.items
  },

  async getItemsByIds(itemIds: string[]) {
    const db = await dbInit

    const remainingItemIds = [...itemIds]
    const foundItems = []

    for (const item of db.data.items) {
      const itemIdIndex = remainingItemIds.indexOf(item.id)
      if (itemIdIndex != -1) {
        foundItems.push(item)
        remainingItemIds.splice(itemIdIndex, 1)
      }
      if (remainingItemIds.length == 0) {
        break
      }
    }

    if (remainingItemIds.length > 0) {
      throw "Not all items were found."
    }

    return foundItems
  },

  async addItem(newItem: NewItem) {
    const db = await dbInit

    const item = {
      id: crypto.randomUUID(),
      ...newItem,
    }
    db.data.items.push(item)

    await db.write()

    return item
  },

  async updateItem(item: Item) {
    const db = await dbInit

    const itemIndex = db.data.items.findIndex((dbItem) => dbItem.id == item.id)
    if (itemIndex == -1) {
      throw "Item not found."
    }
    db.data.items[itemIndex] = item

    await db.write()

    return item
  },

  async deleteItem(itemId: string) {
    const db = await dbInit

    const itemIndex = db.data.items.findIndex((dbItem) => dbItem.id == itemId)
    if (itemIndex == -1) {
      throw "Item not found"
    }
    db.data.items.splice(itemIndex, 1)

    await db.write()
  },

  async verifyAllItemsExist(itemIds: string[]) {
    await this.getItemsByIds(itemIds)
  },
}

export default itemService

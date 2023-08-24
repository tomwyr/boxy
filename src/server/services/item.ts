import { dbInit } from "../storage/db"
import { DbItem } from "../storage/types/item"
import { Item, NewItem } from "../types/item"

export const itemService = {
  async getItem(itemId: string) {
    const db = await dbInit

    const item = db.data.items.find((item) => item.id == itemId)

    if (!item) {
      throw "Item not found."
    }

    return item
  },

  async getItems() {
    const db = await dbInit

    return db.data.items.map((dbItem) => Item.parse(dbItem))
  },

  async getItemsByIds(itemIds: string[]) {
    const db = await dbInit

    const remainingItemIds: Array<string> = [...itemIds]
    const foundItems: Array<DbItem> = []

    for (const dbItem of db.data.items) {
      const itemIdIndex = remainingItemIds.indexOf(dbItem.id)
      if (itemIdIndex != -1) {
        foundItems.push(dbItem)
        remainingItemIds.splice(itemIdIndex, 1)
      }
      if (remainingItemIds.length == 0) {
        break
      }
    }

    if (remainingItemIds.length > 0) {
      throw "Not all items were found."
    }

    return foundItems.map((item) => Item.parse(item))
  },

  async addItem(newItem: NewItem) {
    const db = await dbInit

    const dbItem = DbItem.parse({
      id: crypto.randomUUID(),
      ...newItem,
    } satisfies DbItem)
    db.data.items.push(dbItem)

    await db.write()

    return Item.parse(dbItem)
  },

  async updateItem(item: Item) {
    const db = await dbInit

    const dbItemIndex = db.data.items.findIndex(
      (dbItem) => dbItem.id == item.id,
    )
    if (dbItemIndex == -1) {
      throw "Item not found."
    }
    const dbItem = DbItem.parse(item)
    db.data.items[dbItemIndex] = dbItem

    await db.write()

    return Item.parse(dbItem)
  },

  async deleteItem(itemId: string) {
    const db = await dbInit

    const dbItemIndex = db.data.items.findIndex((dbItem) => dbItem.id == itemId)
    if (dbItemIndex == -1) {
      throw "Item not found"
    }
    db.data.items.splice(dbItemIndex, 1)

    await db.write()
  },

  async verifyAllItemsExist(itemIds: string[]) {
    await this.getItemsByIds(itemIds)
  },
}

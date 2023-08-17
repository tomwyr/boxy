import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"

import * as path from "path"
import { Item, NewItem } from "../models/item"
import { ItemRarity } from "../models/itemRarity"
import { existsSync } from "fs"

type ItemsDb = {
  items: Item[]
}

const dbInit = openDb()

async function openDb(): Promise<Low<ItemsDb>> {
  const dbPath = path.resolve("./db.json")
  const adapter = new JSONFile<ItemsDb>(dbPath)
  const defaultData = { items: [] }

  const db = new Low(adapter, defaultData)

  if (!existsSync(dbPath)) {
    await db.write()
  }
  await db.read()

  return db
}

const itemService = {
  getItems: async () => {
    const db = await dbInit

    return db.data.items
  },

  addItem: async (newItem: NewItem) => {
    const db = await dbInit

    const item = {
      id: crypto.randomUUID(),
      ...newItem,
    }

    db.data.items.push(item)

    await db.write()

    return item
  },
}

export default itemService

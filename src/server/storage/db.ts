import { existsSync } from "fs"
import { JSONFile } from "lowdb/node"
import path from "path"
import { DbBox } from "../models/box"
import { Item } from "../models/item"
import { Low } from "lowdb"

export const dbInit = openDb()

type DbData = {
  items: Item[]
  boxes: DbBox[]
}

async function openDb(): Promise<Low<DbData>> {
  const dbPath = path.resolve("./db.json")
  const adapter = new JSONFile<DbData>(dbPath)
  const defaultData: DbData = {
    items: [],
    boxes: [],
  }

  const db = new Low(adapter, defaultData)
  if (!existsSync(dbPath)) {
    await db.write()
  }
  await db.read()

  return db
}

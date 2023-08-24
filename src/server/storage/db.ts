import { existsSync } from "fs"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import path from "path"
import { DbBox } from "./types/box"
import { DbItem } from "./types/item"

export const dbInit = openDb()

type DbData = {
  items: DbItem[]
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

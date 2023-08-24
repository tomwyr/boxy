import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import { BoxSchema, NewBoxSchema } from "../../../server/models/box"
import { ItemSchema, NewItemSchema } from "../../../server/models/item"
import boxService from "../../../server/services/boxService"
import itemService from "../../../server/services/itemService"
import { publicProcedure, router } from "../../../server/trpc"

const appRouter = router({
  getItems: publicProcedure
    .output(z.array(ItemSchema))
    .query(itemService.getItems),

  addItem: publicProcedure
    .input(NewItemSchema)
    .output(ItemSchema)
    .mutation(({ input }) => itemService.addItem(input)),

  updateItem: publicProcedure
    .input(ItemSchema)
    .output(ItemSchema)
    .mutation(({ input }) => itemService.updateItem(input)),

  deleteItem: publicProcedure
    .input(z.string())
    .mutation(({ input }) => itemService.deleteItem(input)),

  getBox: publicProcedure
    .input(z.string())
    .output(BoxSchema)
    .query(({ input }) => boxService.getBox(input)),

  createBox: publicProcedure
    .input(NewBoxSchema)
    .output(BoxSchema)
    .mutation(({ input }) => boxService.createBox(input)),

  openBox: publicProcedure
    .input(z.string())
    .query(({ input }) => boxService.openBox(input)),
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import {
  BoxIdSchema,
  BoxSchema,
  NewBoxSchema,
} from "../../../server/models/box"
import {
  ItemIdSchema,
  ItemSchema,
  NewItemSchema,
} from "../../../server/models/item"
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
    .input(ItemIdSchema)
    .mutation(({ input }) => itemService.deleteItem(input)),

  getBox: publicProcedure
    .input(BoxIdSchema)
    .output(BoxSchema)
    .query(({ input }) => boxService.getBox(input)),

  createBox: publicProcedure
    .input(NewBoxSchema)
    .output(BoxSchema)
    .mutation(({ input }) => boxService.createBox(input)),

  openBox: publicProcedure
    .input(BoxIdSchema)
    .query(({ input }) => boxService.openBox(input)),
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

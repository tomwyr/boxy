import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import {
  DeleteItemInputSchema,
  ItemSchema,
  NewItemSchema,
} from "../../../server/models/item"
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
    .input(DeleteItemInputSchema)
    .mutation(({ input }) => itemService.deleteItem(input)),
})

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

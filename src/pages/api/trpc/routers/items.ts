import { z } from "zod"
import { itemService } from "../../../../server/services/item"
import { publicProcedure, router } from "../../../../server/trpc"
import { Item, NewItem } from "../../../../server/types/item"

export const itemsRouter = router({
  getItems: publicProcedure
    .output(z.array(Item))
    .query(() => itemService.getItems()),

  addItem: publicProcedure
    .input(NewItem)
    .output(Item)
    .mutation(({ input }) => itemService.addItem(input)),

  updateItem: publicProcedure
    .input(Item)
    .output(Item)
    .mutation(({ input }) => itemService.updateItem(input)),

  deleteItem: publicProcedure
    .input(z.string())
    .mutation(({ input }) => itemService.deleteItem(input)),
})

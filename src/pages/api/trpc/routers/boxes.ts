import { z } from "zod"
import { boxService } from "../../../../server/services/box"
import { publicProcedure, router } from "../../../../server/trpc"
import { Box, ClosedBox, NewBox } from "../../../../server/types/box"
import { BoxOpening } from "../../../../server/types/boxOpening"

export const boxesRouter = router({
  getBox: publicProcedure
    .input(z.string())
    .output(Box)
    .query(({ input }) => boxService.getBox(input)),

  getBoxes: publicProcedure
    .output(z.array(Box))
    .query(() => boxService.getBoxes()),

  createBox: publicProcedure
    .input(NewBox)
    .output(ClosedBox)
    .mutation(({ input }) => boxService.createBox(input)),

  openBox: publicProcedure
    .input(z.string())
    .output(BoxOpening)
    .query(({ input }) => boxService.openBox(input)),
})

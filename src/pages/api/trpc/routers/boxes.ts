import { z } from "zod"
import { boxService } from "../../../../server/services/box"
import { publicProcedure, router } from "../../../../server/trpc"
import { Box, NewBox } from "../../../../server/types/box"

export const boxesRouter = router({
  getBox: publicProcedure
    .input(z.string())
    .output(Box)
    .query(({ input }) => boxService.getBox(input)),

  createBox: publicProcedure
    .input(NewBox)
    .output(Box)
    .mutation(({ input }) => boxService.createBox(input)),

  openBox: publicProcedure
    .input(z.string())
    .query(({ input }) => boxService.openBox(input)),
})

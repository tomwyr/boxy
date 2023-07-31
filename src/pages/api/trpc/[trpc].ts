import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { publicProcedure, router } from "../../../server/trpc";

const appRouter = router({
  greeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .output(
      z.object({
        message: z.string(),
      })
    )
    .query(async ({ input }) => {
      await delay(2000);

      return {
        message: `Hello ${input.name}!`,
      };
    }),
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

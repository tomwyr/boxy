import * as trpcNext from "@trpc/server/adapters/next"
import { mergeRouters } from "../../../server/trpc"
import { boxesRouter } from "./routers/boxes"
import { itemsRouter } from "./routers/items"

const appRouter = mergeRouters(itemsRouter, boxesRouter)

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  onError: console.log,
  createContext: () => ({}),
})

import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "../pages/api/trpc/[trpc]";

const baseUrl = "http://localhost:3000";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: baseUrl + "/api/trpc",
        }),
      ],
    };
  },

  ssr: false,
});

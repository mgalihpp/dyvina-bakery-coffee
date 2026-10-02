import { createTRPCRouter, publicProcedure } from "../init";

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => ({ ok: true })),
});

export type AppRouter = typeof appRouter;

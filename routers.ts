import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLetter, getAllLetters, getLetterById, addReactionToLetter } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Letter management routes
  letters: router({
    // Get all letters
    getAll: publicProcedure.query(async () => {
      try {
        const allLetters = await getAllLetters();
        return allLetters;
      } catch (error) {
        console.error("Error fetching letters:", error);
        return [];
      }
    }),

    // Create a new letter
    create: publicProcedure
      .input(z.object({
        recipient: z.string(),
        sender: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const letter = await createLetter({
            recipient: input.recipient,
            sender: input.sender,
            message: input.message,
          });
          return letter;
        } catch (error) {
          console.error("Error creating letter:", error);
          throw error;
        }
      }),

    // Get a single letter by ID
    getById: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ input }) => {
        try {
          const letter = await getLetterById(input.id);
          return letter;
        } catch (error) {
          console.error("Error fetching letter:", error);
          return null;
        }
      }),

    // Add reaction to a letter
    addReaction: publicProcedure
      .input(z.object({
        letterId: z.string(),
        emoji: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const updated = await addReactionToLetter(input.letterId, input.emoji);
          return updated;
        } catch (error) {
          console.error("Error adding reaction:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

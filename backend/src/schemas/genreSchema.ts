import { z } from 'zod';

export const createGenreSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional().nullable(),
  }),
});

export const updateGenreSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
  }),
});

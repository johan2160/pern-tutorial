import { z } from 'zod';

export const createAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    biography: z.string().optional().nullable(),
  }),
});

export const updateAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    biography: z.string().optional().nullable(),
  }),
});

import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    number_of_pages: z.number().int().positive({ message: "Must be a positive integer" }),
    is_read: z.boolean().optional(),
    release_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    author_id: z.number().int(),
    genre_id: z.number().int().optional().nullable(),
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    number_of_pages: z.number().int().positive().optional(),
    is_read: z.boolean().optional(),
    release_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }).optional(),
    author_id: z.number().int().optional(),
    genre_id: z.number().int().optional().nullable(),
  }),
});

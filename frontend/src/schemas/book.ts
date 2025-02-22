import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  author_id: z.number().positive('Select an author'),
  number_of_pages: z.number().int().positive('Must be a positive number'),
  is_read: z.boolean(),
  release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  genre_id: z.number().nullable().optional()
})

export type BookFormValues = z.infer<typeof bookSchema>
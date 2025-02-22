import { z } from 'zod'

export const genreSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional().nullable(),
})

export type GenreFormValues = z.infer<typeof genreSchema>
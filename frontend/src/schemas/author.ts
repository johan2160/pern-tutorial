import { z } from 'zod'

export const authorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  biography: z.string().optional().nullable(),
})

export type AuthorFormValues = z.infer<typeof authorSchema>

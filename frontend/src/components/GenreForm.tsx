'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { genreSchema, GenreFormValues } from '../schemas/genre'

interface GenreFormProps {
  initialData?: GenreFormValues
  onSubmit: (data: GenreFormValues) => Promise<void>
  isLoading: boolean
}


export const GenreForm = ({ initialData, onSubmit, isLoading }: GenreFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
      <div>
        <label className="block mb-1 text-sm md:text-base" htmlFor="name">Name *</label>
        <input
          {...register('name')}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading}
        />
        {errors.name && (
          <span className="text-red-500 text-xs md:text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm md:text-base" htmlFor="description">Description</label>
        <textarea
          {...register('description')}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-black text-white dark:bg-white dark:text-black rounded hover:bg-black/80 dark:hover:bg-white/80 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Genre'}
      </button>
    </form>
  )
}
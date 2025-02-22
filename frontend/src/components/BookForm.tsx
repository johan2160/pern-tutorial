'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, BookFormValues } from '../schemas/book'
import { useAuthors } from '../hooks/useAuthors'
import { useGenres } from '../hooks/useGenres'


interface BookFormProps {
  initialData?: BookFormValues
  onSubmit: (data: BookFormValues) => Promise<void>
  isLoading: boolean
}

export const BookForm = ({ initialData, onSubmit, isLoading }: BookFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData,
  })

  const { data: authors = [], isLoading: authorsLoading } = useAuthors()
  const { data: genres = [], isLoading: genresLoading } = useGenres()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
      <div>
        <label className="block mb-1 text-sm md:text-base" htmlFor="title">Title *</label>
        <input
          {...register('title')}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading}
        />
        {errors.title && <span className="text-red-500 text-xs md:text-sm">{errors.title.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-sm md:text-base">Author *</label>
        <select
          {...register('author_id', { valueAsNumber: true })}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading || authorsLoading}
        >
          <option value="">Select an author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
        {errors.author_id && <span className="text-red-500 text-xs md:text-sm">{errors.author_id.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-sm md:text-base">Genre</label>
        <select
          {...register('genre_id', { valueAsNumber: true })}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading || genresLoading}
        >
          <option value="">Select a genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm md:text-base">Pages *</label>
        <input
          type="number"
          {...register('number_of_pages', { valueAsNumber: true })}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading}
        />
        {errors.number_of_pages && <span className="text-red-500 text-xs md:text-sm">{errors.number_of_pages.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-sm md:text-base">Release Date *</label>
        <input
          type="date"
          {...register('release_date')}
          className="w-full p-1.5 md:p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none text-sm md:text-base"
          disabled={isLoading}
        />
        {errors.release_date && <span className="text-red-500 text-xs md:text-sm">{errors.release_date.message}</span>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('is_read')}
          className="w-4 h-4"
          disabled={isLoading}
        />
        <label className="text-sm md:text-base">Mark as read</label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-black text-white dark:bg-white dark:text-black rounded hover:bg-black/80 dark:hover:bg-white/80 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Book'}
      </button>
    </form>
  )
}
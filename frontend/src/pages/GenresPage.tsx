'use client'

import { useState } from 'react'
import { Genre } from '../types/genre'
import { useCreateGenre, useDeleteGenre, useGenres, useUpdateGenre } from '../hooks/useGenres'
import { GenreFormValues } from '../schemas/genre'
import { GenreList } from '../components/GenreList'
import { GenreForm } from '../components/GenreForm'

export default function GenresPage() {
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const { data: genres = [], isLoading } = useGenres()
  const createMutation = useCreateGenre()
  const updateMutation = useUpdateGenre()
  const deleteMutation = useDeleteGenre()

  const handleCreate = async (data: GenreFormValues) => {
    await createMutation.mutateAsync(data)
    setShowCreateDialog(false)
  }

  const handleUpdate = async (data: GenreFormValues) => {
    if (!editingGenre) return
    await updateMutation.mutateAsync({ id: editingGenre.id, data })
    setEditingGenre(null)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Genres Management</h1>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-black text-white hover:bg-black/90 dark:text-black dark:bg-white/90 dark:hover:bg-white/90 rounded transition-colors"
        >
          Create New Genre
        </button>
      </div>

      {isLoading ? (
        <div className="text-sm md:text-base text-gray-500">Loading genres...</div>
      ) : genres.length > 0 ? (
        <GenreList
          genres={genres}
          onEdit={setEditingGenre}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      ) : (
        <div className="text-sm md:text-base text-gray-500">No genres found. Create one to get started.</div>
      )}

      {(showCreateDialog || editingGenre) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 md:p-4">
          <div className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              {editingGenre ? 'Edit Genre' : 'Create New Genre'}
            </h2>
            
            <GenreForm
              initialData={editingGenre ?? undefined}
              onSubmit={editingGenre ? handleUpdate : handleCreate}
              isLoading={editingGenre ? updateMutation.isPending : createMutation.isPending}
            />

            <button
              onClick={() => {
                setShowCreateDialog(false)
                setEditingGenre(null)
              }}
              className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-gray-300 text-black hover:bg-gray-300/70 dark:bg-gray-700 dark:hover:bg-gray-700/70 dark:text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
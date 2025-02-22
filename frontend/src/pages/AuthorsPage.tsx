import { useState } from 'react'
import AuthorForm from '../components/AuthorForm'
import AuthorList from '../components/AuthorList'
import { useAuthors, useCreateAuthor, useUpdateAuthor, useDeleteAuthor } from '../hooks/useAuthors'
import { Author } from '../types/author'
import { AuthorFormValues } from '../schemas/author'

export default function AuthorsPage() {
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const { data: authors = [], isLoading } = useAuthors()
  const createMutation = useCreateAuthor()
  const updateMutation = useUpdateAuthor()
  const deleteMutation = useDeleteAuthor()

  const handleCreate = async (data: AuthorFormValues) => {
    await createMutation.mutateAsync(data)
    setShowCreateDialog(false)
  }

  const handleUpdate = async (data: AuthorFormValues) => {
    if (!editingAuthor) return
    await updateMutation.mutateAsync({ id: editingAuthor.id, data })
    setEditingAuthor(null)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Authors Management</h1>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-black text-white hover:bg-black/90 dark:text-black dark:bg-white/90 dark:hover:bg-white/90 rounded transition-colors"
        >
          Create New Author
        </button>
      </div>

      {isLoading && <div className="text-sm md:text-base text-gray-500">Loading authors...</div>}

      {!isLoading && createMutation.isError && (
        <div className="text-sm md:text-base text-red-500">Error creating author: {(createMutation.error as Error).message}</div>
      )}

      {!isLoading && updateMutation.isError && (
        <div className="text-sm md:text-base text-red-500">Error updating author: {(updateMutation.error as Error).message}</div>
      )}

      {!isLoading && authors.length > 0 && (
        <AuthorList
          authors={authors}
          onEdit={setEditingAuthor}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      {!isLoading && authors.length === 0 && (
        <div className="text-sm md:text-base text-gray-500">No authors found. Create one to get started.</div>
      )}

      {(showCreateDialog || editingAuthor) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 md:p-4">
          <div className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              {editingAuthor ? 'Edit Author' : 'Create New Author'}
            </h2>
            
            <AuthorForm
              initialData={editingAuthor ?? undefined}
              onSubmit={editingAuthor ? handleUpdate : handleCreate}
              isLoading={editingAuthor ? updateMutation.isPending : createMutation.isPending}
            />

            <button
              onClick={() => {
                setShowCreateDialog(false)
                setEditingAuthor(null)
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

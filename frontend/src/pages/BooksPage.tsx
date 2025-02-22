'use client'

import { useState } from 'react'
import { Book } from '../types/book'
import { useBooks, useCreateBook, useDeleteBook, useUpdateBook } from '../hooks/useBooks'
import { BookFormValues } from '../schemas/book'
import { BookList } from '../components/BookList'
import { BookForm } from '../components/BookForm'

export default function BooksPage() {
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const { data: books = [], isLoading } = useBooks()
  const createMutation = useCreateBook()
  const updateMutation = useUpdateBook()
  const deleteMutation = useDeleteBook()

  const handleCreate = async (data: BookFormValues) => {
    await createMutation.mutateAsync(data)
    setShowCreateDialog(false)
  }

  const handleUpdate = async (data: BookFormValues) => {
    if (!editingBook) return
    await updateMutation.mutateAsync({ id: editingBook.id, data })
    setEditingBook(null)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Books Management</h1>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-black text-white hover:bg-black/90 dark:text-black dark:bg-white/90 dark:hover:bg-white/90 rounded transition-colors"
        >
          Create New Book
        </button>
      </div>

      {isLoading ? (
        <div className="text-sm md:text-base text-gray-500">Loading books...</div>
      ) : books.length > 0 ? (
        <BookList
          books={books}
          onEdit={setEditingBook}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      ) : (
        <div className="text-sm md:text-base text-gray-500">No books found. Create one to get started.</div>
      )}

      {(showCreateDialog || editingBook) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 md:p-4">
          <div className="bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              {editingBook ? 'Edit Book' : 'Create New Book'}
            </h2>
            
            <BookForm
              initialData={editingBook ?? undefined}
              onSubmit={editingBook ? handleUpdate : handleCreate}
              isLoading={editingBook ? updateMutation.isPending : createMutation.isPending}
            />

            <button
              onClick={() => {
                setShowCreateDialog(false)
                setEditingBook(null)
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
'use client'

import { Link } from "react-router-dom"
import { Book } from "../types/book"



interface BookListProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const BookList = ({ books, onEdit, onDelete, isDeleting }: BookListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 dark:border-gray-700 text-sm md:text-base">
        <thead className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white">
          <tr>
            <th className="p-2 md:p-3 text-left">Title</th>
            <th className="p-2 md:p-3 text-left">Author</th>
            <th className="p-2 md:p-3 text-left">Genre</th>
            <th className="p-2 md:p-3 text-left">Pages</th>
            <th className="p-2 md:p-3 text-left">Read</th>
            <th className="p-2 md:p-3 text-left">Release Date</th>
            <th className="p-2 md:p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} className="border-t border-gray-300 dark:border-gray-700">
              <td className="p-2 md:p-3 align-top">{book.title}</td>
              <td className="p-2 md:p-3 align-top">{book.author.name}</td>
              <td className="p-2 md:p-3 align-top">{book.genre?.name || '-'}</td>
              <td className="p-2 md:p-3 align-top">{book.number_of_pages}</td>
              <td className="p-2 md:p-3 align-top">{book.is_read ? 'Yes' : 'No'}</td>
              <td className="p-2 md:p-3 align-top">{new Date(book.release_date).toLocaleDateString()}</td>
              <td className="p-2 md:p-3 space-x-1 md:space-x-2 flex justify-end">
                <Link
                  to={`/books/${book.id}`}
                  className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  View
                </Link>
                <button
                  onClick={() => onEdit(book)}
                  className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  disabled={isDeleting}
                  className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
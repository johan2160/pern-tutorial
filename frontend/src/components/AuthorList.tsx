import React from 'react'
import { Author } from '../types/author'

interface AuthorListProps {
  authors: Author[]
  onEdit: (author: Author) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, onEdit, onDelete, isDeleting }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 dark:border-gray-700 text-sm md:text-base">
        <thead className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white">
          <tr>
            <th className="p-2 md:p-3 text-left w-[20%]">Name</th>
            <th className="p-2 md:p-3 text-left min-w-[300px]">Biography</th>
            <th className="p-2 md:p-3 text-right w-[25%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id} className="border-t border-gray-300 dark:border-gray-700">
              <td className="p-2 md:p-3 align-top">{author.name}</td>
              <td className="p-2 md:p-3 align-top overflow-x-auto max-w-[500px]">
                <div className="max-h-[100px] overflow-y-auto">
                  {author.biography || '-'}
                </div>
              </td>
              <td className="p-2 md:p-3 space-x-1 md:space-x-2 flex justify-end">
                <button
                  onClick={() => onEdit(author)}
                  className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(author.id)}
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

export default AuthorList

import { useParams, useNavigate } from 'react-router-dom'
import { useBook } from '../hooks/useBooks'

export default function BookDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const bookId = parseInt(id as string)
  const { data: book, isLoading, isError } = useBook(bookId)

  if (isLoading)
    return (
      <div className="text-center p-2 md:p-4 text-sm md:text-base">
        Loading book details...
      </div>
    )
  if (isError || !book)
    return (
      <div className="text-center p-2 md:p-4 text-sm md:text-base">
        Book not found
      </div>
    )

  return (
    <div className="container mx-auto p-2 md:p-4 max-w-2xl">
      <div className="mb-2 md:mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-600 text-sm md:text-base"
        >
          ← Back to Books
        </button>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
          {book.title}
        </h1>

        <div className="space-y-2 md:space-y-4">
          <div>
            <label className="font-semibold text-sm md:text-base">
              Author:
            </label>
            <p className="mt-1 text-sm md:text-base">
              {book.author.name}
            </p>
            {book.author.biography && (
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
                {book.author.biography}
              </p>
            )}
          </div>

          {book.genre && (
            <div>
              <label className="font-semibold text-sm md:text-base">
                Genre:
              </label>
              <p className="mt-1 text-sm md:text-base">
                {book.genre.name}
              </p>
              {book.genre.description && (
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
                  {book.genre.description}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="font-semibold text-sm md:text-base">
              Pages:
            </label>
            <p className="mt-1 text-sm md:text-base">
              {book.number_of_pages}
            </p>
          </div>

          <div>
            <label className="font-semibold text-sm md:text-base">
              Reading Status:
            </label>
            <p className="mt-1 text-sm md:text-base">
              {book.is_read ? 'Read' : 'Unread'}
            </p>
          </div>

          <div>
            <label className="font-semibold text-sm md:text-base">
              Release Date:
            </label>
            <p className="mt-1 text-sm md:text-base">
              {new Date(book.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

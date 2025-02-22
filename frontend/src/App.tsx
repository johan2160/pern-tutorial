import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AuthorsPage from './pages/AuthorsPage'
import GenresPage from './pages/GenresPage'
import BooksPage from './pages/BooksPage'
import { Providers } from './providers/Providers'
import BookDetailPage from './components/BookDetailPage'

const App: React.FC = () => {
  return (
    <Providers>
      <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
        <nav className="mb-8 flex justify-center gap-8 p-4 bg-gray-200 text-dark dark:bg-gray-800 dark:text-white">
          <Link to="/" className="hover:text-blue-800 dark:hover:text-blue-200">
            Home
          </Link>
          <Link to="/authors" className="hover:text-blue-800 dark:hover:text-blue-200">
            Authors
          </Link>
          <Link to="/genres" className="hover:text-blue-800 dark:hover:text-blue-200">
            Genres
          </Link>
          <Link to="/books" className="hover:text-blue-800 dark:hover:text-blue-200">
            Books
          </Link>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </Providers>
  )
}

export default App
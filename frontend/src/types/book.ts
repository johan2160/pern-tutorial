import { Author } from './author'
import { Genre } from './genre'

export interface Book {
  id: number
  title: string
  author: Author
  number_of_pages: number
  is_read: boolean
  release_date: string
  genre: Genre | null
  author_id: number
  genre_id?: number | null
}

export type BookCreate = Omit<Book, 'id' | 'author' | 'genre'> & {
  author_id: number
  genre_id?: number | null
}

export type BookUpdate = Partial<BookCreate>

export type BookTableItem = {
  id: number
  title: string
  authorName: string
  genreName: string | null
  numberOfPages: number
  isRead: boolean
  releaseDate: string
}
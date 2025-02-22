export interface Genre {
    id: number
    name: string
    description?: string | null
  }
  
  export type GenreCreate = Omit<Genre, 'id'>
  export type GenreUpdate = Partial<GenreCreate>
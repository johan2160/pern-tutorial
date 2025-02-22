export interface Author {
    id: number
    name: string
    biography?: string | null
  }
  
  export type AuthorCreate = Omit<Author, 'id'>
  export type AuthorUpdate = Partial<AuthorCreate>
  
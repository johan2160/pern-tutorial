import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../lib/api-client'
import { Author, AuthorCreate, AuthorUpdate } from '../types/author'

export const useAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await apiClient.get('/authors/')
      return response.data
    },
  })
}

export const useCreateAuthor = () => {
  const queryClient = useQueryClient()
  
  return useMutation<Author, Error, AuthorCreate>({
    mutationFn: async (authorData) => {
      const response = await apiClient.post('/authors/', authorData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    },
  })
}

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient()
  
  return useMutation<Author, Error, { id: number; data: AuthorUpdate }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.patch(`/authors/${id}/`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    },
  })
}

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/authors/${id}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    },
  })
}

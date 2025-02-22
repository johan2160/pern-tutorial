import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../lib/api-client'
import { Genre, GenreCreate, GenreUpdate } from '../types/genre'

export const useGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await apiClient.get('/genres/')
      return response.data
    },
  })
}

export const useCreateGenre = () => {
  const queryClient = useQueryClient()
  
  return useMutation<Genre, Error, GenreCreate>({
    mutationFn: async (genreData) => {
      const response = await apiClient.post('/genres/', genreData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] })
    },
  })
}

export const useUpdateGenre = () => {
  const queryClient = useQueryClient()
  
  return useMutation<Genre, Error, { id: number; data: GenreUpdate }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/genres/${id}/`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] })
    },
  })
}

export const useDeleteGenre = () => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/genres/${id}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] })
    },
  })
}
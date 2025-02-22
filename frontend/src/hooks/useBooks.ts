import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/api-client";
import { Book, BookCreate, BookUpdate } from "../types/book";

export const useBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await apiClient.get("/books/");
      return response.data;
    },
  });
};

export const useBook = (id: number) => {
  return useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await apiClient.get(`/books/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, BookCreate>({
    mutationFn: async (bookData) => {
      const response = await apiClient.post("/books/", bookData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, { id: number; data: BookUpdate }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/books/${id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/books/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

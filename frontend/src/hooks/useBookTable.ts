import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table'
import { Book } from '../types/book'

export const useBookTable = (books: Book[]) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = useMemo<ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'author.name',
        header: 'Author',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'genre.name',
        header: 'Genre',
        cell: info => info.getValue() || '-',
      },
      {
        accessorKey: 'number_of_pages',
        header: 'Pages',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'is_read',
        header: 'Read',
        cell: info => info.getValue() ? 'Yes' : 'No',
      },
      {
        accessorKey: 'release_date',
        header: 'Release Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
    []
  )

  const table = useReactTable({
    data: books,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Enable pagination
    manualPagination: false,
    pageCount: Math.ceil(books.length / pagination.pageSize),
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
  }
}
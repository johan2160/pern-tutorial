import { Book } from '../../types/book'
import { flexRender } from '@tanstack/react-table'
import { SearchBar } from './SearchBar'
import { TablePagination } from './TablePagination'
import { useBookTable } from '../../hooks/useBookTable'
import { Link } from 'react-router-dom'

interface BookTableProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const BookTable = ({ books, onEdit, onDelete, isDeleting }: BookTableProps) => {
  const { table, globalFilter, setGlobalFilter } = useBookTable(books)

  return (
    <div>
      <SearchBar value={globalFilter} onChange={setGlobalFilter} />
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 dark:border-gray-700 text-sm md:text-base">
          <thead className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white">
            <tr>
              {table.getHeaderGroups().map(headerGroup => (
                headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-2 md:p-3 text-left"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))
              ))}
              <th className="p-2 md:p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t border-gray-300 dark:border-gray-700">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 md:p-3 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="p-2 md:p-3 space-x-1 md:space-x-2 flex justify-end">
                  <Link
                    to={`/books/${row.original.id}`}
                    className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onEdit(row.original)}
                    className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row.original.id)}
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

      <TablePagination table={table} />
    </div>
  )
}
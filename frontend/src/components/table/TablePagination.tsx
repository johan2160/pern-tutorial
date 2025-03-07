import { Table } from '@tanstack/react-table'

interface TablePaginationProps<T> {
  table: Table<T>
}

export const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          {'<'}
        </button>
        <span className="text-sm">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          {'>>'}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">
          Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
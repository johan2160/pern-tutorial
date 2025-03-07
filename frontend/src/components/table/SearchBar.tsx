interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search books..."
        className="w-full max-w-sm p-2 border rounded bg-gray-300 text-black dark:bg-gray-700 dark:text-white focus:outline-none"
      />
    </div>
  )
}
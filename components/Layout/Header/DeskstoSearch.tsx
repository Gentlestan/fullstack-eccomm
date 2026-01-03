interface DesktopSearchProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  themeColors: any;
}

export default function DesktopSearch({ query, setQuery, onSearch, themeColors }: DesktopSearchProps) {
  return (
    <div className="hidden md:block w-64">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
        className={`w-full p-2 rounded-md ${themeColors.border} focus:outline-none focus:ring`}
      />
    </div>
  );
}

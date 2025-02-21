import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (value: string) => void }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      type="text"
      placeholder="搜尋工具..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
    )}
  </div>
);

export default SearchBar;

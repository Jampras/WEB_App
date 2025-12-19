import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="px-5 py-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-amber-600 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="O que vamos beber hoje?"
          className="w-full bg-gray-200 border-2 border-transparent rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold text-gray-900 placeholder-gray-500 focus:ring-0 focus:border-amber-600 focus:bg-white transition-all shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
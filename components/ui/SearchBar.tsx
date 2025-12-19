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
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-action-500 transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="O que vamos beber hoje?"
          className="w-full bg-slate-200/50 border-2 border-transparent rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-action-500 focus:bg-white transition-all shadow-sm outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
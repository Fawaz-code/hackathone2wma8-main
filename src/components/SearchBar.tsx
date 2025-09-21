import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'all' | 'posts' | 'profiles') => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search posts, profiles, or tags..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'posts' | 'profiles'>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('', 'all');
    setIsExpanded(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className={`relative transition-all duration-300 ${isExpanded ? 'shadow-lg' : 'shadow'}`}>
        <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-3 text-sm border-none outline-none focus:ring-0"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {isExpanded && (
            <div className="border-l border-gray-200 px-2">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'all' | 'posts' | 'profiles')}
                className="text-xs bg-transparent border-none outline-none focus:ring-0 text-gray-600"
              >
                <option value="all">All</option>
                <option value="posts">Posts</option>
                <option value="profiles">Profiles</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {isExpanded && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-2">
            <button
              onClick={handleSearch}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center space-x-2"
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span>Search for "{query}"</span>
            </button>
            {query.startsWith('#') && (
              <button
                onClick={() => onSearch(query.slice(1), 'posts')}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center space-x-2"
              >
                <span className="text-blue-500">#</span>
                <span>Tag: {query.slice(1)}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
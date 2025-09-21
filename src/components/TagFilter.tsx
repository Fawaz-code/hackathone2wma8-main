import React from 'react';
import { Hash, X } from 'lucide-react';

interface TagFilterProps {
  selectedTags: string[];
  availableTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export default function TagFilter({ 
  selectedTags, 
  availableTags, 
  onTagSelect, 
  onTagRemove, 
  onClearAll 
}: TagFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center">
          <Hash className="h-4 w-4 mr-1" />
          Filter by Tags
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-gray-100">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200"
            >
              #{tag}
              <button
                onClick={() => onTagRemove(tag)}
                className="ml-1 hover:text-blue-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Available Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags
          .filter(tag => !selectedTags.includes(tag))
          .slice(0, 20) // Limit visible tags
          .map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-colors"
            >
              #{tag}
            </button>
          ))}
      </div>
      
      {availableTags.filter(tag => !selectedTags.includes(tag)).length > 20 && (
        <p className="text-xs text-gray-500 mt-2">
          +{availableTags.filter(tag => !selectedTags.includes(tag)).length - 20} more tags available
        </p>
      )}
    </div>
  );
}
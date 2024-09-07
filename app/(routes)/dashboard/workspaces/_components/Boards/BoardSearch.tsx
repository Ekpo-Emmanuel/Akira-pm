'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WorkspaceSearchProps {
  onSearch: (query: string) => void;
}

export default function BoardSearch({ onSearch }: WorkspaceSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isActive = isFocused || inputValue.length > 0;

  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue]);

  const handleClearSearch = (e: React.FormEvent) => {
    e.preventDefault(); 
    setInputValue('');
    onSearch(''); 
  };

  return (
    <form
      className="flex items-center w-full max-w-md"
      onSubmit={handleClearSearch} 
    >
      <label htmlFor="workspace-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <svg
          className={`w-3 h-3 absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            isActive ? 'text-blue-500' : 'text-gray-400'
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="text"
          id="workspace-search"
          className="bg-inherit border border-gray-200 dark:border-borderDark text-gray-900 rounded-md block w-full px-2.5 h-10 pl-8 pr-8 dark:bg-[#2A2E35] dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-sm "
          placeholder="Search for a board"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          maxLength={40}
        />
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-bgLight hover:dark:bg-gray-600 dark:hover:bg-[#2A2E35] rounded transition-colors duration-200 p-1"
        >
          <X size={16} className={isActive ? 'text-blue-500' : ''} />
        </button>
      </div>
    </form>
  );
}

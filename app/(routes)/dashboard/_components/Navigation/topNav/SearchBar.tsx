import React from 'react'

export default function SearchBar() {
  return (
    <form className="flex items-center mx-auto">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-red-500 focus:ring-red-500 block w-full px-2.5 h-8 pr-10 dark:bg-workspaceDark dark:border-none dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
            placeholder="Search"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3"
        >
          <svg
            className="w-3 h-3"
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
        </button>
      </div>
    </form>
  )
}
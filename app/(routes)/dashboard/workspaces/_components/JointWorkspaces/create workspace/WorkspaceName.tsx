import React, { useState } from "react";
import { X } from 'lucide-react';

interface WorkspaceNameProps {
  onInputChange: (inputValue: string) => void;
}

export default function WorkspaceName({ onInputChange }: WorkspaceNameProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isActive = isFocused || inputValue.length > 0;

  const handleClearSearch = () => {
    setInputValue("");
    onInputChange(""); // Notify parent component that input was cleared
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value); // Notify parent component of the new input value
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        id="voice-search"
        className={`bg-gray-50 border ${!isActive && inputValue === "" ? "border-red-500" : "border-gray-300"} dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs`}
        placeholder="eg. Marketing, Finance, Sales, etc."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange} // Updated to use handleInputChange
        value={inputValue}
      />
      <button
        type="button"
        onClick={handleClearSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-gray-600 dark:hover:bg-[#2A2E35] rounded transition-colors duration-200 p-1"
      >
        <X size={16} className={isActive ? "text-blue-500" : ""} />
      </button>
    </div>
  );
}

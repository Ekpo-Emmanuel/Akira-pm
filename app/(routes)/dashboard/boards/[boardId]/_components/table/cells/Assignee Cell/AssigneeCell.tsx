import React, { useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Plus, X, User } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AssigneeCell({ getValue }: CellContext<any, unknown>) {
  const assignees = getValue() as string[];
  const availableUsers = ["John", "Jane", "Doe", "Alice", "Bob", "Charlie"]; // List of available users

  // State to hold selected users (tags)
  const [selectedUsers, setSelectedUsers] = useState<string[]>(assignees);
  const [filteredUsers, setFilteredUsers] = useState(availableUsers);

  // Function to get the initials of the user's name
  const getFirstLetter = (word: string) => {
    return word.charAt(0);
  };

  // Handle search input and filter users accordingly
  const handleSearch = (value: string) => {
    setFilteredUsers(availableUsers.filter(user => user.toLowerCase().includes(value.toLowerCase())));
  };

  // Add user to selected list (tags)
  const addUser = (user: string) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Remove user from selected list (tags)
  const removeUser = (user: string) => {
    setSelectedUsers(selectedUsers.filter(selected => selected !== user));
  };

  return (
    <section className="h-full">
      <Popover>
        <PopoverTrigger className="w-full h-full">
          <div className="h-full w-full relative flex items-center justify-center group cursor-pointer hover:bg-gray-100  dark:hover:bg-borderDark dark:hover:bg-opacity-35">
            <div className="flex -space-x-1">
              {selectedUsers.length === 0 ? (
                <div className="bg-gray-100 opacity-50 flex items-center justify-center h-6 w-6 shrink-0 overflow-hidden rounded-full">
                  <User size={16} strokeWidth={1.5} /> 
                </div>
              ) : (
                <>
                  {selectedUsers.slice(0, 2).map((user, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 text-white border-[1px] border-borderDark dark:border-workspaceDark flex items-center justify-center h-6 w-6 shrink-0 overflow-hidden rounded-full"
                    >
                      <p className="text-[10px] uppercase">
                        {getFirstLetter(user)}
                      </p>
                    </div>
                  ))}

                  {/* Show the "+number" if there are more than two selected users */}
                  {selectedUsers.length > 2 && (
                    <div className="bg-gray-200 flex items-center justify-center h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      <p className="text-[10px]">
                        +{selectedUsers.length - 2}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Plus icon, hidden by default and shown on hover */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
              <Plus size={14} />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent>
          <div className="space-y-3">
            {/* Display selected users as removable tags */}
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user, index) => (
                <div key={index} className="bg-blue-200 dark:bg-bgDark flex items-center space-x-1 rounded-full px-2 py-1 text-[10px]">
                  <span>{user}</span>
                  <button onClick={() => removeUser(user)} className="text-gray-600 hover:text-gray-800">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Search input */}
            <div>
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-inherit border dark:border-borderDark hover:textDark  text-textDark dark:text-textLight text-xs sm:text-sm placeholder:text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2 h-8 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for names, role or team"
              />
            </div>

            {/* Suggested users list */}
            <div className="space-y-3">
              <p className="text-xs opacity-50 cursor-default">Suggested People</p>
              <div className="">
                <ScrollArea className="h-[150px] w-full rounded-md">
                  {filteredUsers.map((user, index) => (
                    <div
                      key={index}
                      onClick={() => addUser(user)}
                      className="flex items-center gap-2 hover:bg-bgLight dark:hover:bg-bgDark p-1 rounded-sm cursor-pointer"
                    >
                      <div
                        className="bg-white dark:bg-blue-600 dark:text-white border-[1px] border-borderDark dark:border-workspaceDark flex items-center justify-center h-6 w-6 shrink-0 overflow-hidden rounded-full"
                      >
                        <span className="text-[10px] uppercase">
                          {getFirstLetter(user)}
                        </span>
                      </div>
                      <span className="text-sm">{user}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}

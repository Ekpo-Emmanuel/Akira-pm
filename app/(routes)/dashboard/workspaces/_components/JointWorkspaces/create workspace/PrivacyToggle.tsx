'use client';
import React, { useState } from 'react';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Plus, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Random users list for selection
const randomUsers = [
  { name: 'AA' },
  { name: 'BB' },
  { name: 'CC' },
  { name: 'DD' },
  { name: 'EE' },
  { name: 'FF' },
  { name: 'GG' },
  { name: 'HH' },
  { name: 'II' },
  { name: 'JJ' },
];

export default function PrivacyToggle() {
    const [open, setOpen] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [users, setUsers] = useState([{ name: 'ME' }]);

    const togglePrivacy = () => {
        setIsPrivate(!isPrivate);
    };

    // Function to add a user to the list
    const addUser = (user: { name: string }) => {
        if (!users.some(u => u.name === user.name)) {
            setUsers([...users, user]);
        }
    };

    // Function to remove a user from the list
    const removeUser = (userToRemove: { name: string }) => {
        setUsers(users.filter(user => user.name !== userToRemove.name));
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="dark:text-[#ADB3BD] text-sm">Make Private</p>
                    <span className="text-xs dark:text-gray-500">
                        Only you and invited members have access
                    </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={isPrivate} 
                        onChange={togglePrivacy} 
                        className="sr-only peer" 
                    />
                    <div 
                        className={`w-[2.3rem] h-5 bg-gray-500 rounded-full peer peer-checked:bg-blue-500
                            after:content-[''] after:absolute after:top-1/2 after:-translate-y-[48%] after:left-[3px] after:bg-white after:border-gray-300 after:border 
                            after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full`}
                    />
                </label>
            </div>
            {isPrivate && (
                <div>
                    <div className="flex justify-between items-center">
                        <div className="dark:text-[#ADB3BD] text-sm">Share only with:</div>
                        <div className="flex items-center gap-2 mt-2">
                            {users && <span className="text-xs">+{users.length - 1}</span>} 
                            {users.map((user, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-7 h-7 text-[10px] flex items-center justify-center text-white bg-purple-600 rounded-full"
                                >
                                    {user.name}
                                    {user.name !== 'ME' && (
                                        <button 
                                            onClick={() => removeUser(user)}
                                            className="absolute -top-2 -right-2 p-1 text-red-500 bg-white rounded-full opacity-0 hover:opacity-100"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}

                            
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <button
                                        aria-expanded={open}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-500 rounded-full"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 dark:bg-[#30353C]">
                                    <Command>
                                        <CommandInput placeholder="Search or select a user..." className="h-9 placeholder:text-xs" />
                                        <CommandList>
                                            <CommandEmpty>No people matched your search</CommandEmpty>
                                            <CommandGroup>
                                                {randomUsers.map((user) => (
                                                    <CommandItem
                                                        key={user.name}
                                                        value={user.name}
                                                        onSelect={() => {
                                                            addUser(user);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {user.name}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                users.some(u => u.name === user.name) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

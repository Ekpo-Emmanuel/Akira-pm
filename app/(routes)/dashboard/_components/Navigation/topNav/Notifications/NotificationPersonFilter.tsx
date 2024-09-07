"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon, Plus, CircleUserRound } from 'lucide-react';

const otherMembers = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Williams" },
  { id: 4, name: "Diana Brown" },
  { id: 5, name: "Eve Thompson" }
];

export default function NotificationPersonFilter() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ id: number, name: string }[]>([]);

  const handleSelect = (user: { id: number, name: string }) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <button
          aria-expanded={open}
          className="w-8 h-8 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-500 rounded-full"
        >
          <Plus size={14} />
        </button> */}
        <button className="flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-borderDark px-2.5 h-8 rounded">
          <CircleUserRound strokeWidth={1} size={20} />
          <span className="text-xs">Filter</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 dark:bg-[#30353C]">
        <Command>
          <CommandInput
            placeholder="Search or select a user..."
            className="h-9 placeholder:text-xs"
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {otherMembers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelect(user)}
                >
                  {user.name}
                  <CheckIcon
                    className={`ml-auto h-4 w-4 ${
                      selectedUsers.some((u) => u.id === user.id)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

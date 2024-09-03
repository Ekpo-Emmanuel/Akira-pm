'use client';
import { useState, useEffect } from 'react';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function WorkspaceFilter() {
  return (
    <div>
      <Select>
        <SelectTrigger className="p-0 h-8 w-fit">
          <SelectValue className="placeholder:text-gray-900" placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#2A2E35] border dark:border-borderDark">
          {sortSelection.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}


const sortSelection = [
  {
    name: 'Recommended',
  },
  {
    name: 'Date created',
  },
  {
    name: 'Date updated',
  },
  {
    name: 'Alphabetical A-Z',
  },
  {
    name: 'Alphabetical Z-A',
  },
]
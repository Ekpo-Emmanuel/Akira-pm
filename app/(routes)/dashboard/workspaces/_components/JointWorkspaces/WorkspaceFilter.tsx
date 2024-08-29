'use client';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  Home,
  Settings,
  FileText,
  PanelsTopLeft,
  ChevronDown,
  Plus,
  Landmark,
} from "lucide-react";
import clsx from "clsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function WorkspaceFilter() {
  return (
    <div>
      <Select>
        <SelectTrigger className="p-0 h-8 w-fit">
          <SelectValue placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#2A2E35] border dark:border-[#656f7d6d]">
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
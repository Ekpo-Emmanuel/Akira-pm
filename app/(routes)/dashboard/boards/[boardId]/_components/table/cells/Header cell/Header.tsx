'use client'

import * as React from 'react';
import { Ellipsis, } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';

export default function Header() {
  return (
    <section className="w-[350px] h-full">
        <div className="relative group">
            <div className="h-full p-[2px] flex items-center">
            <input
                type="text"
                value="Head"
                className="bg-inherit border border-white hover:border-borderDark dark:border-workspaceDark hover:border hover:textDark dark:hover:border-tableHoverBorderDark text-textDark dark:text-textLight text-xs sm:text-sm placeholder:text-xs placeholder:sm:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-3/4 px-2 dark:border-borderDark dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                placeholder="Add item"
            />
            </div>

            {/* Dots (Ellipsis) - initially hidden, show on hover */}
            <div className="cursor-pointer absolute right-2 p-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full flex items-center justify-center rounded-sm hover:bg-bgLight dark:hover:bg-borderDark">
                    <Ellipsis size={14} strokeWidth={1} />
                </div>
            </div>
        </div>
    </section>
  )
}

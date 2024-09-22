'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Pencil, Star, Bell, ChevronDown, UserIcon } from 'lucide-react';
import clsx from 'clsx';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';



interface BoardHeaderTitleProps {
  boardId: string;
}

export default function BoardHeaderTitle(props: BoardHeaderTitleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const board = useQuery(api.boards.getSingleBoard, { boardId: props.boardId as Id<"boards"> });
  const tables = useQuery(api.tables.getTables, { boardId: props.boardId as Id<"boards"> });

  return (
    <div>
      <div className="p-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={clsx(
              'flex items-center gap-2 w-fit px-2 rounded-sm cursor-pointer hover:bg-bgLight dark:hover:bg-borderDark focus:outline-none',
              isOpen && 'bg-bgLight dark:bg-borderDark'
            )}
          >
            <span className="text-2xl font-bold">{board?.name}</span>
            <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {isOpen && (
            <div className="z-50 mt-2 absolute grid gap-4 p-4 md:p-6 w-full sm:w-[400px] border bg-white dark:bg-workspaceDark dark:border-borderDark rounded-md shadow-lg">
              <div className="border-b pb-4 dark:border-borderDark">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{board?.name}</h2>
                  <div className="hover:bg-gray-100 dark:hover:bg-borderDark rounded p-1">
                    <Star strokeWidth={1} size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {(board?.description) ? board.description : 'Add description'}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Owner</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-black w-5 h-5 rounded-full flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-sm">Admin Akira</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Created By</p>
                  <span className="text-sm">on Apr 8, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Notifications</p>
                  <div className="flex items-center gap-2">
                    <Bell size={13} />
                    <span className="text-sm">Everything</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

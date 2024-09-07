'use client';

import React, { useState, useEffect } from 'react';
import { PanelRight, Star, Plus } from 'lucide-react';
import BoardSearch from './BoardSearch';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Board } from "@/app/types";
import { useUser } from '@/app/contexts/user/UserProviderClient';
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from 'sonner';

interface BoardsProps {
  workspaceId: Id<"workspaces">;
}

export default function Boards({ workspaceId }: BoardsProps) {
  const { user } = useUser();
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const createBoard = useMutation(api.boards.createBoard);
  const getBoards = useQuery(api.boards.getBoards, { workspaceId });
  
  useEffect(() => {
    if (workspaceId && getBoards) {
      setBoards(getBoards);
    }
  }, [workspaceId, getBoards]);

  const handleCreateBoard = async () => {
    if (newBoardName.trim() && workspaceId && user) {
      try {
        const newBoard = await createBoard({
          name: newBoardName,
          description: newBoardDescription,
          workspaceId,
          userId: user?.id as Id<"users">,
        });

        setNewBoardName('');
        setNewBoardDescription('');
        toast.success("Board created successfully");
      } catch (error) {
        console.error('Failed to create board:', error);
      }
    }
  };

  const filteredBoards = boards
    .filter(board => board.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .reverse();

  if (!boards) {
    return <div>Loading...</div>
  }
  return (
    <section>
      <div>
        <div className="flex flex-col gap-2 md:flex-row">
          <BoardSearch onSearch={setSearchTerm} />
          {boards.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-6 text-center rounded-md flex items-center justify-center gap-1">
                  <Plus strokeWidth={2} size={15} />
                  New board
                </button>
              </DialogTrigger>
              <form>
                <DialogContent className="dark:bg-workspaceDark border-none rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Create a New Board</DialogTitle>
                  </DialogHeader>
                  <div className="mt-6">
                    <div className="flex flex-col gap-2">
                      <label className="dark:text-gray-300 text-sm">Board Name</label>
                      <input
                        type="text"
                        className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        maxLength={30}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <label className="dark:text-gray-300 text-sm">Description (optional)</label>
                      <input
                        type="text"
                        className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                        value={newBoardDescription}
                        onChange={(e) => setNewBoardDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button onClick={handleCreateBoard} className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-3 text-center rounded-md flex items-center justify-center gap-1">
                      <Plus size={16} />
                      New board
                    </button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          )}
        </div>

        {/* Logic for when no boards exist */}
        {boards.length === 0 && (
          <div className="mt-4 flex flex-col gap-2 items-center justify-center h-full w-full border dark:border-borderDark rounded-md py-10 md:py-20">
            <h1 className="text-5xl">🪐</h1>
            <p className="text-sm">You don't have any boards</p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-3 text-center rounded-md flex items-center justify-center gap-1">
                  <Plus strokeWidth={2} size={15} />
                  Create your first board
                </button>
              </DialogTrigger>
              <form>
                <DialogContent className="dark:bg-workspaceDark border-none rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Create a New Board</DialogTitle>
                  </DialogHeader>
                  <div className="mt-6">
                    <div className="flex flex-col gap-2">
                      <label className="dark:text-gray-300 text-sm">Board Name</label>
                      <input
                        type="text"
                        className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        maxLength={30}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                      <label className="dark:text-gray-300 text-sm">Description (optional)</label>
                      <input
                        type="text"
                        className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                        value={newBoardDescription}
                        onChange={(e) => setNewBoardDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button onClick={handleCreateBoard} className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-3 text-center rounded-md flex items-center justify-center gap-1">
                      <Plus size={16} />
                      New board
                    </button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        )}

        {/* Logic for when search results are empty */}
        {boards.length > 0 && filteredBoards.length === 0 && (
          <div className="mt-3 flex flex-col gap-2 items-center justify-center h-full w-full border dark:border-borderDark rounded-md py-10 md:py-20">
            <h1 className="text-5xl">🪐</h1>
            <p className="text-sm"><b>"{searchTerm}"</b> not found</p>
          </div>
        )}

        {/* Render filtered boards */}
        {filteredBoards.length > 0 && (
          <ScrollArea className="mt-4 grid h-[300px]">
            {filteredBoards.map((board) => (
              <div key={board._id} className="w-full flex items-center justify-between border-b dark:border-borderDark px-2 py-3 hover:bg-gray-50 dark:hover:bg-borderDark hover:rounded-md cursor-pointer">
                <div className="flex items-center space-x-2">
                  <PanelRight strokeWidth={1.5} size={20} />
                  <span className="text-sm">{board.name}</span>
                </div>
                <div className="hover:bg-gray-100 dark:hover:bg-borderDark rounded p-1">
                  <Star strokeWidth={1} size={20} />
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </section>
  );
}

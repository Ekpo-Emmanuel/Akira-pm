import React from 'react'
import { Plus } from 'lucide-react';
import WorkspaceFilter from './WorkspaceFilter';
import WorkspaceSearch from './WorkspaceSearch';


export default function JointWorkspaces() {
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-between ">
        <h2 className="text-lg font-medium dark:text-white">All Workspaces</h2>
        <button className="bg-blue-500 hover:bg-blue-400 text-white py-1.5 px-2 h-8 rounded-md flex items-center gap-1 text-sm">
            <Plus size={16} />
            New Space
        </button>
      </div>
      <div className="flex flex-col md:flex-row-reverse md:justify-between gap-1">
        <WorkspaceSearch />
        <WorkspaceFilter />
      </div>
      <div className="cursor-default rounded-md md:py-20 flex flex-col items-center justify-center">
        <div className="text-5xl">🪐</div>
        <p className="text-[10px] mt-2">All workspaces Joined</p>
      </div>
    </div>
  )
}

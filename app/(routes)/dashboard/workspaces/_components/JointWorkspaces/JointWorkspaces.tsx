'use client';
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import WorkspaceFilter from './WorkspaceFilter';
import WorkspaceSearch from './WorkspaceSearch';
import IconColor from './create workspace/IconColor';
import WorkspaceName from './create workspace/WorkspaceName';
import PrivacyToggle from './create workspace/PrivacyToggle';
import { useOrganization } from '@/app/contexts/OrganizationContext';

interface WorkspaceSearchProps {
  handleCreateWorkspace: () => void;
}

export default function JointWorkspaces(props: WorkspaceSearchProps) {
  const { 
    currentOrganization, 
    setCurrentOrganization, 
    userOrganizations, 
    setUserOrganizations,
    currentUsers,
    setCurrentUsers
  }: any = useOrganization();

  console.log(currentUsers);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState("");

  const handleColorChange = (color: string) => {
      setSelectedColor(color);
      console.log('Selected color:', color);
  };

  const handleInputChange = (inputValue: string) => {
    setWorkspaceName(inputValue);
    console.log('Workspace name:', inputValue);
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-between relative">
        <h2 className="text-lg font-medium dark:text-white">All Workspaces</h2>
        <div className='absolute right-0'>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-blue-500 hover:bg-blue-400 text-white py-1.5 px-3 h-6 sm:h-8 rounded-md flex items-center gap-1 text-xs">
                  <Plus size={14} />
                  New Space
              </button>
            </DialogTrigger>
            <form>
              <DialogContent className="dark:bg-[#30353C] border-none rounded-lg">
                  <div>
                    <div>
                      <h1 className="text-xl font-medium">Create a Workspace</h1>
                      <p className="text-xs leading-5 dark:text-gray-500">
                        A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="flex flex-col gap-2">
                        <label className="dark:text-gray-400 text-sm">Icon & Name</label>
                        <div className=" flex items-center gap-2" >
                          <IconColor onColorChange={handleColorChange} />
                          <WorkspaceName onInputChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        <label className="dark:text-gray-400 text-sm">Description (optional)</label>
                        <input
                          type="text"
                          id="voice-search"
                          className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit  dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                        />
                      </div>
                      <div className="mt-3">
                        <PrivacyToggle />
                      </div>
                    </div>
                  </div>
                <DialogFooter>
                  <button className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-3 text-center rounded-md flex items-center justify-center gap-1 ">
                    <Plus size={16} />
                    New Space
                  </button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
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

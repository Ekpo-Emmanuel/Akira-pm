'use client';
import React, { useState } from 'react';
import { Plus, X, Pencil } from 'lucide-react';
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
  workspaces: any[];
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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState("");

  const [editingWorkspaceIndex, setEditingWorkspaceIndex] = useState<number | null>(null);
  const [workspaceDescriptions, setWorkspaceDescriptions] = useState<string[]>(props.workspaces.map(() => "Add a description"));

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    console.log('Selected color:', color);
  };

  const handleInputChange = (inputValue: string) => {
    setWorkspaceName(inputValue);
    console.log('Workspace name:', inputValue);
  };

  const handleEditDescription = (index: number) => {
    setEditingWorkspaceIndex(index);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...workspaceDescriptions];
    newDescriptions[index] = value;
    setWorkspaceDescriptions(newDescriptions);
  };

  const handleDescriptionBlur = () => {
    setEditingWorkspaceIndex(null);
  };

  const truncateDescription = (description: string) => {
    return description.length > 40 ? description.slice(0, 40) + "..." : description;
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
      <div className="flex flex-col md:flex-row md:justify-between gap-1">
        <WorkspaceSearch />
        <WorkspaceFilter />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        {props.workspaces.map((workspace, index) => (
          <div key={index} className="border dark:border-borderDark rounded-lg p-3 grid gap-5">
            <div className="flex items-center justify-between">
              <div
                className="h-[36px] w-[36px] text-md text-white rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: workspace?.color,
                }}
              >
                {workspace?.name[0].toUpperCase()}
              </div>
              <div className="flex items-center justify-center rounded-md hover:bg-borderDark h-[36px] w-[36px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </div>
            </div>
            <div>
              <p className="text-md font-medium">{workspace?.name}</p>
              <div className="flex items-center mt-3">
                {editingWorkspaceIndex === index ? (
                  <input
                    type="text"
                    className="bg-inherit border border-gray-300 dark:border-borderDark text-gray-900 text-sm rounded-md block w-full px-2.5 h-8 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-borderDark focus:border-none placeholder:text-xs"
                    value={workspaceDescriptions[index]}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    onBlur={handleDescriptionBlur}
                    autoFocus
                  />
                ) : (
                  <>
                    <p className="text-xs text-gray-500">{truncateDescription(workspaceDescriptions[index])}</p>
                    <button
                      className="flex items-center justify-center rounded-md hover:bg-borderDark h-[26px] w-[26px] cursor-pointer"
                      onClick={() => handleEditDescription(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
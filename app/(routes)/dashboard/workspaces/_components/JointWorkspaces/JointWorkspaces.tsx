'use client';
<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
import { Plus, X, Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WorkspaceFilter from './WorkspaceFilter';
import WorkspaceSearch from './WorkspaceSearch';
import IconColor from './create workspace/IconColor';
import WorkspaceName from './create workspace/WorkspaceName';
import PrivacyToggle from './create workspace/PrivacyToggle';
import { useOrganization } from '@/app/contexts/organization/OrganizationContext';
import { useWorkspace } from '@/app/contexts/workspace/WorkspaceContext'; 
import { Id } from '@/convex/_generated/dataModel';
import { Workspace } from '@/app/types';
import Link from 'next/link';

interface WorkspaceSearchProps {
<<<<<<< HEAD
  handleCreateWorkspace: (
    workspaceName: string,
    workspaceColor: string,
    organizationId: Id<"organizations"> | undefined,
    createdBy: string,
    visiblity: string,
    members: string[],
    workspaceDescription?: string,
  ) => Promise<void>;
  handleDeleteWorkspace: (workspaceId: Id<"workspaces">) => Promise<void>;
  currentUserId: string;
}

export default function JointWorkspaces(props: WorkspaceSearchProps) {
  const { userWorkspaces, setUserWorkspaces } = useWorkspace(); 
  const { currentOrganization, userOrganizations }: any = useOrganization();

  const [workspaceColor, setWorkspaceColor] = useState<string | null>(null);
=======
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
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
  const [workspaceName, setWorkspaceName] = useState("");
  const [editingWorkspaceIndex, setEditingWorkspaceIndex] = useState<number | null>(null);
  const [workspaceDescription, setWorkspaceDescription] = useState<string[]>(userWorkspaces.map(() => "Add a description"));
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [selectedMembers, setSelectedMembers] = useState<{ name: string; id: string }[]>([]);

  const [filteredWorkspaces, setFilteredWorkspaces] = useState(userWorkspaces);

  useEffect(() => {
    setFilteredWorkspaces(userWorkspaces);
  }, [userWorkspaces]);

  const handleColorChange = (color: string) => { setWorkspaceColor(color); };
  const handleInputChange = (inputValue: string) => { setWorkspaceName(inputValue); };
  const handleEditDescription = (index: number) => { setEditingWorkspaceIndex(index); };
  const handleVisibilityChange = (newVisibility: 'public' | 'private') => { setVisibility(newVisibility); };
  const handleDescriptionBlur = () => { setEditingWorkspaceIndex(null); };
  const handleMembersChange = (members: { name: string; id: string }[]) => { setSelectedMembers(members); };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...workspaceDescription];
    newDescriptions[index] = value;
    setWorkspaceDescription(newDescriptions);
  };

<<<<<<< HEAD
  const truncateDescription = (description: string | undefined) => {
    if (!description) return ''; 
    return description.length > 40 ? description.slice(0, 40) + "..." : description;
=======
  const [editingWorkspaceIndex, setEditingWorkspaceIndex] = useState<number | null>(null);
  const [workspaceDescriptions, setWorkspaceDescriptions] = useState<string[]>(props.workspaces.map(() => "Add a description"));

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    console.log('Selected color:', color);
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
  };

  const handleSearch = (searchTerm: string) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = userWorkspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredWorkspaces(filtered.length > 0 ? filtered : []);
  };

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) {
      console.error('User is not part of any organization');
      return;
    }
    try {
      const organizationId = currentOrganization?.id as Id<"organizations"> | undefined;

      const finalWorkspaceColor = workspaceColor || '#6366F1';

      if (!workspaceName || !finalWorkspaceColor || !organizationId) {
        console.error('Missing required fields');
        console.log(workspaceName, finalWorkspaceColor, organizationId);
        return;
      }

      await props.handleCreateWorkspace(
        workspaceName,
        finalWorkspaceColor,
        organizationId,
        props.currentUserId,
        visibility,
        visibility === 'private' ? selectedMembers.map(member => member.id) : [],
        workspaceDescription[0] || ''
      );

      // setWorkspaceName('');
      // setWorkspaceColor('#6366F1');
      // setVisibility('public');
      // setWorkspaceDescription(userWorkspaces.map(() => ""));
      // setSelectedMembers([]);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  const handleDeleteWorkspace = async (workspaceId: Id<"workspaces">) => {
    try {
      await props.handleDeleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Failed to delete workspace:', error);
    }
  }

=======
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
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
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
<<<<<<< HEAD
                <DialogHeader>
                  <DialogTitle>Create a Workspace</DialogTitle>
                  <DialogDescription>
                    A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6">
                  <div className="flex flex-col gap-2">
                    <label className="dark:text-gray-400 text-sm">Icon & Name</label>
                    <div className="flex items-center gap-2">
                      <IconColor onColorChange={handleColorChange} />
                      <WorkspaceName onInputChange={handleInputChange} />
=======
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
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
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
<<<<<<< HEAD
                  <div className="flex flex-col gap-2 mt-3">
                    <label className="dark:text-gray-400 text-sm">Description (optional)</label>
                    <input
                      type="text"
                      className="border border-gray-300 dark:border-[#656f7d6d] text-gray-900 rounded-md block w-full px-2.5 h-10 pr-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none placeholder:text-xs"
                      value={workspaceDescription[0]}
                      onChange={(e) => handleDescriptionChange(0, e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <PrivacyToggle 
                      organizationId={currentOrganization?.id} 
                      currentUserId={props.currentUserId} 
                      visibility={visibility} 
                      onVisibilityChange={handleVisibilityChange} 
                      onMembersChange={handleMembersChange}
                    />
                  </div>
=======
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0
                </div>
                <DialogFooter>
                  <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-400 text-sm text-white py-1.5 px-3 text-center rounded-md flex items-center justify-center gap-1">
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
<<<<<<< HEAD
        <WorkspaceSearch onSearch={handleSearch} />
        <WorkspaceFilter />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        {filteredWorkspaces.length > 0 ? 
          filteredWorkspaces.map((workspace, index) => (
            <Link href={`/dashboard/workspaces/${workspace._id}`} key={index}>
              <div className="border dark:border-borderDark dark:hover:bg-borderDark rounded-lg p-3 grid gap-5">
                <div className="flex items-center justify-between">
                  <div
                    className="h-[36px] w-[36px] text-md text-white rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: workspace?.color }}
                  >
                    {workspace?.name[0].toUpperCase()}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center justify-center rounded-md hover:bg-borderDark h-[36px] w-[36px] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] bg-white dark:bg-workspaceDark  dark:border-borderDark">
                      <DropdownMenuCheckboxItem>
                        <div className="flex items-center gap-2">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clip-rule="evenodd"></path></svg>
                          <span>Rename</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        <div className="flex items-center gap-2">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z" fill="currentColor" fillRule="evenodd" clip-rule="evenodd"></path></svg>
                          <span>Copy Link</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="text-red-300" onClick={() => handleDeleteWorkspace(workspace._id)}>
                        <div className="flex items-center gap-3">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clip-rule="evenodd"></path></svg>
                          <span>Delete</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <p className="text-md font-medium">{workspace?.name}</p>
                  <div className="flex items-center mt-3">
                    {editingWorkspaceIndex === index ? (
                      <input
                        type="text"
                        className="bg-inherit border border-gray-300 dark:border-borderDark text-gray-900 text-sm rounded-md block w-full px-2.5 h-8 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-borderDark focus:border-none placeholder:text-xs"
                        value={workspaceDescription[index] || ''}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        onBlur={handleDescriptionBlur}
                        autoFocus
                      />
                    ) : (
                      <>
                        <p className="text-xs text-gray-500">{truncateDescription(workspaceDescription[index])}</p>
                        <button
                          className="flex items-center justify-center rounded-md hover:bg-borderDark h-[26px] w-[26px] cursor-pointer"
                          onClick={() => handleEditDescription(index)}
                        >
                          <Pencil size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )) :
          <div className="col-span-2 flex flex-col gap-2  items-center justify-center h-full w-full bg-borderDark rounded-md py-10 md:py-20">
            <h1 className="text-5xl">🪐</h1>
            <p className="text-xs"> No Spaces found </p>
          </div>
        }
      </div>
    </div>
  );
}
=======
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
>>>>>>> 4de37992bf1f0391ba75f6d1b0488ac058542bb0

'use client';
import React, { useState, useEffect } from 'react';
import { CheckIcon, Plus, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetOrganizationMembers } from '@/app/(routes)/dashboard/_utils/organizationUtils';
import { Id } from "@/convex/_generated/dataModel";
import { cn } from '@/lib/utils';

interface PrivacyToggleProps {
    organizationId: Id<"organizations"> | undefined;
    currentUserId: string;
    visibility: 'public' | 'private';
    onVisibilityChange: (newVisibility: 'public' | 'private') => void;
    onMembersChange: (members: { name: string; id: string }[]) => void;
}

export default function PrivacyToggle({ 
    organizationId, 
    currentUserId, 
    visibility,
    onVisibilityChange,
    onMembersChange 
}: PrivacyToggleProps) {
    const [open, setOpen] = useState(false);
    const [isPrivate, setIsPrivate] = useState(visibility === 'private');
    const [selectedUsers, setSelectedUsers] = useState<{ name: string; id: string }[]>([]);
    const members = organizationId ? useGetOrganizationMembers(organizationId) : undefined;

    useEffect(() => {
        setIsPrivate(visibility === 'private');
      }, [visibility]);

    const togglePrivacy = () => {
        const newVisibility = isPrivate ? 'public' : 'private';
        setIsPrivate(!isPrivate);
        onVisibilityChange(newVisibility);
    };

    const addUser = (user: { name: string; id: string }) => {
        if (!selectedUsers.some(u => u.id === user.id)) {
            const newSelectedUsers = [...selectedUsers, user];
            setSelectedUsers(newSelectedUsers);
            onMembersChange(newSelectedUsers); 
        }
    };

    const removeUser = (userToRemove: { id: string }) => {
        const newSelectedUsers = selectedUsers.filter(user => user.id !== userToRemove.id);
        setSelectedUsers(newSelectedUsers);
        onMembersChange(newSelectedUsers); 
    };

    const otherMembers = members?.filter(member => member.id !== currentUserId) || [];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="dark:text-[#ADB3BD] text-sm">{isPrivate ? 'Private' : 'Public'}</p>
                    <span className="text-xs dark:text-gray-500">
                        {isPrivate ? 'Only invited members have access' : 'All members have access'}
                    </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={isPrivate} 
                        onChange={togglePrivacy} 
                        className="sr-only peer" 
                    />
                    <div 
                        className={`w-[2.3rem] h-5 bg-gray-500 rounded-full peer peer-checked:bg-blue-500
                            after:content-[''] after:absolute after:top-1/2 after:-translate-y-[48%] after:left-[3px] after:bg-white after:border-gray-300 after:border 
                            after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full`}
                    />
                </label>
            </div>

            {isPrivate && (
                <div>
                    <div className="flex justify-between items-center">
                        <div className="dark:text-[#ADB3BD] text-sm">Share only with:</div>
                        <div className="flex items-center gap-2 mt-2">
                            {selectedUsers.length > 0 && <span className="text-xs">+{selectedUsers.length}</span>} 
                            {selectedUsers.map((user, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-7 h-7 text-[10px] flex items-center justify-center text-white bg-purple-600 rounded-full"
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                    <button 
                                        onClick={() => removeUser(user)}
                                        className="absolute -top-2 -right-2 p-1 text-red-500 bg-white rounded-full opacity-0 hover:opacity-100"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <button
                                        aria-expanded={open}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-500 rounded-full"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 dark:bg-[#30353C]">
                                    <Command>
                                        <CommandInput placeholder="Search or select a user..." className="h-9 placeholder:text-xs" />
                                        <CommandList>
                                            <CommandEmpty>No people matched your search</CommandEmpty>
                                            <CommandGroup>
                                                {otherMembers.map((user) => (
                                                    <CommandItem
                                                        key={user.id}
                                                        value={user.name!}
                                                        onSelect={() => {
                                                            addUser({ name: user.name! as string, id: user.id }); 
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {user.name}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                selectedUsers.some(u => u.id === user.id) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
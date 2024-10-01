'use client'
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Home, Settings, FileText, PanelsTopLeft, ChevronDown, Plus, Landmark } from 'lucide-react';
import Link from "next/link";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useUser } from '@/app/contexts/user/UserProviderClient';

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface SideNavProps{
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav() {
    const { user }: any = useUser();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)


    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    
    const shortenName = (name: string, length: number) => {
        if(name.length > length) {
            return name.substring(0, length) + '...';
        }
    }
    return (
        <>
            <div className={clsx(
                "fixed top-0 left-2 text-3xl font-bold z-50",
            )}>
                <button
                    className="mt-3"
                    onClick={toggleSidebar}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div
                className={clsx(
                    "h-screen flex flex-col transition-width duration-300 bg-bgLight dark:bg-bgDark",
                    isCollapsed ? 'hidden' : 'w-[75%] sm:w-[300px]',
                    "fixed z-50 md:relative"
                )}
            >
                <div className="flex items-center justify-between px-2 w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className={clsx(
                                "relative flex items-center space-x-2 p-1 dark:hover:bg-[#2A2E35] focus:bg-[#2A2E35] rounded-md cursor-pointer",
                                isCollapsed && "justify-center"
                            )}>
                                <div className={clsx(
                                    "bg-green-900 h-[36px] w-[36px] text-sm text-white rounded-lg flex items-center justify-center",
                                    isCollapsed && "p-2"
                                )}>
                                    {String(user?.given_name[0]).toUpperCase()}
                                </div>
                                {isCollapsed && 
                                    <div className="absolute right-0 border rounded-sm bottom-0 bg-white dark:bg-[#2A2E35] p-[1px] dark:border-[#656f7d6d]">
                                        <ChevronDown size={12} />
                                    </div>
                                }                           
                                {!isCollapsed && 
                                    <div className='flex gap-1 items-center'>
                                        <span className="text-sm">
                                            {shortenName(user?.given_name + ' ' + user?.family_name + "'s Workspace", 20)}
                                        </span>
                                        <ChevronDown size={12} />
                                    </div>
                                }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[250px] bg-white dark:bg-[#2A2E35]  dark:border-[#656f7d6d]">
                            <DropdownMenuLabel>
                                <div className={clsx(
                                    "relative flex items-center space-x-2 dark:hover:bg-workspaceDark focus:bg-[#2A2E35] rounded-md cursor-pointer",
                                    isCollapsed && "justify-center"
                                )}>
                                    <div className={clsx(
                                        "bg-green-900 h-[36px] w-[36px] text-sm text-white rounded-lg flex items-center justify-center",
                                        isCollapsed && "p-2"
                                    )}>
                                        E
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <span className="text-sm">Emmanuel Ekpo's Wo...</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="dark:bg-[#656f7d6d]" />
                            <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                                className="hover:bg-[#656f7d6d]"
                            >
                                Status Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                            >
                            Activity Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                            >
                            Panel
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator className="dark:bg-borderDark" />
                            <DropdownMenuCheckboxItem
                                checked={showPanel}
                                onCheckedChange={setShowPanel}
                            >
                                <div className="flex gap-2 items-center">
                                    <Plus size={16} strokeWidth={1} />
                                    New workspace
                                </div>
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <nav className={clsx(
                    "flex flex-col px-2 pb-4 text-sm border-b dark:border-[#656f7d6d]",
                    isCollapsed && 'px-[4px]',
                )}>
                    {sideBarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={clsx(
                                "flex items-center space-x-2 p-2 font-light rounded-md hover:bg-[#eaeaf097] transition-colors ",
                                "dark:hover:bg-[#2A2E35]",
                                isCollapsed && 'flex flex-col items-center justify-center gap-2 text-center' 
                            )}
                        >
                            <item.icon 
                                strokeWidth={1}
                                className={clsx(
                                    "opacity-70 h-4",
                                    isCollapsed && 'h-5 sm:h-8'
                                )} 
                            />
                            {/* <span>{item.name}</span> */}
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    ))}

                </nav>
                <LogoutLink>
                    Logout
                </LogoutLink>
            </div>
        </>
    );
}

const sideBarItems = [
    {
        name: "Home",
        icon: Home,
        link: '#',
    },
    {
        name: "Inbox",
        icon: Home,
        link: '#',
    },
    {
        name: "Docs",
        icon: Home,
        link: '#',
    },
    {
        name: "Dashboard",
        icon: Home,
        link: '/dashboard',
    },
    {
        name: "Workspaces",
        icon: Home,
        link: '/dashboard/workspaces',
    },
    {
        name: "Organizations",
        icon: Landmark,
        link: '/dashboard/organization',
    },
]
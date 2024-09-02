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
import { useUser } from "@/app/contexts/UserProvider";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function SideNav() {
    const { user }: any = useUser();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)');
        
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
          setIsSmallScreen(e.matches);
          setIsCollapsed(e.matches);
        };
      
        setIsSmallScreen(mediaQuery.matches);
        setIsCollapsed(mediaQuery.matches);
      
        mediaQuery.addListener(handleMediaQueryChange);
      
        return () => {
          mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const toggleSidebar = () => {
        if (!isSmallScreen) {
          setIsCollapsed(!isCollapsed);
        }
    };
    
    const shortenName = (name: string, length: number) => {
        if(name.length > length) {
            return name.substring(0, length) + '...';
        }
    }
    return (
      <div
        className={clsx(
            "h-screen flex flex-col transition-width duration-300",
            isCollapsed ? 'w-[65px]' : 'w-[300px]'
        )}
      >
        <div className="flex items-center justify-between px-2">
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
            {!isSmallScreen && !isCollapsed && (
                <button
                    className="text-gray-400 hover:text-white"
                    onClick={toggleSidebar}
                >
                    <PanelsTopLeft size={20} strokeWidth={1} />
                </button>
            )}
        </div>
        <nav className={clsx(
            "flex flex-col px-2 pb-4 text-sm border-b dark:border-[#656f7d6d]",
            isCollapsed && 'px-[4px]'
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
            {!isSmallScreen && (
                <button
                className="text-gray-400 hover:text-white"
                onClick={toggleSidebar}
                >
                <PanelsTopLeft size={20} strokeWidth={1} />
                </button>
            )}
        <LogoutLink>
            Logout
        </LogoutLink>
      </div>
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
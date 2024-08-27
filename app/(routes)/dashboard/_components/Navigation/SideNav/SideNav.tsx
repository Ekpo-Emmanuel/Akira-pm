'use client'
import { useState } from 'react';
import clsx from 'clsx';
import { Home, Settings, FileText, PanelsTopLeft, ChevronDown, Plus, Landmark } from 'lucide-react';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
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

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function SideNav() {
    const { user }: any = useUser();
    const [isCollapsed, setIsCollapsed] = useState(false);
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
                <DropdownMenuContent className="w-[250px] bg-white dark:bg-workspaceDark  dark:border-borderDark">
                    <DropdownMenuLabel>
                        <div className={clsx(
                            "relative flex items-center space-x-2 dark:hover:bg-[#2A2E35] focus:bg-[#2A2E35] rounded-md cursor-pointer",
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
                    <DropdownMenuSeparator className="dark:bg-borderDark" />
                    <DropdownMenuCheckboxItem
                        checked={showStatusBar}
                        onCheckedChange={setShowStatusBar}
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
            {!isCollapsed && 
                <button
                    className="text-gray-400 hover:text-white"
                    onClick={toggleSidebar}
                >
                    <PanelsTopLeft size={20} strokeWidth={1} />
                </button>
            }
        </div>
        <nav className={clsx(
            "flex flex-col px-2 pb-4 text-sm border-b dark:border-[#656f7d6d]",
            isCollapsed && 'px-[4px]'
        )}>
            {sideBarItems.map((item) => (
                <a
                    href="#"
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
                </a>
            ))}

        </nav>
                <button
                    className="text-gray-400 hover:text-white"
                    onClick={toggleSidebar}
                >
                    <PanelsTopLeft size={20} strokeWidth={1} />
                </button>
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
        link: '/',
    },
    {
        name: "Docs",
        icon: Home,
        link: '/',
    },
    {
        name: "Dashboards",
        icon: Home,
        link: '/',
    },
    {
        name: "Timesheets",
        icon: Home,
        link: '/',
    },
    {
        name: "Organizations",
        icon: Landmark,
        link: '/organizations',
    },
]
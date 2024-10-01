"use client"
 
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Search, Bell, UserPlus } from 'lucide-react';
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';
import { NotificationContainer } from "./Notifications/NotificationContainer";


const TopNav = () => {
  const { setTheme } = useTheme()
  return (
    <header className="px-3 h-12 flex items-center justify-between fixed top-0 w-full z-10 bg-bgLight dark:bg-bgDark">
      <div className="text-md font-semibold hidden md:block">
        <div>
        
        </div>
        <span className="pl-6">Akira PM</span>
      </div>

      <div className="relative w-full max-w-sm md:ml-6">
        <SearchBar />
      </div>

      <div className="flex space-x-6 items-center">
        <button className="dark:text-gray-200 dark:hover:text-white">
          <NotificationContainer />
        </button>
        <button className="dark:text-gray-200 dark:hover:text-white">
          <UserPlus className="w-4 h-8" />
        </button>
        <div className="flex gap-2 ">
          <button onClick={() => setTheme("light")} className="bg-black text-white p-3">Light</button>
          <button onClick={() => setTheme("dark")} className="bg-black text-white p-3">Dark</button>
        </div>
        {/* <ProfileIcon
          showStatusBar={showStatusBar}
          showActivityBar={showActivityBar}
          showPanel={showPanel}
        /> */}
      </div>
    </header>
  );
};

export default TopNav;

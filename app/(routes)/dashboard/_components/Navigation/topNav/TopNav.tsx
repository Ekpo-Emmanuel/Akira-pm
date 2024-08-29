import { Search, Bell, UserPlus } from 'lucide-react';
import { Moon, Sun } from "lucide-react";
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';


const TopNav = () => {

  return (
    <header className="px-3 h-12 flex items-center justify-between fixed top-0 w-full z-10">
      <div className="text-md font-semibold hidden md:block">
        Akira PM
      </div>

      <div className="relative w-full max-w-sm md:ml-6">
        <SearchBar />
      </div>

      <div className="flex space-x-6 items-center">
        <button className="dark:text-gray-200 dark:hover:text-white">
          <Bell className="w-4 h-8" />
        </button>
        <button className="dark:text-gray-200 dark:hover:text-white">
          <UserPlus className="w-4 h-8" />
        </button>
        {/* <div className="flex gap-2 ">
          <button onClick={() => setTheme("light")} className="bg-black text-white p-3">Light</button>
          <button onClick={() => setTheme("dark")} className="bg-black text-white p-3">Dark</button>
        </div> */}
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

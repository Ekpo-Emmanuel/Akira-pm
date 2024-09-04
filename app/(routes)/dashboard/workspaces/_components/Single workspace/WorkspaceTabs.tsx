'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = [
  { name: 'Boards', path: 'boards' },
  { name: 'Lists', path: 'lists' },
  { name: 'Members', path: 'members' },
  { name: 'Settings', path: 'settings' },
];

export default function WorkspaceTabs({ workspaceId }: { workspaceId: string }) {
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop() || 'boards';

  return (
    <div className="px-4 md:px-10 mt-10">
        <div className="grid grid-cols-4 md:flex mb-4">
        {tabs.map((tab) => (
            <Link
                key={tab.path}
                href={`/dashboard/workspaces/${workspaceId}/${tab.path}`}
                className={`py-1.5 md:h-10 md:px-4 flex items-center justify-center md:text-sm rounded-t-md text-center text-xs border-b ${
                    currentTab === tab.path
                    ? 'text-blue-400  border-blue-500 border-b-3'
                    : 'hover:bg-borderDark dark:border-borderDark text-white'
                }`}
            >
                {tab.name}
            </Link>
        ))}
        </div>
    </div>
  );
}
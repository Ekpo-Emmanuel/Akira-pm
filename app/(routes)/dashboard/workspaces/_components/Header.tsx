import React from 'react'
import { PackageOpen } from 'lucide-react';

export default function Header() {
  return (
    <div className="border-b dark:border-[#656f7d6d]">
      <div className="flex items-center space-x-2 p-3 md:p-4">
        <PackageOpen size={14} strokeWidth={1} />
        <p className="text-sm">All Workspaces</p>
      </div>
    </div>
  )
}

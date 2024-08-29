import React from 'react'

interface WelcomeProps {
    name: string
}
export default function Welcome(props: WelcomeProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-sm font-bold">Good morning, {props.name}!</h2>
            <p className="text-gray-500 text-xs">Quickly access your recent boards, Inbox and workspaces</p>
        </div>
        <button className="inline-flex justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-fit">
        Send Invitation
      </button>
      </div>
    </div>
  )
}

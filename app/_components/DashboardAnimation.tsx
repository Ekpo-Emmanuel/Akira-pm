import React from 'react'

export default function DashboardAnimation() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100 fixed">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute" />
    </div>
  )
}

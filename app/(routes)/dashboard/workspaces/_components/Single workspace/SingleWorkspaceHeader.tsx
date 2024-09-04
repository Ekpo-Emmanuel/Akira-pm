import React from 'react';

export default function SingleWorkspaceHeader() {
  return (
    <section className="">
        <div className="h-20 sm:h-32 bg-bgLight"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-4 md:px-10 ">
            <div className="">
                <div className="absolute -translate-y-5 bg-yellow-500 border-2 border-bgLight text-white rounded-[1rem] w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md">
                    B
                </div>
                <h1 className="ml-16 dark:text-white text-xl font-semibold">Backend Workspace</h1>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-sm text-white py-1.5 md:h-10 px-3 md:px-6 text-center rounded-md flex items-center justify-center gap-1">
                Join Workspace
            </button>
        </div>
    </section>
  );
}

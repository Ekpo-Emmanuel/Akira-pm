import { Skeleton } from "@/components/ui/skeleton"

export function SWorkspace() {
  return (
    <div className="flex flex-col space-y-3 p-3 md:p-6 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin" />
        </div>
      <Skeleton className="h-[25px] w-full rounded-none" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Skeleton className="h-[125px] w-full rounded-md" />
          <Skeleton className="h-[125px] w-full rounded-md" />
          <Skeleton className="h-[125px] w-full rounded-md" />
          <Skeleton className="h-[125px] w-full rounded-md" />
          <Skeleton className="h-[125px] w-full rounded-md" />
          <Skeleton className="h-[125px] w-full rounded-md" />
      </div>
    </div>
  )
}

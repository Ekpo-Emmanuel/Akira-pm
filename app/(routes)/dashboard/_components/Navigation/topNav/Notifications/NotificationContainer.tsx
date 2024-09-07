import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import NotificationTabs from "./NotificationTabs";



export function NotificationContainer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      </SheetTrigger>
      <SheetContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[600px]">
        <SheetHeader>
            <SheetTitle className="flex items-center justify-between w-[90%]">
                Notifications
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-center rounded-md hover:bg-bgLight hover:dark:bg-borderDark h-[26px] w-[26px] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] bg-white dark:bg-workspaceDark  dark:border-borderDark">
                        <DropdownMenuCheckboxItem>
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={14}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-mail-check"
                            >
                            <path d="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h8" />
                            <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7M16 19l2 2 4-4" />
                            </svg>
                            <span>Mark all as read</span>
                        </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                        <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                        >
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <path d="M10 11L10 17" />
                            <path d="M14 11L14 17" />
                        </svg>
                            <span>Delete all</span>
                        </div>
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SheetTitle>
        </SheetHeader>
        <NotificationTabs />
        <SheetFooter>
          <SheetClose asChild>
            <button type="submit">Save changes</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

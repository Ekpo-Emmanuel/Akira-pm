"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, differenceInCalendarDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CellContext } from "@tanstack/react-table"; // Import CellContext

import { Row } from "@/app/types"; // Adjust the import path as needed

const DateTimelineCell = ({ row, column, table }: CellContext<Row, any>) => {
  const columnId = column.id;

  // Access the correct dateTimeline data based on the column ID
  const dateTimeline = row.original[columnId] || {};

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (dateTimeline.start && dateTimeline.end) {
      return {
        from: new Date(dateTimeline.start),
        to: new Date(dateTimeline.end),
      };
    }
    return undefined;
  });

  // Calculate the number of days between the selected range
  const numberOfDays =
    date?.from && date?.to
      ? differenceInCalendarDays(date.to, date.from) + 1
      : 0;

  // Get the updateData function from table meta
  const updateData = table.options.meta?.updateData;

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    // Update the data in the table
    updateData?.(row.index, columnId, {
      start: newDate?.from?.toISOString() || "",
      end: newDate?.to?.toISOString() || "",
    });
  };

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the popover from toggling
    setDate(undefined);
    // Update the data in the table
    updateData?.(row.index, columnId, { start: "", end: "" });
  };

  return (
    <div className="grid gap-2 h-full">
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "relative w-full h-full flex items-center px-2 text-xs sm:text-sm hover:bg-bgLight dark:hover:bg-borderDark group",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                </>
              ) : (
                format(date.from, "MMM d")
              )
            ) : (
              <span>-</span>
            )}

            {/* Clear date button */}
            {date && (
              <div className="absolute right-[2px] bg-bgLight dark:bg-borderDark rounded-sm p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <X
                  size={14}
                  className="cursor-pointer"
                  aria-label="Clear date"
                  onClick={handleClearDate}
                />
              </div>
            )}

            {/* Show number of days on hover */}
            {date?.from && date?.to && (
              <div className="absolute top-1/2 -translate-y-1/2 left-1 bg-gray-100 dark:bg-bgDark text-gray-700 dark:text-gray-300 p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {numberOfDays}d
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimelineCell;

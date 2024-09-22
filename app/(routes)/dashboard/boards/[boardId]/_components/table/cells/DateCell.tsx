"use client"

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Plus, X } from 'lucide-react';
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CellContext } from '@tanstack/react-table';


/**
 * A table cell component that displays a date in the format "MMM d".
 * It also provides a calendar component for selecting a date.
 * If no date is selected, it displays a Plus icon.
 * If a date is selected, it displays an X icon for clearing the date.
 * The component expects to receive the following props:
 * - `getValue`: a function that returns the value of the cell
 * - `row`: the row object of the table
 * - `column`: the column object of the table
 * - `table`: the table object
 * The component uses the `updateData` function from the `table.options.meta`
 * to update the data in the table.
 * @param {Object} props - The props object
 * @param {Function} props.getValue - A function that returns the value of the cell
 * @param {Object} props.row - The row object of the table
 * @param {Object} props.column - The column object of the table
 * @param {Object} props.table - The table object
 * @returns {ReactElement} The rendered component
 */


export function DateCell({ getValue, row, column, table }: CellContext<any, unknown>) {
  const dueDate = getValue() as string | undefined; // Ensure dueDate is of string type or undefined
  const updateData = table.options.meta?.updateData;

  // Initialize state with parsed date, if it exists
  const [date, setDate] = React.useState<Date | undefined>(() => (dueDate ? parseISO(dueDate) : undefined));

  // Update date in both state and the table
  const handleDateChange = React.useCallback((selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && updateData) {
      updateData(row.index, column.id, format(selectedDate, "yyyy-MM-dd"));
    }
  }, [updateData, row.index, column.id]);

  // Clear the current date and update the table
  const handleClearDate = React.useCallback(() => {
    setDate(undefined);
    if (updateData) {
      updateData(row.index, column.id, '');
    }
  }, [updateData, row.index, column.id]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full bg-inherit flex items-center justify-center h-full">
          <div
            className={`
              w-[95%] relative hover:border dark:hover:border-borderDark rounded-md h-7 flex items-center justify-center gap-1
              ${!date ? 'hover:opacity-100 opacity-0 transition-opacity duration-300' : 'opacity-100'}
              group
            `}
          >
            {/* Display formatted date or Plus icon if no date */}
            <span className="text-sm">
              {date ? format(date, "MMM d") : <Plus size={14} />}
            </span>
            {!date && <CalendarIcon className="mr-2 h-4 w-4" />}
            {/* Display the clear (X) icon if a date exists */}
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
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* Calendar component for selecting a date */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

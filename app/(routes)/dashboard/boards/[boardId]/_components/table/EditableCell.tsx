'use client'

import * as React from 'react';
import { Maximize2 } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';

/**
 * EditableCell is a React component that renders an editable input field for a table cell.
 *
 * It expects to receive the following props:
 * - `getValue`: a function that returns the initial value of the cell
 * - `row`: the row object of the table
 * - `column`: the column object of the table
 * - `table`: the table object
 *
 * The component uses React state to manage the cell's value, and provides an input field for editing that value.
 * When the input field loses focus, it triggers the table's `updateData` function (if it exists) to update the table data.
 *
 * The component also provides an optional icon for expanding/maximizing the cell, which is disabled by default.
 *
 * @param {{ getValue: () => any, row: any, column: any, table: any }} props - The props object
 * @returns {ReactElement} The rendered component
 */
export default function EditableCell({ getValue, row, column, table }: CellContext<any, unknown>) {
  // Initialize state with the cell's initial value
  const initialValue = getValue() as string | number | undefined; 
  const [value, setValue] = React.useState(initialValue); // Use state to manage cell value

  // Function to handle updates when input loses focus
  const handleBlur = React.useCallback(() => {
    const updateData = table.options.meta?.updateData;
    if (updateData) {
      updateData(row.index, column.id, value); // Trigger the table update with the current value
    }
  }, [value, row.index, column.id, table]);

  // Sync state when initialValue changes (e.g., when table data changes)
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Function to handle input change
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <section className="w-full h-full">
      <div className="grid grid-cols-[1.7fr_0.3fr] h-full">
        {/* Input field for editing the cell's value */}
        <div className="h-full p-1 flex items-center">
          <input
            type="text"
            value={value}
            onChange={handleChange} // Using optimized change handler
            onBlur={handleBlur} // Using optimized blur handler
            className="bg-inherit hover:border hover:border-gray-300 dark:hover:border-borderDark text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:border-borderDark dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add item"
          />
        </div>
        
        {/* Icon for expanding/maximizing the cell (optional functionality) */}
        <div className="border-l dark:border-borderDark h-full cursor-pointer p-1">
          <div className="h-full flex items-center justify-center rounded-sm hover:bg-bgLight dark:hover:bg-borderDark">
            <Maximize2 size={14} strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

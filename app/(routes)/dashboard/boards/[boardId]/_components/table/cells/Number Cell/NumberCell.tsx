'use client'

import * as React from 'react';
import { X } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';

export default function NumberCell({ getValue, row, column, table }: CellContext<any, unknown>) {
  const initialValue = getValue() as string | number | undefined; 
  const [value, setValue] = React.useState(initialValue); 

  const handleBlur = React.useCallback(() => {
    const updateData = table.options.meta?.updateData;
    if (updateData) {
      updateData(row.index, column.id, value); 
    }
  }, [value, row.index, column.id, table]);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleClearInput = () => {
    setValue('');
  };

  return (
    <section className="w-full h-full">
      <div className="h-full p-[2px] flex items-center relative group">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-inherit h-full w-full text-center border border-white hover:border-borderDark dark:border-workspaceDark hover:border hover:textDark  dark:hover:border-tableHoverBorderDark text-textDark dark:text-textLight text-xs sm:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2 dark:border-borderDark dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {value && (
          <div className="absolute right-[4px] bg-bgLight dark:bg-borderDark rounded-sm p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <X
              size={14}
              className="cursor-pointer"
              aria-label="Clear number"
              onClick={handleClearInput}
            />
          </div>
        )}
      </div>
    </section>
  );
}

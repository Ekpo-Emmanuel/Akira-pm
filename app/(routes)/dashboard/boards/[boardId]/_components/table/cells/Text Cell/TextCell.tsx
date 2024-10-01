'use client'

import * as React from 'react';
import { X, Plus, Type } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';

export default function TextCell({ getValue, row, column, table }: CellContext<any, unknown>) {
    // Initialize state with the cell's initial value
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
            className="bg-inherit h-full border border-white hover:border-borderDark dark:border-workspaceDark hover:border hover:textDark  dark:hover:border-tableHoverBorderDark text-textDark dark:text-textLight text-xs sm:text-sm placeholder:text-xs placeholder:sm:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 dark:border-borderDark dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

            {/*  Clear button */}
            {value && (
                <div className="absolute right-[6px] bg-bgLight dark:bg-borderDark rounded-sm p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <X
                    size={14}
                    className="cursor-pointer"
                    aria-label="Clear number"
                    onClick={handleClearInput}
                    />
                </div>
            )}

            {/*  Add button */}
            {!value && (    
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs sm:text-sm text-textDark dark:text-textLight">
                        {<Plus size={14} />}
                    </span>
                    {<Type className="mr-2 h-4 w-4" />}
                </div>
            )}
        </div>
      </section>
  )
}

'use client'
import React, { useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, ColumnDef, getSortedRowModel, SortingState } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox"
import { dummyData } from '../dummyData';
import { Row } from '@/app/types';
import clsx from 'clsx';
import EditableCell from './EditableCell';
import StatusCell from './cells/StatusCell';
import { DateCell } from './cells/DateCell';
import { AssigneeCell } from './cells/Assignee Cell/AssigneeCell';
import Header from './cells/Header cell/Header';

const columns: ColumnDef<Row>[] = [
    {
        id: 'select-col',
        header: ({ table }) => (
            <div className="w-[40px] max-w-[40px] h-full flex items-center justify-center">
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="h-full flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            </div>
        ),
        size: 40,
        maxSize: 40,
    },
    {
        accessorKey: 'task',
        header: Header,
        size: 350,
        cell: EditableCell,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Status ++
            </button>
        ),
        size: 200,
        minSize: 150,
        cell: StatusCell,
    },
    {
        accessorKey: 'dueDate',
        header: 'Due Date',
        minSize: 100,
        cell: DateCell,
    },
    {
        accessorKey: 'assignees',
        header: 'Assignees',
        cell: AssigneeCell,
    },
];

export default function TableContainer() {
    const [data, setData] = useState(dummyData[0].rows);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange',
        onSortingChange: setSorting,
        state: {
            sorting,
        },
        enableMultiRowSelection: true,
        meta: {
            updateData: (rowIndex: any, columnId: any, value: any) => {
                setData((prev) =>
                    prev.map((row, index) =>
                        index === rowIndex ? { ...row, [columnId]: value } : row
                    )
                );
            },
        },
    });

    return (
        <section className="w-full">
            {/* Scrollable container */}
            <div className="overflow-x-auto">
                {/* Apply table-layout: fixed to ensure consistent column sizes */}
                <div 
                    className="min-w-[1000px] border-l-[6px] border-green-500 rounded-md table-fixed"
                >
                    {/* Headers */}
                    {table.getHeaderGroups().map((headerGroup) => (
                        <div className="flex w-full" key={headerGroup.id}>                   
                            {headerGroup.headers.map((header) => (
                                <div 
                                    className="relative flex items-center justify-center p-1.5 text-xs text-center border-r border-b border-borderDark"
                                    style={{ width: header.getSize() }}
                                    key={header.id}
                                >
                                    {typeof header.column.columnDef.header === 'function'
                                        ? header.column.columnDef.header(header.getContext())
                                        : header.column.columnDef.header} 
                                    <div
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        className={clsx(
                                            'resizer',
                                            header.column.getIsResizing() && 'isResizing'
                                        )}
                                    />
                                </div>
                            ))}

                            {/* Static "Add new Column" header */}
                            <div className="relative flex-grow p-1.5 text-xs uppercase text-left border-r border-b border-borderDark" key="add-column-header">
                                <div className='h-full w-fit flex items-center'>
                                    Add new Column
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Rows */}
                    {table.getRowModel().rows.map((row) => (
                        <div 
                            className={clsx('flex w-full', row.getIsSelected() ? 'selected' : null)} 
                            key={row.id}
                            onClick={row.getToggleSelectedHandler()}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <div 
                                    key={cell.id}
                                    className="h-8 border-r-[1px] border-b-[1px] border-gray-300 dark:border-borderDark"
                                    style={{ width: cell.column.getSize() }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            ))}

                            {/* Static "Add new Column" row */}
                            <div className="h-8 flex-grow border-r-[1px] border-b-[1px] border-gray-300 dark:border-borderDark flex items-center justify-center" key={`role-${row.id}`}>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

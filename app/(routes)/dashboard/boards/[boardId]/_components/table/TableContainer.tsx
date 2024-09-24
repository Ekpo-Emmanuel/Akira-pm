'use client'
import React, { useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox"
import { dummyData } from '../dummyData';
import { Row } from '@/app/types';
import clsx from 'clsx';
import EditableCell from './EditableCell';
import StatusCell from './cells/StatusCell';
import { DateCell } from './cells/DateCell';
import { AssigneeCell } from './cells/Assignee Cell/AssigneeCell';


const columns: ColumnDef<Row>[] = [
    {
        id: 'select-col',
        header: ({ table }) => (
            <div>
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    // indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
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
        header: 'Task',
        size: 350,
        cell: EditableCell,
    },
    {
        accessorKey: 'status',
        header: 'Status',
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
        // cell: (props: any) => <p>{props.getValue()}</p>,
        cell: AssigneeCell,
    },
];

export default function TableContainer() {
    const [data, setData] = useState(dummyData[0].rows);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        // enableRowSelection: row => row.original.age > 18,
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
        <section className="">
            <div 
                className="w-full border-l-[4px] border-green-500 rounded-md" 
                style={{ width: table.getTotalSize() }}
            >
                {/* Headers */}
                {table.getHeaderGroups().map((headerGroup) => (
                    <div className="flex w-fit" key={headerGroup.id}>                   
                        {/* Existing dynamic headers */}
                        {headerGroup.headers.map((header) => (
                            <div className="th" style={{ width: header.getSize() }} key={header.id}>
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

                        {/* New static header column */}
                        <div className="th" style={{ width: '200px' }} key="header-column">
                            Add new Column 
                            <div className="resizer" />
                        </div>
                    </div>
                ))}

                {/* Rows */}
                {table.getRowModel().rows.map((row) => (
                    <div 
                        className={clsx('tr', row.getIsSelected() ? 'selected' : null)} 
                        key={row.id}
                        onClick={row.getToggleSelectedHandler()}
                    >
                        {/* Existing dynamic cells */}
                        {row.getVisibleCells().map((cell) => (
                            <div 
                                key={cell.id}
                                // className="td" 
                                className="h-8 border-r-[1px] border-b-[1px] border-gray-300 dark:border-borderDark"
                                style={{ width: cell.column.getSize() }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}

                        {/* New static role/column */}
                        <div className="h-8 border-r-[1px] border-b-[1px] border-gray-300 dark:border-borderDark" style={{ width: '200px' }} key={`role-${row.id}`}>                            
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

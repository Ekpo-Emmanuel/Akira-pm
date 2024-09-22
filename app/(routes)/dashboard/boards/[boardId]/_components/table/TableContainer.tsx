'use client'
import React, { useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { dummyData } from '../dummyData';
import { Row } from '@/app/types';
import clsx from 'clsx';
import EditableCell from './EditableCell';
import StatusCell from './cells/StatusCell';

const columns: ColumnDef<Row>[] = [
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
        minSize: 100,
        cell: StatusCell,
    },
    {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: (props: any) => <p>{props.getValue()}</p>,
    },
];

export default function TableContainer() {
    const [data, setData] = useState(dummyData[0].rows);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
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
        <section>
            <div className="table" style={{ width: table.getTotalSize() }}>
                {/* Headers */}
                {table.getHeaderGroups().map((headerGroup) => (
                    <div className="tr" key={headerGroup.id}>
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
                    </div>
                ))}

                {/* Rows */}
                {table.getRowModel().rows.map((row) => (
                    <div className="tr" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <div key={cell.id} className="td" style={{ width: cell.column.getSize() }}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

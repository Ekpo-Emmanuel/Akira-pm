'use client'
import React, { useState } from 'react';
import { 
    flexRender, 
    getCoreRowModel, 
    useReactTable, 
    ColumnDef, 
    getSortedRowModel, 
    SortingState 
} from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox"
import { IoMdArrowDropdown } from "react-icons/io";
import { Plus, Ellipsis } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { dummyData, statusOptions, priorityOptions, labelOptions } from '../dummyData';
import { Row, StatusOption, PriorityOption, LabelOption, Column } from '@/app/types';
import { toast } from 'sonner';
import clsx from 'clsx';
import EditableCell from './EditableCell';
import StatusCell from './cells/StatusCell';
import PeopleCell from './cells/People Cell/PeopleCell'; 
import DateTimelineCell from './cells/DateTimeline Cell/DateTimelineCell'; 
import PriorityCell from './cells/Priority Cell/PriorityCell'; 
import CheckboxGroupCell from './cells/CheckboxGroup Cell/CheckboxGroupCell'; 
import LabelCell from './cells/Label Cell/LabelCell'; 
import SelectCell from './cells/Select Cell/SelectCell'; 
import MultiSelectCell from './cells/MultiSelect Cell/MultiSelectCell'; 
import { AssigneeCell } from './cells/Assignee Cell/AssigneeCell'; 
import Header from './cells/Header cell/Header';
import { DateCell } from './cells/DateCell';
import NumberCell from './cells/Number Cell/NumberCell';
import TextCell from './cells/Text Cell/TextCell';
import HeaderContainer from './tableHeader.tsx/HeaderContainer';

const COLUMN_TYPES = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'select', label: 'Select' },
    { value: 'multiselect', label: 'Multiselect' },
    { value: 'status', label: 'Status' },
    { value: 'people', label: 'People' },
    { value: 'date_timeline', label: 'Date Timeline' },
    { value: 'priority', label: 'Priority' },
    { value: 'checkbox_group', label: 'Checkbox Group' },
    { value: 'label', label: 'Label' },
];

const initialColumns: ColumnDef<Row>[] = [
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
        meta: { options: statusOptions },
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
    {
        accessorKey: 'dateTimeline',
        header: 'Timeline',
        cell: DateTimelineCell,
        size: 250,
        minSize: 50,
    },
];

const TableContainer: React.FC = () => {
    const [data, setData] = useState<Row[]>(dummyData[0].rows);
    const [columns, setColumns] = useState<ColumnDef<Row>[]>(initialColumns);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        enableRowSelection: true, // Updated to match react-table's latest API
        meta: {
            updateData: (rowIndex: number, columnId: string, value: any) => {
                setData((prev) =>
                    prev.map((row, index) =>
                        index === rowIndex ? { ...row, [columnId]: value } : row
                    )
                );
            },
        },
    });

    // Function to add a new column
    const addNewColumn = (newColumn: Column) => {
        let newColumnDef: ColumnDef<Row>;

        switch (newColumn.type) {
            case 'text':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: TextCell,
                    size: 250,
                    minSize: 100,
                };
                break;
            case 'number':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: NumberCell,
                    size: 100,
                    minSize: 80,
                };
                break;
            case 'date':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: DateCell,
                    size: 150,
                    minSize: 100,
                };
                break;
            case 'select':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: SelectCell,
                    size: 150,
                    minSize: 100,
                    meta: { options: newColumn.options as StatusOption[] },
                };
                break;
            case 'multiselect':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: MultiSelectCell,
                    size: 200,
                    minSize: 150,
                    meta: { options: newColumn.options as StatusOption[] },
                };
                break;
            case 'status':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: StatusCell,
                    size: 150,
                    minSize: 100,
                    meta: { options: newColumn.options as StatusOption[] },
                };
                break;
            case 'people':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: PeopleCell,
                    size: 200,
                    minSize: 150,
                };
                break;
            case 'date_timeline':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: DateTimelineCell,
                    size: 250,
                    minSize: 50,
                };
                break;
            case 'priority':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: PriorityCell,
                    size: 150,
                    minSize: 100,
                    meta: { options: newColumn.options as PriorityOption[] },
                };
                break;
            case 'checkbox_group':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: CheckboxGroupCell,
                    size: 200,
                    minSize: 150,
                };
                break;
            case 'label':
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: LabelCell,
                    size: 200,
                    minSize: 150,
                    meta: { options: newColumn.options as LabelOption[] },
                };
                break;
            default:
                newColumnDef = {
                    accessorKey: newColumn.id,
                    header: newColumn.name,
                    cell: EditableCell,
                    size: 150,
                    minSize: 100,
                };
                break;
        }

        setColumns((prev) => [...prev, newColumnDef]);
        toast.success('Added new column');


        // Update existing data rows to include the new column with a default value
        setData((prevData) =>
            prevData.map((row) => ({
                ...row,
                [newColumn.id]: 
                    newColumn.type === 'multiselect' || newColumn.type === 'checkbox_group' ? [] : 
                    newColumn.type === 'status' || newColumn.type === 'priority' || newColumn.type === 'label' ? null : 
                    '',
            }))
        );
    };

    return (
        <section className="w-full p-4">
            {/* Header */}
            <HeaderContainer 
                onCollapse={() => setIsCollapsed(!isCollapsed)} 
                onAddColumn={addNewColumn} 
            />

            {/* Collapsable Table */}
            {!isCollapsed && (
                <div className="relative overflow-x-auto rounded-md border">
                    <div className="relative border-l-[5px] border-green-500 rounded-md whitespace-nowrap min-w-max">
                        {/* Headers */}
                        {table.getHeaderGroups().map((headerGroup) => (
                            <div
                                className="sticky top-0 z-10 flex w-full" 
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => (
                                    <div 
                                        className="relative flex items-center justify-center p-1.5 text-xs text-center border-t border-r border-b border-borderDark dark:border-borderDark"
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
                                <div className="relative flex-grow p-1.5 text-xs uppercase text-left border-r border-b border-t border-borderDark dark:border-borderDark" key="add-column-header">
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
                                    {/* Content if any */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default TableContainer;
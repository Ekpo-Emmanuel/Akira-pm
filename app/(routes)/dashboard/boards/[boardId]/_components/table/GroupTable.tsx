'use client';

import React, { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  SortingState,
  RowSelectionState,
  CellContext
} from '@tanstack/react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StatusCell from './StatusCell';
import { TaskGroup, Task, SubItem, StatusOption, CustomColumnDef } from '@/app/types';

type GroupTableProps = {
  group: TaskGroup;
  columns: CustomColumnDef<Task, any>[];
  onDragEnd: (result: any) => void;
  addColumn: () => void;
  addItemToGroup: (newItem: Task) => void;
  addSubItemToTask: (taskId: string, newSubItem: SubItem) => void;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  scrollRef: (ref: HTMLDivElement | null) => void;
  onScroll: (groupId: string, scrollLeft: number) => void;
  groupId: string;
  statusOptions: StatusOption[];
  setStatusOptions: React.Dispatch<React.SetStateAction<StatusOption[]>>;
};

function GroupTable({
  group,
  columns,
  onDragEnd,
  addColumn,
  addItemToGroup,
  addSubItemToTask,
  updateTaskStatus,
  scrollRef,
  onScroll,
  groupId,
  statusOptions,
  setStatusOptions,
}: GroupTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [newItemText, setNewItemText] = useState(''); // To store new item text
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({}); // Manage expanded state

  // State for new sub-item inputs
  const [newSubItemTexts, setNewSubItemTexts] = useState<{
    [taskId: string]: Partial<SubItem>;
  }>({});

  // Modify columns to include custom cell renderers
  const modifiedColumns = columns.map((column) => {
    if (column.accessorKey === 'task') {
      return {
        ...column,
        cell: ({ row, getValue }: CellContext<Task, any>) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id],
                }))
              }
              style={{ cursor: 'pointer', marginRight: '5px' }}
            >
              {expanded[row.id] ? '▼' : '▶'}
            </button>
            <p>{getValue()}</p>
          </div>
        ),
      };
    } else if (column.accessorKey === 'status') {
      return {
        ...column,
        cell: ({ row, getValue }: CellContext<Task, any>) => (
          <StatusCell
            row={row}
            value={getValue()}
            statusOptions={statusOptions}
            setStatusOptions={setStatusOptions}
            updateStatus={(newStatus) => {
              // updateTaskStatus(group.id, row.original.id, newStatus);
              updateTaskStatus(group.id, row.original.id);
            }}
          />
        ),
      };
    } else if (column.accessorKey === 'due_date') {
      return {
        ...column,
        cell: ({ getValue }: CellContext<Task, any>) => (
          <p>{new Date(getValue()).toLocaleDateString()}</p>
        ),
      };
    } else {
      return {
        ...column,
        cell: ({ getValue }: CellContext<Task, any>) => <p>{getValue()}</p>,
      };
    }
  });

  const table = useReactTable({
    data: group.items,
    columns: modifiedColumns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    autoResetExpanded: false,
  });

  // Add a new item to the group
  const handleAddItem = () => {
    if (newItemText.trim() === '') return; // Don't add empty items
    const newItem: Task = {
      id: `task-${Date.now()}`,
      task: newItemText,
      status: 'Pending',
      due_date: new Date().toISOString().split('T')[0], // Placeholder date
      notes: '',
      subItems: [],
    };

    addItemToGroup(newItem); // Use the function from props
    setNewItemText(''); // Reset input
  };

  // Add a new sub-item to a task
  const handleAddSubItem = (taskId: string) => {
    const subItemData = newSubItemTexts[taskId];
    if (!subItemData || !subItemData.subItem || !subItemData.owner) return;

    const newSubItem: SubItem = {
      id: `subitem-${Date.now()}`,
      subItem: subItemData.subItem,
      owner: subItemData.owner,
      status: subItemData.status || 'Pending',
      date: subItemData.date || new Date().toISOString().split('T')[0],
    };

    addSubItemToTask(taskId, newSubItem);

    // Reset the input fields for this task
    setNewSubItemTexts((prev) => ({
      ...prev,
      [taskId]: {},
    }));

    // Expand the row if it's not already expanded
    if (!expanded[taskId]) {
      setExpanded((prev) => ({
        ...prev,
        [taskId]: true,
      }));
    }
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="hide-scrollbar"
      ref={scrollRef}
      onScroll={(e) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        onScroll(groupId, scrollLeft);
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={group.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {/* Table Header */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${
                    modifiedColumns.length + 1
                  }, minmax(150px, 1fr))`,
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f9fafb',
                  zIndex: 1,
                  width: 'max-content', // Adjust to content width
                }}
              >
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header, headerIndex) => (
                    <div
                      key={header.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        headerIndex === 1 ? 'sticky left-0 bg-gray-50 z-10' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ))
                )}
                {/* Add Column Button */}
                <div
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <button onClick={addColumn} className="p-2 bg-blue-500 text-white">
                    Add Column
                  </button>
                </div>
              </div>

              {/* Table Body */}
              {table.getRowModel().rows.map((row, index) => (
                <React.Fragment key={`${row.id}-${row.original.subItems?.length || 0}`}>
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="grid"
                        style={{
                          gridTemplateColumns: `repeat(${
                            modifiedColumns.length + 1
                          }, minmax(150px, 1fr))`,
                          backgroundColor: row.getIsSelected() ? '#ebf8ff' : '#fff',
                          width: 'max-content', // Adjust to content width
                        }}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => (
                          <div
                            key={cell.id}
                            className={`px-6 py-4 whitespace-nowrap ${
                              cellIndex === 1 ? 'sticky left-0 bg-white z-10' : ''
                            }`}
                            style={{
                              borderBottom: '1px solid #e5e7eb',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ))}
                        {/* Empty cell for the 'Add Column' header */}
                        <div
                          className="px-6 py-4 whitespace-nowrap"
                          style={{
                            borderBottom: '1px solid #e5e7eb',
                          }}
                        ></div>
                      </div>
                    )}
                  </Draggable>

                  {/* Render Sub-Items if expanded */}
                  {expanded[row.id] && (
                    <>
                      {/* Sub-Items */}
                      {row.original.subItems && row.original.subItems.length > 0 && (
                        <div
                          className=""
                          style={{
                            width: 'max-content',
                          }}
                        >
                          {row.original.subItems.map((subItem) => (
                            <div
                              key={subItem.id}
                              className="grid"
                              style={{
                                gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))',
                                backgroundColor: '#f9f9f9',
                                marginLeft: '50px', // Indent sub-items
                              }}
                            >
                              <div
                                className="px-6 py-2"
                                style={{
                                  borderBottom: '1px solid #e5e7eb',
                                  gridColumn: 'span 5',
                                }}
                              >
                                <div className="flex">
                                  <div className="w-1/5">{subItem.subItem}</div>
                                  <div className="w-1/5">{subItem.owner}</div>
                                  <div className="w-1/5">{subItem.status}</div>
                                  <div className="w-1/5">{subItem.date}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Sub-Item Form */}
                      <div
                        className=""
                        style={{
                          width: 'max-content',
                        }}
                      >
                        <div
                          className="grid"
                          style={{
                            gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))',
                            backgroundColor: '#f9f9f9',
                            marginLeft: '50px', // Indent sub-items
                          }}
                        >
                          <div
                            className="px-6 py-2"
                            style={{
                              borderBottom: '1px solid #e5e7eb',
                              gridColumn: 'span 5',
                            }}
                          >
                            <div className="flex items-center">
                              <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 mr-2"
                                placeholder="Sub Item"
                                value={newSubItemTexts[row.id]?.subItem || ''}
                                onChange={(e) =>
                                  setNewSubItemTexts((prev) => ({
                                    ...prev,
                                    [row.id]: {
                                      ...prev[row.id],
                                      subItem: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 mr-2"
                                placeholder="Owner"
                                value={newSubItemTexts[row.id]?.owner || ''}
                                onChange={(e) =>
                                  setNewSubItemTexts((prev) => ({
                                    ...prev,
                                    [row.id]: {
                                      ...prev[row.id],
                                      owner: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <input
                                type="text"
                                className="border border-gray-300 px-2 py-1 mr-2"
                                placeholder="Status"
                                value={newSubItemTexts[row.id]?.status || ''}
                                onChange={(e) =>
                                  setNewSubItemTexts((prev) => ({
                                    ...prev,
                                    [row.id]: {
                                      ...prev[row.id],
                                      status: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <input
                                type="date"
                                className="border border-gray-300 px-2 py-1 mr-2"
                                placeholder="Date"
                                value={newSubItemTexts[row.id]?.date || ''}
                                onChange={(e) =>
                                  setNewSubItemTexts((prev) => ({
                                    ...prev,
                                    [row.id]: {
                                      ...prev[row.id],
                                      date: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <button
                                onClick={() => handleAddSubItem(row.id)}
                                className="bg-blue-500 text-white px-4 py-1"
                              >
                                Add Sub-Item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}

              {/* Distribution Row */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${modifiedColumns.length + 1}, minmax(150px, 1fr))`,
                  width: 'max-content', // Adjust to content width
                }}
              >
                {modifiedColumns.map((column, columnIndex) => {
                  if (columnIndex === 0 || columnIndex === 1) {
                    // First two columns (checkbox and task column)
                    return (
                      <div
                        key={column.id}
                        className="px-6 py-4 whitespace-nowrap"
                        style={{
                          borderTop: '1px solid #e5e7eb',
                        }}
                      ></div>
                    );
                  }

                  // For columns with showDistribution === true
                  if (column.showDistribution) {
                    // Calculate distribution for this column
                    const counts: { [key: string]: number } = {};
                    let total = 0;
                    group.items.forEach((item) => {
                      const value = item[column.accessorKey as string];
                      if (value !== undefined && value !== null) {
                        counts[value] = (counts[value] || 0) + 1;
                        total += 1;
                      }
                    });

                    // Create an array of segments
                    const segments = Object.entries(counts).map(([key, count]) => {
                      const percentage = (count / total) * 100;
                      return {
                        key,
                        count,
                        percentage,
                      };
                    });

                    // Use the color from statusOptions
                    return (
                      <div
                        key={column.id}
                        className="px-6 py-4 whitespace-nowrap"
                        style={{
                          borderTop: '1px solid #e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {/* Render the distribution bar */}
                        <div
                          style={{
                            display: 'flex',
                            width: '100%',
                            height: '20px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          {segments.map((segment) => {
                            const option = statusOptions.find(
                              (opt) => opt.label === segment.key
                            );
                            const color = option ? option.color : '#cccccc';
                            return (
                              <div
                                key={segment.key}
                                title={`${segment.key}: ${segment.count}`}
                                style={{
                                  width: `${segment.percentage}%`,
                                  backgroundColor: color,
                                  height: '100%',
                                }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    // For columns without showDistribution or not eligible
                    return (
                      <div
                        key={column.id}
                        className="px-6 py-4 whitespace-nowrap"
                        style={{
                          borderTop: '1px solid #e5e7eb',
                        }}
                      ></div>
                    );
                  }
                })}

                {/* Empty cell for the 'Add Column' button header */}
                <div
                  className="px-6 py-4 whitespace-nowrap"
                  style={{
                    borderTop: '1px solid #e5e7eb',
                  }}
                ></div>
              </div>

              {/* Add Item Row */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${modifiedColumns.length + 1}, minmax(150px, 1fr))`,
                  width: 'max-content', // Adjust to content width
                }}
              >
                <div
                  className="px-6 py-4"
                  style={{
                    gridColumn: `span ${modifiedColumns.length + 1}`,
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="border border-gray-300 px-4 py-2 mr-2 w-full"
                      placeholder="Add new item..."
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                    />
                    <button
                      onClick={handleAddItem}
                      className="bg-green-500 text-white px-4 py-2"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default GroupTable;

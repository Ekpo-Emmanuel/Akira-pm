'use client';


import React, { useState, useRef, useEffect } from 'react';
import { CustomColumnDef, TaskGroup, Task, SubItem, StatusOption } from '@/app/types';
import GroupTable from './GroupTable';

export default function TableViewContainer() {
  const [data, setData] = useState<TaskGroup[]>([
    {
      id: 'group-1',
      groupName: 'Group 1',
      collapsed: false,
      items: [
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
        {
          id: 'task-1',
          task: 'Task 1',
          status: 'In Progress',
          due_date: '2023-10-15',
          notes: 'Some notes',
          subItems: [
            {
              id: 'subitem-1',
              subItem: 'Sub Task 1',
              owner: 'Owner A',
              status: 'Pending',
              date: '2023-10-10',
            },
          ],
        },
        {
          id: 'task-2',
          task: 'Task 2',
          status: 'Completed',
          due_date: '2023-10-20',
          notes: 'More notes',
          subItems: [],
        },
      ],
    },
  ]);

  const [columns, setColumns] = useState<CustomColumnDef<Task, any>[]>([
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'task',
      header: 'Task',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      showDistribution: true,
    },
    {
      accessorKey: 'due_date',
      header: 'Due Date',
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
    },
  ] as CustomColumnDef<Task, any>[]);

  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([
    { label: 'Pending', color: '#FF6384' },
    { label: 'In Progress', color: '#36A2EB' },
    { label: 'Completed', color: '#4BC0C0' },
  ]);

  const addColumn = () => {
    const newColumnId = `column_${columns.length + 1}`;
    const newColumn: CustomColumnDef<Task, any> = {
      accessorKey: newColumnId,
      header: `Column ${columns.length + 1}`,
      cell: ({ getValue }) => <p>{getValue()}</p>,
      showDistribution: false,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);

    setData((prevData) =>
      prevData.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
          ...item,
          [newColumnId]: '', 
        })),
      }))
    );
  };

  const addGroup = () => {
    const newGroupId = `group-${Date.now()}`;
    const newGroup: TaskGroup = {
      id: newGroupId,
      groupName: `Group ${data.length + 1}`,
      collapsed: false,
      items: [],
    };
    setData((prevData) => [...prevData, newGroup]);
  };

  const toggleGroupCollapse = (groupIndex: number) => {
    setData((prevData) =>
      prevData.map((group, index) =>
        index === groupIndex ? { ...group, collapsed: !group.collapsed } : group
      )
    );
  };

  const onDragEnd = (result: any, groupIndex: number) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    setData((prevData) => {
      const newData = [...prevData];
      const group = newData[groupIndex];
      const items = Array.from(group.items);
      const [reorderedItem] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, reorderedItem);
      group.items = items;
      return newData;
    });
  };

  const addItemToGroup = (groupId: string, newItem: Task) => {
    setData((prevData) =>
      prevData.map((group) =>
        group.id === groupId ? { ...group, items: [...group.items, newItem] } : group
      )
    );
  };

  const addSubItemToTask = (groupId: string, taskId: string, newSubItem: SubItem) => {
    setData((prevData) =>
      prevData.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          items: group.items.map((task) => {
            if (task.id !== taskId) return task;
            return {
              ...task,
              subItems: [...(task.subItems || []), newSubItem],
            };
          }),
        };
      })
    );
  };

  const updateTaskStatus = (groupId: string, taskId: string, newStatus: string) => {
    setData((prevData) =>
      prevData.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          items: group.items.map((item) =>
            item.id === taskId ? { ...item, status: newStatus } : item
          ),
        };
      })
    );
  };

  const groupRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isSyncingScroll = useRef(false);

  const handleGroupScroll = (groupId: string, scrollLeft: number) => {
    if (isSyncingScroll.current) {
      return;
    }
    isSyncingScroll.current = true;
    Object.keys(groupRefs.current).forEach((id) => {
      if (id !== groupId) {
        const ref = groupRefs.current[id];
        if (ref && ref.scrollLeft !== scrollLeft) {
          ref.scrollLeft = scrollLeft;
        }
      }
    });
    if (customScrollbarRef.current && customScrollbarRef.current.scrollLeft !== scrollLeft) {
      customScrollbarRef.current.scrollLeft = scrollLeft;
    }
    isSyncingScroll.current = false;
  };

  const customScrollbarRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const handleCustomScrollbarScroll = () => {
    if (isSyncingScroll.current) {
      return;
    }
    isSyncingScroll.current = true;
    const scrollLeft = customScrollbarRef.current?.scrollLeft || 0;
    Object.values(groupRefs.current).forEach((ref) => {
      if (ref && ref.scrollLeft !== scrollLeft) {
        ref.scrollLeft = scrollLeft;
      }
    });
    isSyncingScroll.current = false;
  };

  useEffect(() => {
    const firstGroupRef = groupRefs.current[data[0]?.id];
    if (firstGroupRef) {
      const width = firstGroupRef.scrollWidth;
      setContentWidth(width);
      if (customScrollbarRef.current) {
        customScrollbarRef.current.scrollLeft = firstGroupRef.scrollLeft;
      }
    }
  }, [columns, data]);

  return (
    <div className="w-full" style={{ position: 'relative', paddingBottom: '40px' }}>
      {data.map((group, groupIndex) => (
        <div key={group.id} className="group mb-8">
          {/* Group Header */}
          <div
            className="group-header flex items-center justify-between p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleGroupCollapse(groupIndex)}
            style={{ position: 'sticky', top: 0, zIndex: 2 }}
          >
            <h2 className="text-lg font-bold">{group.groupName}</h2>
            <button className="text-sm">{group.collapsed ? 'Expand' : 'Collapse'}</button>
          </div>
          {/* Group Table */}
          {!group.collapsed && (
            <GroupTable
              group={group}
              columns={columns}
              onDragEnd={(result) => onDragEnd(result, groupIndex)}
              addColumn={addColumn}
              addItemToGroup={(newItem) => addItemToGroup(group.id, newItem)}
              addSubItemToTask={(taskId, newSubItem) =>
                addSubItemToTask(group.id, taskId, newSubItem)
              }
              updateTaskStatus={(taskId, newStatus) =>
                updateTaskStatus(group.id, taskId, newStatus)
              }
              scrollRef={(ref) => {
                groupRefs.current[group.id] = ref;
              }}
              onScroll={handleGroupScroll}
              groupId={group.id}
              statusOptions={statusOptions}
              setStatusOptions={setStatusOptions}
            />
          )}
        </div>
      ))}
      <button onClick={addGroup} className="mt-4 p-2 bg-green-500 text-white">
        Add New Group
      </button>
      {/* Custom Scrollbar at the Bottom */}
      <div
        ref={customScrollbarRef}
        onScroll={handleCustomScrollbarScroll}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          overflowX: 'auto',
          overflowY: 'hidden',
          height: '20px',
          backgroundColor: '#f1f1f1',
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: contentWidth,
            height: '1px', 
          }}
        ></div>
      </div>
    </div>
  );
}
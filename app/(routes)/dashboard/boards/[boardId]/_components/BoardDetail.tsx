'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import TableView from './TableView';
import EditableTable from './EditableTable';
import TableViewContainer from './table/TableViewContainer';

interface BoardDetailProps {
  boardId: Id<"boards">;
}

export default function BoardDetail({ boardId }: BoardDetailProps) {
  const board = useQuery(api.boards.getSingleBoard, { boardId });
  const tables = useQuery(api.tables.getTables, { boardId });
  if (!board || !tables) return <div>Loading...</div>;

  const defaultTable = tables[0]; 

  return (
    <div>
      {/* {defaultTable && <TableView tableId={defaultTable._id}  />} */}
      {/* <EditableTable /> */}
      <TableViewContainer />
    </div>
  );
}
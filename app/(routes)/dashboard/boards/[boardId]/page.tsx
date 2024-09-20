'use client';

import { Id } from '@/convex/_generated/dataModel';
import BoardHearder from './_components/Header/BoardHearder';


export default function BoardPage({ params }: { params: { boardId: string } }) {
  const boardId = params.boardId as string;

  return (
    <section className="relative">
      <BoardHearder boardId={boardId as Id<"boards">}/>
    </section>
  );
}
'use client'
import BoardHeaderTitle from './BoardHeaderTitle';
import BoarderHeaderTabs from './BoarderHeaderTabs';

interface BoardHeaderProps {
    boardId: string;
}


export default function BoardHeader(props: BoardHeaderProps) {
  return (
    <div >
      <BoardHeaderTitle boardId={props.boardId} />
      <BoarderHeaderTabs 
        boardId={props.boardId}
      />
    </div>
  );
}

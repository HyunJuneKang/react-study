import React from "react";
import useBoardStore, { type postType } from "../types/boardType";
import { useNavigate } from "react-router-dom";

function BoardItem({ bno, title, writer }: postType) {
  const navigate2 = useNavigate();

  //const selectedId = useBoardStore((state) => state.selectedId);
  //const onSelect = useBoardStore((state) => state.onSelect);
  const onDelete = useBoardStore((state) => state.onDelete);

  //const isSelected = selectedId === bno;

  const onClickItem = () => {
    //onSelect(bno);
    navigate2(`/board/${bno}`); //path variable , URI에 dataq전달
  };

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("삭제하시겠습니까?")) return;
    onDelete(bno);
  };

  return (
    <div
      onClick={onClickItem}
      className="flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-colors 
        bg-blue-50 border-blue-300"
    >
      <span className="text-gray-800">
        {title} <span className="text-gray-500">({writer})</span>
      </span>
      <button
        onClick={onClickDelete}
        className="text-red-500 hover:text-red-600 text-sm font-medium"
      >
        삭제
      </button>
    </div>
  );
}
export default React.memo(BoardItem);

import React from "react";
import type { postType } from "../types/boardType";
import useBoardStore from "../types/boardType";
import { useNavigate } from "react-router-dom";

function BoardItem({ bno, title, writer }: postType) {
  const navigate = useNavigate();
  const selectedId = useBoardStore((state) => state.selectedId);
  const onDelete = useBoardStore((state) => state.onDelete);

  const isSelected = selectedId === bno;

  const onClickItem = () => {
    navigate(`/board/${bno}`);
  };

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(bno);
  };

  return (
    <div
      onClick={onClickItem}
      className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-50 border-blue-300"
          : "border-gray-200 hover:bg-gray-50"
      }`}
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

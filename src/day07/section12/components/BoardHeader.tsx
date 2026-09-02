import React from "react";

const BoardHeader = () => {
  return (
    <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span>[신한DS금융소프트 아카데미]</span>
      <span>----게시글-----</span>
    </h1>
  );
};
export default React.memo(BoardHeader);

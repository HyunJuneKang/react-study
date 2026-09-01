import { Route, Routes, useLocation } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";
import BoardEditor from "./BoardEditor";
import BoardDetail from "./BoardDetail";

export default function BoardHome() {
  const location = useLocation();
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <BoardHeader />
        <Routes>
          {/* 조회 : /board */}
          <Route path="/" element={<BoardList />} />
          {/* 입력 : /board/new */}
          <Route path="new" element={<BoardEditor />} />
          {/* 상세 : /board/:bno */}
          <Route path=":bno" element={<BoardDetail />} />
          {/* 수정 : /board/:bno/edit */}
          <Route
            path=":bno/edit"
            element={<BoardEditor key={location.pathname} />}
          />
        </Routes>
      </div>
    </div>
  );
}

import { Route, Routes, useLocation } from "react-router-dom";
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";
import BoardEditor from "./BoardEditor";
import BoardDetail from "./BoardDetail";
import BoardHome2 from "./BoardHome2";

export default function BoardHome() {
  const location = useLocation();
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <BoardHeader />
        <Routes>
          {/* -----------------방법2(중첩라우팅), Outlet:자식영역 ------------------*/}
          <Route path="/" element={<BoardHome2 />}>
            <Route index element={<BoardList />} />
            <Route path="new" element={<BoardEditor />} />
            <Route path=":bno" element={<BoardDetail />} />
            <Route
              path=":bno/edit"
              element={<BoardEditor key={location.pathname} />}
            />
          </Route>
          {/* -----------------방법1------------------*/}
          {/* 조회 : /board
          <Route path="/" element={<BoardList />} />
          입력 : /board/new  
          <Route path="new" element={<BoardEditor />} />
           상세 : /board/:bno  
          <Route path=":bno" element={<BoardDetail />} />
            수정 : /board/:bno/edit  
          <Route
            path=":bno/edit"
            element={<BoardEditor key={location.pathname} />}
          />   */}
          {/* -----------------방법1------------------*/}
        </Routes>
      </div>
    </div>
  );
}

/*



*/

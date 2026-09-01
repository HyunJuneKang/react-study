import { Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import New from "../pages/New";
import Diary from "../pages/Diary";
import Editor from "../pages/Editor";

export default function DiaryApp() {
  return (
    <div className="flex min-h-full">
      <aside className="flex w-48 shrink-0 flex-col bg-slate-800 p-4 text-white">
        <h2 className="mb-6 text-lg font-bold">감정 일기장</h2>

        <nav className="flex flex-col gap-3 text-sm">
          <Link to="/">일기 홈</Link>
          <Link to="/diary/:id">일기 목록</Link>
          <Link to="new">새 일기 작성</Link>
          <Link to="edit">새 일기 수정</Link>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="new" element={<New />} />
          <Route
            path="edit"
            element={<Editor initData={null} onSubmit={null} />}
          />
        </Routes>
      </main>
    </div>
  );
}

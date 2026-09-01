import { Route, Routes } from "react-router-dom";
import BoardListApp from "./day06/section09_board_zustand/components/BoardListApp";
import App from "./App";
import NotFoundPage from "./common/NotFoundPage";
import LinkComponent from "./common/LinkComponent";
import BoardHome from "./day06/section10_board_zustand_params/components/BoardHome";
import TodoListAppZun from "./day05/section07_practice_context/components/TodoListAppZun";
import Home from "./day06/section11_practice_diary/pages/Home";
import New from "./day06/section11_practice_diary/pages/New";
import Edit from "./day06/section11_practice_diary/pages/Editor";
import Diary from "./day06/section11_practice_diary/pages/Diary";
import DiaryApp from "./day06/section11_practice_diary/util/DiaryApp";

function StartApp() {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <LinkComponent />
      <main className="flex-1 min-w-0 p-6 overflow-auto">
        <div className="bg-white rounded shadow p-6 min-h-full">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/diary" element={<DiaryApp />}>
              <Route index element={<Home />} />
              <Route path="new" element={<New />} />
              <Route path=":id" element={<Diary />} />
              <Route path="edit/:id" element={<Edit />} />
            </Route>
            <Route path="/todo" element={<TodoListAppZun />} />
            <Route path="/board-mock" element={<BoardListApp />} />
            <Route path="/board/*" element={<BoardHome />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
export default StartApp;

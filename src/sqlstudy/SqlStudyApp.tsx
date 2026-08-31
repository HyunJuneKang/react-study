import { useState } from "react";
import type { PageType } from "./data/menus";
import Sidebar from "./components/Sidebar";

export default function SqlStudyApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("database");
  const [currentSubMenu, setCurrentSubMenu] = useState<string>("");

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar
        currentPage={currentPage}
        currentSubMenu={currentSubMenu}
        onChangePage={setCurrentPage}
        onChangeSubMenu={setCurrentSubMenu}
      />

      <section className="min-w-0 flex-1">{/* 선택된 페이지 */}</section>
    </div>
  );
}

import { useState } from "react";
import Sidebar, { type PageType } from "./components/sidebar";

export default function SqlStudyApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("database");

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentPage={currentPage} onChangePage={setCurrentPage} />

      <section className="min-w-0 flex-1">{/* 선택된 페이지 */}</section>
    </div>
  );
}

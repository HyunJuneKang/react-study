import { useState } from "react";
import { menus } from "../data/menus";
import type { PageType } from "../data/menus";

type SidebarProps = {
  currentPage: PageType;
  currentSubMenu: string;
  completedCount: number;
  totalCount: number;
  onSelect: (page: PageType, subMenuId: string) => void;
};

const menuIcons: Record<PageType, string> = {
  database: "DB",
  sql: "SQL",
  "data-modeling-and-normalization": "ERD",
  "index-and-performance": "IDX",
  "transaction-and-concurrency": "TX",
  "authorization-and-security": "SEC",
  "advanced-database-operations": "OPS",
  "interview-questions": "Q&A",
};

export default function Sidebar({
  currentPage,
  currentSubMenu,
  completedCount,
  totalCount,
  onSelect,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const visibleMenus = menus
    .map((menu) => {
      if (!normalizedQuery) return menu;

      const parentMatches = menu.label.toLowerCase().includes(normalizedQuery);
      const matchingSubMenus = parentMatches
        ? menu.subMenus
        : menu.subMenus.filter((subMenu) =>
            subMenu.label.toLowerCase().includes(normalizedQuery),
          );

      return { ...menu, subMenus: matchingSubMenus };
    })
    .filter((menu) => menu.subMenus.length > 0);

  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-white md:sticky md:top-0 md:h-screen md:w-80 md:flex-none md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <header className="border-b border-slate-800 px-5 py-5 md:px-6 md:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black shadow-lg shadow-blue-950/60">
                SQL
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-400">
                  Interactive Study
                </p>
                <h1 className="mt-1 text-xl font-black tracking-tight">
                  SQL Interview Lab
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="sql-study-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-lg text-slate-300 transition hover:border-blue-500 hover:text-white md:hidden"
            >
              <span className="sr-only">학습 목차 열기</span>
              <span aria-hidden="true">{isMobileMenuOpen ? "×" : "☰"}</span>
            </button>
          </div>

          <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:block`}>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">학습 진행도</span>
                <span className="text-blue-300">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <label className="relative mt-5 block">
              <span className="sr-only">학습 메뉴 검색</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500"
              >
                ⌕
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="개념 검색"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>
          </div>
        </header>

        <nav
          id="sql-study-navigation"
          aria-label="SQL 학습 목차"
          className={`${isMobileMenuOpen ? "block" : "hidden"} max-h-[55vh] flex-1 overflow-y-auto px-3 py-4 md:block md:max-h-none`}
        >
          {visibleMenus.length > 0 ? (
            <ul className="space-y-2">
              {visibleMenus.map((menu, index) => {
                const isActive = currentPage === menu.id;
                const showSubMenus = isActive || normalizedQuery.length > 0;
                const firstSubMenu = menu.subMenus[0];

                return (
                  <li key={menu.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (firstSubMenu) {
                          onSelect(menu.id, firstSubMenu.id);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      aria-expanded={showSubMenus}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-9 flex-none items-center justify-center rounded-lg text-[10px] font-black ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-500 group-hover:text-slate-300"
                        }`}
                      >
                        {menuIcons[menu.id]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">
                          {menu.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-slate-600">
                          {String(index + 1).padStart(2, "0")} · {menu.subMenus.length} topics
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-xs text-slate-600 transition-transform ${
                          showSubMenus ? "rotate-90" : ""
                        }`}
                      >
                        ›
                      </span>
                    </button>

                    {showSubMenus && (
                      <ul className="ml-7 mt-1 space-y-0.5 border-l border-slate-800 pl-4">
                        {menu.subMenus.map((subMenu) => {
                          const isSubMenuActive =
                            menu.id === currentPage &&
                            subMenu.id === currentSubMenu;

                          return (
                            <li key={subMenu.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  onSelect(menu.id, subMenu.id);
                                  setIsMobileMenuOpen(false);
                                }}
                                aria-current={
                                  isSubMenuActive ? "page" : undefined
                                }
                                className={`relative w-full rounded-lg px-3 py-2 text-left text-xs leading-5 transition ${
                                  isSubMenuActive
                                    ? "bg-blue-500/10 font-bold text-blue-300"
                                    : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"
                                }`}
                              >
                                {isSubMenuActive && (
                                  <span className="absolute -left-[17px] top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-400" />
                                )}
                                {subMenu.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-500">
              일치하는 학습 주제가 없습니다.
            </p>
          )}
        </nav>

        <footer className="hidden border-t border-slate-800 px-6 py-4 text-[11px] leading-5 text-slate-600 md:block">
          MySQL · PostgreSQL · Oracle 등 DBMS별 문법 차이는 공식 문서를 함께
          확인하세요.
        </footer>
      </div>
    </aside>
  );
}

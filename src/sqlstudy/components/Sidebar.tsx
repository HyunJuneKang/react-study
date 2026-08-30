export type PageType =
  "database" | "join" | "execution-order" | "where-having" | "interview";

type SidebarProps = {
  currentPage: PageType;
  onChangePage: (page: PageType) => void;
};

const menus: { id: PageType; label: string }[] = [
  { id: "database", label: "데이터베이스 기본 구조" },
  { id: "join", label: "JOIN" },
  { id: "execution-order", label: "SQL 실행 순서" },
  { id: "where-having", label: "WHERE vs HAVING" },
  { id: "interview", label: "면접 문제" },
];

export default function Sidebar({ currentPage, onChangePage }: SidebarProps) {
  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-white md:sticky md:top-0 md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r">
      <header className="border-b border-slate-800 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
          Interactive Study
        </p>

        <h1 className="mt-2 text-2xl font-extrabold">SQL Study</h1>

        <p className="mt-2 text-sm text-slate-400">개념 학습과 면접 연습</p>
      </header>

      <nav className="flex gap-2 overflow-x-auto p-4 md:block md:space-y-2">
        {menus.map((menu, index) => {
          const isActive = currentPage === menu.id;

          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => onChangePage(menu.id)}
              className={`flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition md:w-full ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {index + 1}
              </span>

              <span>{menu.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

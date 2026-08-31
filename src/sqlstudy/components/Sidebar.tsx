import { menus } from "../data/menus";
import type { PageType } from "../data/menus";
type SidebarProps = {
  currentPage: PageType;
  currentSubMenu: string;
  onChangePage: (page: PageType) => void;
  onChangeSubMenu: (subMenuId: string) => void;
};

export default function Sidebar({
  currentPage,
  currentSubMenu,
  onChangePage,
  onChangeSubMenu,
}: SidebarProps) {
  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-white md:sticky md:top-0 md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r">
      <header className="border-b border-slate-800 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
          Interactive Study
        </p>

        <h1 className="mt-2 text-2xl font-extrabold">SQL Study</h1>

        <p className="mt-2 text-sm text-slate-400">개념 학습과 면접 연습</p>
      </header>

      <nav className="overflow-x-auto p-4 md:max-h-[calc(100vh-145px)] md:overflow-y-auto">
        <ul className="flex gap-2 md:block md:space-y-2">
          {menus.map((menu, index) => {
            const isActive = currentPage === menu.id;

            return (
              <li key={menu.id} className="min-w-max md:w-full">
                {/* 대메뉴 */}
                <button
                  type="button"
                  onClick={() => onChangePage(menu.id)}
                  className={`flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition md:w-full ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span>{menu.label}</span>
                </button>

                {/* 선택한 대메뉴의 소메뉴 */}
                {isActive && (
                  <ul className="mt-2 space-y-1 border-l border-slate-700 pl-4">
                    {menu.subMenus.map((subMenu) => {
                      const isSubMenuActive = currentSubMenu === subMenu.id;

                      return (
                        <li key={subMenu.id}>
                          <button
                            type="button"
                            onClick={() => onChangeSubMenu(subMenu.id)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                              isSubMenuActive
                                ? "bg-slate-800 font-bold text-blue-400"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
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
      </nav>
    </aside>
  );
}

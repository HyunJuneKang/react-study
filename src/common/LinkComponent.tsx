import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import vite from "@/assets/vite.svg";
/* ===== Sidebar ====  public폴더의 이미지는 경로 직접사용(그대로배포), 
        src폴더의 이미지는 import하여사용(build시 번들링됨)  */

export default function LinkComponent() {
  return (
    <aside className="w-72 shrink-0 bg-slate-800 text-white flex flex-col p-4">
      <div className="flex items-center gap-2 mb-6">
        {/* public/images */}
        <img src="images/chat.png" alt="chat" className="w-8 h-8 rounded" />
        <img src={logo} alt="logo" className="w-8 h-8 rounded" />
        <img src={vite} alt="vite" className="w-8 h-8 rounded" />
        <span className="text-lg font-bold">React Lab</span>
      </div>
      <nav className="flex flex-col gap-2 text-sm">
        <Link to="/" className="sidebar-link">
          Home
        </Link>
        <Link to="/board-mock" className="sidebar-link">
          board(mock)
        </Link>
        <Link to="/todo" className="sidebar-link">
          todo(props)
        </Link>
        <Link to="/board" className="sidebar-link">
          board(router)
        </Link>
        <Link to="/diary" className="sidebar-link">
          감정 일기장
        </Link>

        <Link to="/diary/new" className="sidebar-link">
          새 일기 작성
        </Link>
      </nav>
      <div className="mt-auto text-xs text-gray-400">CSR / Router 실습</div>
    </aside>
  );
}

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/day07/section12_02_auth/useAuth";

export const SidebarAuthSection = () => {
  const { isLoggedIn, isInitializing, user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  };

  const maskedToken = token
    ? `${token.slice(0, 10)}${token.length > 10 ? "••••••••" : ""}`
    : null;

  return (
    <div className="mt-auto border-t border-slate-700 pt-4 text-sm">
      {isInitializing ? (
        <div className="px-2 py-2 text-slate-400">로그인 확인 중...</div>
      ) : isLoggedIn ? (
        <div className="space-y-2">
          <div className="rounded bg-slate-700/70 px-3 py-3">
            <p className="font-semibold text-white">{user?.mid}님</p>
            <p className="mt-1 text-xs text-slate-300">
              권한: {user?.mrole}
            </p>
            <p
              className="mt-1 truncate font-mono text-xs text-slate-400"
              title="보안을 위해 토큰 일부만 표시합니다."
            >
              Token: {maskedToken}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded px-2 py-2 text-left text-red-300 hover:bg-slate-700"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="w-full text-left px-2 py-2 rounded
            hover:bg-slate-700 text-green-300"
        >
          로그인
        </button>
      )}
    </div>
  );
};

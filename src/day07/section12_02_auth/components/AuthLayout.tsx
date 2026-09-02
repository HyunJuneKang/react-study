import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/day07/section12_02_auth/useAuth";

export const AuthLayout = () => {
  const { isLoggedIn, isInitializing } = useAuth();
  const location = useLocation();

  // 새로고침 직후 세션 복구(refresh) 완료 전까지는 로그인 여부를 판단하지 않는다.
  if (isInitializing) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

/*
Outlet = 하위 Route가 여기로 렌더링됨
*/

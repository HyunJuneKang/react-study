import TokenService from "@/day07/section12_02_auth/service/TokenService";
import { useCallback, useEffect, useState } from "react";

import ApiService, {
  refreshAccessToken,
} from "@/day07/section12_02_auth/service/ApiService";
import {
  AuthContext,
  type LoginRequest,
} from "@/day07/section12_02_auth/authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(TokenService.getUser());
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const login = async ({ mid, mpassword }: LoginRequest) => {
    const res = await ApiService.post("/api/auth/login", { mid, mpassword });
    const { accessToken, member } = res.data;
    // 기존 token/user 무조건 초기화
    TokenService.clear();
    TokenService.set(accessToken);
    TokenService.setUser(member);
    setToken(accessToken);
    setUser(member);
  };

  const logout = useCallback(async () => {
    try {
      // 서버가 가진 HttpOnly refreshToken 쿠키도 함께 만료시킨다.
      await ApiService.post("/api/auth/logout");
    } finally {
      // 서버 응답 여부와 관계없이 현재 브라우저의 로그인 상태는 정리한다.
      TokenService.clear();
      setToken(null);
      setUser(null);
    }
  }, []);

  // accessToken이 메모리에만 있어 새로고침 시 사라지므로,
  // 마운트 시 refreshToken 쿠키로 세션 복구를 한 번 시도한다.
  useEffect(() => {
    refreshAccessToken()
      .then(setToken)
      .catch(() => {
        TokenService.clear();
        setUser(null);
      })
      .finally(() => setIsInitializing(false));
  }, []);
  //isLoggedIn : user와 token이 모두있으면 true

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user && !!token,
        isInitializing,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

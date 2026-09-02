// api.js
import axios from "axios";
import TokenService from "./TokenService";
import { API_BASE_URL } from "@/common/url";

const BASE_PATH = API_BASE_URL;
const AUTH_FREE_PATHS = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/refresh",
  "/auth/joinProc",
];

// 기본 API 인스턴스
//axios기본사용 : axios({url:"", data:{}, method:"",
//  header:{}}).then().catch()  + 추가
//axiosinstance사용 : ApiService.get(url, data)
const ApiService = axios.create({
  baseURL: BASE_PATH,
  timeout: 10000,
  // 로그인/로그아웃/일반 요청 모두 refreshToken HttpOnly 쿠키를 주고받는다.
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ── 요청 인터셉터 ──

ApiService.interceptors.request.use((config) => {
  //skipAuth에 증록된 요청은 인증 불필요, Token불필요
  const token = TokenService.get();
  //토큰있고 skipAuth가 아니면 반드시 Authorization을 header에 추가
  if (token && !AUTH_FREE_PATHS.some((path) => config.url?.includes(path))) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //토큰이 없음, skipAuth의 요청이면 Authorization가 불필요하다.
  return config;
});
// ── 응답 인터셉터 ──
/*
refreshToken은 클라이언트에 없음, accessToken은 메모리에만 존재(새로고침 시 소실).
서버가 HttpOnly 쿠키로 들고 있는 refreshToken은 withCredentials: true를 줘야 요청에
  실려간다.
새로고침 직후 또는 401 발생 시 /refresh를 호출하면 서버가 쿠키 기반으로 새 accessToken을 발급.
*/
// AuthProvider의 새로고침 복구, 응답 인터셉터의 401 재시도가 공통으로 사용
export const refreshAccessToken = async (): Promise<string> => {
  const refreshResponse = await axios.post(
    `${API_BASE_URL}/api/auth/refresh`,
    null,
    {
      withCredentials: true,
    },
  );

  const newAccessToken = refreshResponse.data.accessToken;
  if (!newAccessToken) throw new Error("Refresh failed: no access token");

  TokenService.set(newAccessToken);
  return newAccessToken;
};

// 응답 인터셉터: accessToken 만료 시 refresh 요청
ApiService.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 401 발생 + 아직 재시도 안함
    const isAuthRequest = AUTH_FREE_PATHS.some((path) =>
      originalRequest?.url?.includes(path),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        // 원래 요청 헤더 갱신 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiService(originalRequest);
      } catch (refreshError) {
        // refresh 실패 → 로그아웃 처리
        TokenService.clear();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    // accessToken 만료, 재시도오류시 거절
    return Promise.reject(error);
  },
);

export default ApiService;

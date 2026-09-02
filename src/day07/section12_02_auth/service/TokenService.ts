const USER_KEY: string = "loginMember";

// 로그인 후 화면에 필요한 사용자 정보만 담는다 (비밀번호는 절대 포함하지 않음).
export interface Member {
  mid: string;
  mrole: string;
}

// accessToken은 XSS로 인한 탈취/영속 위험을 줄이기 위해 localStorage 대신 메모리에만 보관한다.
// 새로고침 시 사라지므로, 복구는 서버 HttpOnly 쿠키 기반 /api/auth/refresh 호출로 처리한다.
let accessToken: string | null = null;

const TokenService = {
  get: (): string | null => accessToken,
  set: (token: string) => {
    if (token) {
      accessToken = token;
    }
  },
  clear: () => {
    accessToken = null;
    localStorage.removeItem(USER_KEY);
  },
  getUser: (): Member | null => {
    const u = localStorage.getItem(USER_KEY);
    try {
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },
  // 서버 응답에 mpassword 등 민감 필드가 섞여 와도 localStorage에는 절대 남지 않도록,
  // 허용된 필드만 명시적으로 골라서 저장한다.
  setUser: ({ mid, mrole }: Member) =>
    localStorage.setItem(USER_KEY, JSON.stringify({ mid, mrole })),
};

export default TokenService;

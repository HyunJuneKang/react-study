import type { Member } from "@/day07/section12_02_auth/service/TokenService";
import { createContext } from "react";

export type LoginRequest = {
  mid: string;
  mpassword: string;
};

type AuthContextType = {
  user: Member | null;
  token: string | null;
  isLoggedIn: boolean;
  isInitializing: boolean;
  login: (user: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};

//Component에서 export하지않도록 한다.
export const AuthContext = createContext<AuthContextType | null>(null);

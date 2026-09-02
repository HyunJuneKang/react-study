import { useContext } from "react";
import { AuthContext } from "@/day07/section12_02_auth/authContext";

//Hook(함수)=>AuthContext를 Provider하위에서 아무때나 사용하기위해 만듦
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

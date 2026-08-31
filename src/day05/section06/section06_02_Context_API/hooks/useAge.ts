import { useContext } from "react";
import { AgeContext } from "../contexts/AgeContext";

/* 4. 커스텀 훅 */
export function useAge() {
  const context = useContext(AgeContext);
  if (!context) {
    throw new Error("useAge는 AgeProvider 안에서만 사용해야 합니다.");
  }
  return context;
}

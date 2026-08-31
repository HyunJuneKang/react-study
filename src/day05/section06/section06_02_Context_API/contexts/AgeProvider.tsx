import { useState, type ReactNode } from "react";
import { AgeContext, type AgeContextType } from "./AgeContext";

//ReactNode는 단순 문자가 아니라 React의 Component라는 의미
type AgeProviderProps = {
  children: ReactNode;
};

export function AgeProvider({ children }: AgeProviderProps) {
  const [age, setAge] = useState<number>(20);

  const value: AgeContextType = {
    age,
    setAge,
  };
  return <AgeContext.Provider value={value}>{children}</AgeContext.Provider>;
}

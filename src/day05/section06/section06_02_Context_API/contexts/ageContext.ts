import { createContext } from "react";

export type AgeContextType = {
  age: number;
  setAge: (age: number) => void;
};

//JSX, TSX 태그로 사용되어야 하므로 대문자
export const AgeContext = createContext<AgeContextType | null>(null);

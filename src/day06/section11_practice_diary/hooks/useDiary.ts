import { useContext } from "react";
import { DiaryStateContext } from "@/day06/section11_practice_diary/contexts/DiaryContext";

export const useDiary = (id: string | undefined) => {
  const data = useContext(DiaryStateContext);

  if (!id) return undefined;

  return data.find((item) => String(item.id) === id);
};

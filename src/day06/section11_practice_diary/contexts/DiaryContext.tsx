import { createContext } from "react";
import type { Diary } from "@/day06/section11_practice_diary/types/diary";

export const DiaryStateContext = createContext<Diary[]>([]);

type DiaryDispatchContextType = {
  onCreate: (date: Date, content: string, emotionId: number) => void;

  onUpdate: (
    targetId: number,
    date: Date,
    content: string,
    emotionId: number,
  ) => void;

  onDelete: (targetId: number) => void;
};
export const DiaryDispatchContext =
  createContext<DiaryDispatchContextType | null>(null);

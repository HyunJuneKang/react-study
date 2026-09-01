import { createContext } from "react";

export type DiaryData = {
  id: number;
  date: number;
  content: string;
  emotionId: number;
};

export const DiaryStateContext = createContext<DiaryData[]>([]);

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

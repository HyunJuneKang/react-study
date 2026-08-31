import type { Todo } from "../types/todo";

export const initToDo: Todo = {
  id: 0,
  isChecked: false,
  context: "",
  time: "",
  priority: "중",
};

export const mockData: Todo[] = [
  {
    id: 1,
    isChecked: false,
    context: "React 공부하기",
    time: "2025.11.26",
    priority: "상",
  },
  {
    id: 2,
    isChecked: false,
    context: "빨래 널기",
    time: "2025.11.26",
    priority: "중",
  },
  {
    id: 3,
    isChecked: false,
    context: "노래 연습하기",
    time: "2025.11.26",
    priority: "하",
  },
];

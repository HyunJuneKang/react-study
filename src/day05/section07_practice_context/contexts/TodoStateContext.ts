import { createContext, useContext } from "react";
import type { ChangeEvent } from "react";
import type { Todo } from "../types/todo";

export type TodoStateContextType = {
  toDoData: Todo;
  todoList: Todo[];
  changeTodo: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  submitTodo: () => void;
  updateTodo: (id: number, context: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  setKeyWord: (keyword: string) => void;
};

export const TodoStateContext = createContext<TodoStateContextType | null>(
  null,
);

export function useTodoState() {
  const context = useContext(TodoStateContext);

  if (context === null) {
    throw new Error(
      "useTodoState는 TodoStateContext.Provider 안에서 사용해야 합니다.",
    );
  }

  return context;
}

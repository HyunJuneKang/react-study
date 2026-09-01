import { create } from "zustand";
import { mockData } from "../data/mockData";

export type TodoPriority = "상" | "중" | "하";

export type Todo = {
  id: number;
  isChecked: boolean;
  context: string;
  time: string;
  priority: TodoPriority;
};

interface TodoStore {
  // 상태
  todo: Todo[];
  idRef: number;

  // 액션
  onCreate: () => void;

  onUpdate: (
    targetId: number,
    colname: "isChecked" | "context",
    value?: string,
  ) => void;

  onDelete: (targetId: number) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => {
  console.log("========create========", set, get);

  return {
    todo: mockData,
    idRef: 3,

    onCreate: () => {
      set((state) => ({
        todo: [
          ...state.todo,
          {
            id: state.idRef + 1,
            context: "",
            isChecked: false,
            time: String(new Date().getTime()),
            priority: "중",
          },
        ],

        idRef: state.idRef + 1,
      }));
    },

    onUpdate: (targetId, colname, value) => {
      set((state) => ({
        todo: state.todo.map((item) => {
          if (item.id !== targetId) {
            return item;
          }

          if (colname === "isChecked") {
            return {
              ...item,
              isChecked: !item.isChecked,
            };
          }

          if (colname === "context") {
            return {
              ...item,
              context: value ?? "",
            };
          }

          return item;
        }),
      }));
    },

    onDelete: (targetId) => {
      console.log("-----onDelete function-----");

      set((state) => ({
        todo: state.todo.filter((item) => item.id !== targetId),
      }));
    },
  };
});

export default useTodoStore;

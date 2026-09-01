export type TodoPriority = "상" | "중" | "하";

export type Todo = {
  id: number;
  isChecked: boolean;
  context: string;
  time: string;
  priority: TodoPriority;
};

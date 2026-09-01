import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import { useEffect, useMemo, useState } from "react";
import { initToDo, mockData } from "../data/mockData";
import type { Todo, TodoPriority } from "../types/todo";
import { TodoStateContext } from "../contexts/TodoStateContext";

const priorityOrder: Record<TodoPriority, number> = {
  상: 0,
  중: 1,
  하: 2,
};

export default function TodoListAppZun() {
  const [toDoData, setToDoData] = useState<Todo>(initToDo);
  const [todoList, setToDoList] = useState<Todo[]>(mockData);
  const [keyWord, setKeyWord] = useState("");
  const [debouncedKeyWord, setDebouncedKeyWord] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedKeyWord(keyWord);
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [keyWord]);

  const filteredTodoList = useMemo(() => {
    const normalizedKeyWord = debouncedKeyWord.trim().toLowerCase();

    return todoList
      .filter((todo) =>
        todo.context.toLowerCase().includes(normalizedKeyWord),
      )
      .sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
  }, [debouncedKeyWord, todoList]);

  const changeTodo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setToDoData((prev) => ({ ...prev, [name]: value }));
  };

  const submitTodo = (): void => {
    if (!toDoData.context) return;
    const newTodo: Todo = {
      ...toDoData,
      id: Date.now(),
      context: toDoData.context.trim(),
      time: new Date().toLocaleDateString("ko-KR"),
    };

    setToDoList((previousList) => [...previousList, newTodo]);
    setToDoData(initToDo);
  };

  const deleteTodo = (id: number): void => {
    setToDoList((previousList) =>
      previousList.filter((todo) => todo.id !== id),
    );
  };

  const updateTodo = (id: number, context: string): void => {
    const trimmedContext = context.trim();
    if (!trimmedContext) return;

    setToDoList((previousList) =>
      previousList.map((todo) =>
        todo.id === id ? { ...todo, context: trimmedContext } : todo,
      ),
    );
  };

  const toggleTodo = (id: number): void => {
    setToDoList((previousList) =>
      previousList.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo,
      ),
    );
  };

  return (
    <TodoStateContext.Provider
      value={{
        toDoData,
        todoList: filteredTodoList,
        changeTodo,
        submitTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        setKeyWord,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4 py-10 text-slate-800 sm:px-6">
        <main className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-slate-300/40 backdrop-blur">
          <Header />

          <div className="space-y-8 p-6 sm:p-8">
            <TodoEditor />
            <TodoList />
          </div>
        </main>
      </div>
    </TodoStateContext.Provider>
  );
}

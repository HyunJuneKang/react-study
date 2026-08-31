import Header from "./Header";
import TodoEditor from "./TodoEditor";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { initToDo, mockData } from "../data/mockData";
import type { Todo, TodoPriority } from "../types/todo";

const priorityOrder: Record<TodoPriority, number> = {
  상: 0,
  중: 1,
  하: 2,
};

export default function TodoListApp() {
  const [toDoData, setToDoData] = useState<Todo>(initToDo);
  const [todoList, setToDoList] = useState<Todo[]>(mockData);
  const [keyWord, setKeyWord] = useState("");
  const [delayedToDoList, setDelayedToDoList] = useState<Todo[]>(mockData);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const filteredTodoList = todoList.filter((todo) =>
        todo.context.toLowerCase().includes(keyWord.trim().toLowerCase()),
      );
      const sortedTodoList = [...filteredTodoList].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
      setDelayedToDoList(sortedTodoList);
    }, 500);
    return () => {
      clearInterval(timeOutId);
    };
  }, [keyWord, todoList]);

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
    const newTodoList = todoList.filter((e) => e.id != id);
    setToDoList(newTodoList);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4 py-10 text-slate-800 sm:px-6">
      <main className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-2xl shadow-slate-300/40 backdrop-blur">
        <Header />

        <div className="space-y-8 p-6 sm:p-8">
          <TodoEditor
            toDoData={toDoData}
            changeTodo={changeTodo}
            submitTodo={submitTodo}
          />
          <TodoList
            todoList={delayedToDoList}
            deleteTodo={deleteTodo}
            setKeyWord={setKeyWord}
          />
        </div>
      </main>
    </div>
  );
}

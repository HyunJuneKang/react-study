import { useTodoState } from "../contexts/TodoStateContext";
import TodoItem from "./TodoItem";

const priorityStyles = {
  상: "border-rose-200 bg-rose-50 text-rose-700",
  중: "border-amber-200 bg-amber-50 text-amber-700",
  하: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

export default function TodoList() {
  const { todoList, setKeyWord } = useTodoState();
  return (
    <section className="border-t border-slate-200 pt-7">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-lg">
            🌱
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">Todo List</h2>
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
            {todoList.length}
          </span>
        </div>
        <input
          type="search"
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setKeyWord(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:w-64"
        />
      </div>

      <div className="space-y-3">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            priorityClassName={priorityStyles[todo.priority]}
          />
        ))}
      </div>
    </section>
  );
}

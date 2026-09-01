import type { Todo } from "../types/todo";

const priorityStyles = {
  상: "border-rose-200 bg-rose-50 text-rose-700",
  중: "border-amber-200 bg-amber-50 text-amber-700",
  하: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

type TodoListProps = {
  todoList: Todo[];
  deleteTodo: (id: number) => void;
  setKeyWord: (keyword: string) => void;
};

export default function TodoList({
  todoList,
  deleteTodo,
  setKeyWord,
}: TodoListProps) {
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
        {todoList.map((data) => (
          <article
            key={data.id}
            className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <input
              type="checkbox"
              className="h-5 w-5 flex-none cursor-pointer rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
            />
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`flex-none rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${priorityStyles[data.priority]}`}
                >
                  {data.priority}
                </span>
                <p className="truncate text-sm font-bold text-slate-800">
                  {data.context}
                </p>
              </div>
              <time className="mt-1 block text-xs font-medium text-slate-400">
                {data.time}
              </time>
            </div>
            <button
              type="button"
              className="flex-none rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-100"
              onClick={() => deleteTodo(data.id)}
            >
              삭제
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

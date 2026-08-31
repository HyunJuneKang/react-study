import type { ChangeEvent } from "react";
import type { Todo } from "../types/todo";

type TodoEditorProps = {
  toDoData: Todo;
  changeTodo: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  submitTodo: () => void;
};

export default function TodoEditor({
  toDoData,
  changeTodo,
  submitTodo,
}: TodoEditorProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden="true" className="text-lg">
          ✏️
        </span>
        <h2 className="text-lg font-extrabold text-slate-900">
          새로운 ToDo 작성하기
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_100px_auto]">
        <input
          type="text"
          name="context"
          placeholder="새로운 ToDo..."
          value={toDoData.context}
          onChange={changeTodo}
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
        <select
          name="priority"
          value={toDoData.priority}
          onChange={changeTodo}
          aria-label="우선순위"
          className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-bold text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="상">상</option>
          <option value="중">중</option>
          <option value="하">하</option>
        </select>
        <button
          type="button"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
          onClick={submitTodo}
        >
          추가
        </button>
      </div>
    </section>
  );
}

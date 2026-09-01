import { useState } from "react";
import { useTodoState } from "../contexts/TodoStateContext";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  priorityClassName: string;
};

export default function TodoItem({
  todo,
  priorityClassName,
}: TodoItemProps) {
  const { updateTodo, deleteTodo, toggleTodo } = useTodoState();
  const [isEditing, setIsEditing] = useState(false);
  const [editingContext, setEditingContext] = useState(todo.context);

  const startEditing = () => {
    setEditingContext(todo.context);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditingContext(todo.context);
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (!editingContext.trim()) return;
    updateTodo(todo.id, editingContext);
    setIsEditing(false);
  };

  return (
    <article
      onClick={isEditing ? undefined : startEditing}
      className={`group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md ${
        isEditing ? "" : "cursor-pointer hover:-translate-y-0.5"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.isChecked}
        onClick={(event) => event.stopPropagation()}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`${todo.context} 완료 여부`}
        className="h-5 w-5 flex-none cursor-pointer rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
      />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`flex-none rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${priorityClassName}`}
          >
            {todo.priority}
          </span>
          {isEditing ? (
            <input
              autoFocus
              value={editingContext}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => setEditingContext(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveEditing();
                if (event.key === "Escape") cancelEditing();
              }}
              aria-label="Todo 내용 수정"
              className="min-w-0 flex-1 rounded-lg border border-blue-300 px-3 py-1.5 text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-100"
            />
          ) : (
            <p
              className={`truncate text-sm font-bold ${
                todo.isChecked
                  ? "text-slate-400 line-through"
                  : "text-slate-800"
              }`}
            >
              {todo.context}
            </p>
          )}
        </div>
        <time className="mt-1 block text-xs font-medium text-slate-400">
          {todo.time}
        </time>
      </div>
      {isEditing ? (
        <div className="flex flex-none gap-1" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            onClick={saveEditing}
            disabled={!editingContext.trim()}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            저장
          </button>
          <button
            type="button"
            onClick={cancelEditing}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            취소
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex-none rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-100"
          onClick={(event) => {
            event.stopPropagation();
            deleteTodo(todo.id);
          }}
        >
          삭제
        </button>
      )}
    </article>
  );
}

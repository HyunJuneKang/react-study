type TopicToolbarProps = {
  category: string;
  title: string;
  isCompleted: boolean;
  onToggleCompleted: () => void;
};

export default function TopicToolbar({
  category,
  title,
  isCompleted,
  onToggleCompleted,
}: TopicToolbarProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-2 text-xs font-bold">
        <span className="text-blue-600">SQL Study</span>
        <span aria-hidden="true" className="text-slate-300">
          /
        </span>
        <span className="text-slate-500">{category}</span>
        <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
          /
        </span>
        <span className="hidden truncate text-slate-700 sm:inline">{title}</span>
      </div>

      <button
        type="button"
        onClick={onToggleCompleted}
        aria-pressed={isCompleted}
        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition ${
          isCompleted
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        }`}
      >
        <span aria-hidden="true">{isCompleted ? "✓" : "○"}</span>
        {isCompleted ? "학습 완료" : "완료로 표시"}
      </button>
    </div>
  );
}

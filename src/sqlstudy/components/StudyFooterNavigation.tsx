type NavigationTarget = {
  category: string;
  label: string;
};

type StudyFooterNavigationProps = {
  currentIndex: number;
  totalCount: number;
  previous?: NavigationTarget;
  next?: NavigationTarget;
  onPrevious: () => void;
  onNext: () => void;
};

export default function StudyFooterNavigation({
  currentIndex,
  totalCount,
  previous,
  next,
  onPrevious,
  onNext,
}: StudyFooterNavigationProps) {
  return (
    <nav
      aria-label="이전 및 다음 학습 주제"
      className="mt-10 border-t border-slate-200 pt-6"
    >
      <div className="mb-4 text-center text-xs font-bold text-slate-400">
        {currentIndex + 1} / {totalCount} topics
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <button
            type="button"
            onClick={onPrevious}
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="text-xs font-bold text-slate-400">← 이전 학습</span>
            <span className="mt-2 block text-[11px] font-semibold text-blue-600">
              {previous.category}
            </span>
            <span className="mt-0.5 block font-extrabold text-slate-800 group-hover:text-blue-700">
              {previous.label}
            </span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next && (
          <button
            type="button"
            onClick={onNext}
            className="group rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="text-xs font-bold text-slate-400">다음 학습 →</span>
            <span className="mt-2 block text-[11px] font-semibold text-blue-600">
              {next.category}
            </span>
            <span className="mt-0.5 block font-extrabold text-slate-800 group-hover:text-blue-700">
              {next.label}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}

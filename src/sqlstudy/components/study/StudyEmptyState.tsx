type StudyEmptyStateProps = {
  title?: string;
  description?: string;
};

export default function StudyEmptyState({
  title = "학습 콘텐츠를 준비하고 있어요",
  description = "다른 소주제를 선택하거나 잠시 후 다시 확인해주세요.",
}: StudyEmptyStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-12 sm:px-8">
      <section
        className="w-full max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12"
        aria-labelledby="empty-study-title"
      >
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-black text-blue-600"
          aria-hidden="true"
        >
          SQL
        </span>
        <h2
          id="empty-study-title"
          className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900"
        >
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
          {description}
        </p>
      </section>
    </div>
  );
}

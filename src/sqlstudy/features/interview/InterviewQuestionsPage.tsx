import { useState } from "react";
import {
  interviewCategories,
  interviewCategoryIds,
  isInterviewCategoryId,
  type InterviewDifficulty,
} from "./interviewQuestionData";

type InterviewQuestionsPageProps = {
  subMenuId: string;
};

const difficultyStyles: Record<InterviewDifficulty, string> = {
  기초: "border-emerald-200 bg-emerald-50 text-emerald-700",
  중급: "border-amber-200 bg-amber-50 text-amber-700",
  심화: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function InterviewQuestionsPage({
  subMenuId,
}: InterviewQuestionsPageProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openHintIds, setOpenHintIds] = useState<Set<string>>(() => new Set());
  const [openAnswerIds, setOpenAnswerIds] = useState<Set<string>>(
    () => new Set(),
  );

  if (!isInterviewCategoryId(subMenuId)) {
    return (
      <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
        <section className="mx-auto max-w-3xl rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold text-amber-700">면접 문제 안내</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900">
            지원하지 않는 면접 문제 메뉴입니다.
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            InterviewQuestionsPage에 아래 소메뉴 ID 중 하나를 전달해주세요.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {interviewCategoryIds.map((categoryId) => (
              <li
                key={categoryId}
                className="rounded-xl bg-slate-100 px-3 py-2 font-mono"
              >
                {categoryId}
              </li>
            ))}
          </ul>
        </section>
      </section>
    );
  }

  const category = interviewCategories[subMenuId];
  const normalizedKeyword = searchKeyword.trim().toLowerCase();
  const filteredQuestions = category.questions.filter((question) => {
    if (!normalizedKeyword) return true;

    const searchTarget = [
      question.question,
      question.hint,
      ...question.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return searchTarget.includes(normalizedKeyword);
  });

  const revealedAnswerCount = category.questions.filter((question) =>
    openAnswerIds.has(question.id),
  ).length;
  const allVisibleAnswersAreOpen =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((question) => openAnswerIds.has(question.id));

  const toggleHint = (questionId: string) => {
    setOpenHintIds((previousIds) => {
      const nextIds = new Set(previousIds);

      if (nextIds.has(questionId)) {
        nextIds.delete(questionId);
      } else {
        nextIds.add(questionId);
      }

      return nextIds;
    });
  };

  const toggleAnswer = (questionId: string) => {
    setOpenAnswerIds((previousIds) => {
      const nextIds = new Set(previousIds);

      if (nextIds.has(questionId)) {
        nextIds.delete(questionId);
      } else {
        nextIds.add(questionId);
      }

      return nextIds;
    });
  };

  const toggleAllVisibleAnswers = () => {
    setOpenAnswerIds((previousIds) => {
      const nextIds = new Set(previousIds);

      filteredQuestions.forEach((question) => {
        if (allVisibleAnswersAreOpen) {
          nextIds.delete(question.id);
        } else {
          nextIds.add(question.id);
        }
      });

      return nextIds;
    });
  };

  const resetPractice = () => {
    setOpenHintIds(new Set());
    setOpenAnswerIds(new Set());
    setSearchKeyword("");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/40">
          <div className="relative px-6 py-8 sm:px-9 sm:py-10">
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">
                SQL Interview Lab
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {category.focus.map((focus) => (
                  <span
                    key={focus}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid border-t border-slate-800 bg-slate-900/80 sm:grid-cols-3">
            <div className="border-b border-slate-800 px-6 py-4 sm:border-b-0 sm:border-r">
              <p className="text-xs font-bold text-slate-400">전체 문제</p>
              <p className="mt-1 text-2xl font-black">
                {category.questions.length}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  개
                </span>
              </p>
            </div>
            <div className="border-b border-slate-800 px-6 py-4 sm:border-b-0 sm:border-r">
              <p className="text-xs font-bold text-slate-400">확인한 답변</p>
              <p className="mt-1 text-2xl font-black text-blue-300">
                {revealedAnswerCount}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  / {category.questions.length}
                </span>
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-bold text-slate-400">연습 방식</p>
              <p className="mt-1 text-sm font-bold text-slate-100">
                답변 후 모범 답안 확인
              </p>
            </div>
          </div>
        </header>

        <section
          aria-label="면접 문제 검색과 일괄 제어"
          className="sticky top-0 z-10 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur sm:flex sm:items-center sm:gap-3"
        >
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">면접 문제 검색</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              ⌕
            </span>
            <input
              type="search"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="질문 또는 키워드 검색"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <div className="mt-3 flex gap-2 sm:mt-0">
            <button
              type="button"
              onClick={toggleAllVisibleAnswers}
              disabled={filteredQuestions.length === 0}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 sm:flex-none"
            >
              {allVisibleAnswersAreOpen ? "답변 모두 닫기" : "답변 모두 보기"}
            </button>
            <button
              type="button"
              onClick={resetPractice}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              초기화
            </button>
          </div>
        </section>

        <div
          aria-live="polite"
          className="mb-3 mt-6 flex items-center justify-between gap-3 text-sm"
        >
          <p className="font-bold text-slate-700">
            {normalizedKeyword
              ? `검색 결과 ${filteredQuestions.length}개`
              : `총 ${filteredQuestions.length}개 문제`}
          </p>
          <p className="hidden text-slate-500 sm:block">
            먼저 30초 동안 말로 답해보세요.
          </p>
        </div>

        {filteredQuestions.length > 0 ? (
          <ol className="space-y-4">
            {filteredQuestions.map((question, index) => {
              const isHintOpen = openHintIds.has(question.id);
              const isAnswerOpen = openAnswerIds.has(question.id);
              const hintRegionId = `${question.id}-hint`;
              const answerRegionId = `${question.id}-answer`;

              return (
                <li
                  key={question.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <article aria-labelledby={`${question.id}-title`}>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${difficultyStyles[question.difficulty]}`}
                            >
                              {question.difficulty}
                            </span>
                            {question.sourceNumber ? (
                              <span className="text-xs font-semibold text-slate-400">
                                원문 #{question.sourceNumber}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-blue-500">
                                실전 추가 문제
                              </span>
                            )}
                          </div>

                          <h2
                            id={`${question.id}-title`}
                            className="mt-3 text-lg font-black leading-7 text-slate-900 sm:text-xl"
                          >
                            {question.question}
                          </h2>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {question.keywords.map((keyword) => (
                              <span
                                key={keyword}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
                              >
                                #{keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          aria-expanded={isHintOpen}
                          aria-controls={hintRegionId}
                          onClick={() => toggleHint(question.id)}
                          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
                        >
                          {isHintOpen ? "힌트 닫기" : "힌트 보기"}
                        </button>
                        <button
                          type="button"
                          aria-expanded={isAnswerOpen}
                          aria-controls={answerRegionId}
                          onClick={() => toggleAnswer(question.id)}
                          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          {isAnswerOpen ? "모범 답안 닫기" : "모범 답안 보기"}
                        </button>
                      </div>
                    </div>

                    {isHintOpen && (
                      <div
                        id={hintRegionId}
                        className="border-t border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-950 sm:px-6"
                      >
                        <p className="font-black">생각의 실마리</p>
                        <p className="mt-1">{question.hint}</p>
                      </div>
                    )}

                    {isAnswerOpen && (
                      <div
                        id={answerRegionId}
                        className="border-t border-blue-100 bg-blue-50/70 px-5 py-5 sm:px-6"
                      >
                        <p className="text-sm font-black text-blue-800">
                          모범 답안
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                          {question.answer.map((answerPoint) => (
                            <li key={answerPoint} className="flex gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                              />
                              <span>{answerPoint}</span>
                            </li>
                          ))}
                        </ul>

                        {question.code && (
                          <div className="mt-5 overflow-hidden rounded-xl bg-slate-950 shadow-lg">
                            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                              <span className="ml-1 text-xs font-semibold text-slate-400">
                                answer.sql
                              </span>
                            </div>
                            <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-100">
                              <code>{question.code}</code>
                            </pre>
                          </div>
                        )}

                        {question.followUp && (
                          <div className="mt-4 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-950">
                            <span className="font-black">꼬리 질문 · </span>
                            {question.followUp}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-4xl" aria-hidden="true">
              ⌕
            </p>
            <h2 className="mt-3 text-lg font-black text-slate-800">
              일치하는 문제가 없습니다.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              더 짧은 키워드로 다시 검색해보세요.
            </p>
            <button
              type="button"
              onClick={() => setSearchKeyword("")}
              className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              검색어 지우기
            </button>
          </section>
        )}

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
          <p className="font-black text-slate-900">공통 쿼리 스키마</p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-200 sm:text-sm">
            <code>{`customers(customer_id, customer_name, city)\norders(order_id, customer_id, ordered_at, amount, status)\nemployees(employee_id, employee_name, department_id, manager_id, salary)\ndepartments(department_id, department_name)`}</code>
          </pre>
        </aside>
      </div>
    </section>
  );
}

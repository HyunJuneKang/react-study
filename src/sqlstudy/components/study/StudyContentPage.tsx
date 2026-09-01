import ContentBlockRenderer from "./ContentBlockRenderer";
import StudyEmptyState from "./StudyEmptyState";
import type { ReactNode } from "react";
import type { StudyContent } from "./types";

type StudyContentPageProps = {
  content?: StudyContent | null;
  fallbackTitle?: string;
  afterContent?: ReactNode;
};

export default function StudyContentPage({
  content,
  fallbackTitle,
  afterContent,
}: StudyContentPageProps) {
  if (!content) {
    return <StudyEmptyState title={fallbackTitle} />;
  }

  const titleId = `study-title-${content.id}`;

  return (
    <article
      className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-10 lg:py-12"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-300/60 sm:px-8 sm:py-10 lg:px-12">
          <div
            className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-400">
              {content.category}
            </p>
            <h1
              id={titleId}
              className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {content.summary}
            </p>

            {content.tags && content.tags.length > 0 && (
              <ul
                className="mt-6 flex flex-wrap gap-2"
                aria-label="핵심 키워드"
              >
                {content.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {content.sections.length === 0 ? (
          <StudyEmptyState
            title="이 주제의 본문을 준비하고 있어요"
            description="제목과 요약은 준비되었지만 세부 학습 내용은 아직 작성 중입니다."
          />
        ) : (
          <div className="mt-8 grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="min-w-0 space-y-6">
              {content.sections.map((section, sectionIndex) => {
                const sectionId = `study-section-${sectionIndex + 1}`;

                return (
                  <section
                    key={section.id ?? `${section.title}-${sectionIndex}`}
                    id={sectionId}
                    className="min-w-0 scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
                    aria-labelledby={`${sectionId}-title`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-md shadow-blue-200"
                        aria-hidden="true"
                      >
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h2
                          id={`${sectionId}-title`}
                          className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
                        >
                          {section.title}
                        </h2>
                        {section.description && (
                          <p className="mt-2 leading-7 text-slate-500">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      {section.blocks.map((block, blockIndex) => (
                        <ContentBlockRenderer
                          key={`${block.type}-${blockIndex}`}
                          block={block}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <nav
              className="order-first rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:order-last lg:sticky lg:top-6"
              aria-label="이 페이지의 목차"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                On this page
              </p>
              <ol className="mt-4 space-y-1.5">
                {content.sections.map((section, index) => (
                  <li key={section.id ?? `${section.title}-${index}`}>
                    <a
                      href={`#study-section-${index + 1}`}
                      className="flex gap-2 rounded-lg px-2.5 py-2 text-sm leading-5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span className="font-bold text-blue-500">
                        {index + 1}.
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {afterContent && <div className="mt-8">{afterContent}</div>}
      </div>
    </article>
  );
}

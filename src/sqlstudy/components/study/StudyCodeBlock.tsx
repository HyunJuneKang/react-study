import { useState } from "react";
import type { CodeBlock } from "./types";

type StudyCodeBlockProps = {
  block: CodeBlock;
};

export default function StudyCodeBlock({ block }: StudyCodeBlockProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopyStatus("copied");

      window.setTimeout(() => {
        setCopyStatus("idle");
      }, 1600);
    } catch {
      setCopyStatus("failed");
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "복사됨"
      : copyStatus === "failed"
        ? "복사 실패"
        : "코드 복사";

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg shadow-slate-200/60">
      <figcaption className="flex min-h-12 items-center justify-between gap-4 border-b border-slate-800 px-4 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="truncate font-mono text-xs font-semibold text-slate-400">
            {block.title ?? `${block.language ?? "sql"} example`}
          </span>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="shrink-0 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-blue-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label={`${block.title ?? "예제"} 코드 복사`}
        >
          {copyLabel}
        </button>
      </figcaption>

      <div className="relative overflow-x-auto">
        <pre className="min-w-max p-5 text-sm leading-7 text-slate-100 sm:p-6">
          <code className="font-mono">{block.code}</code>
        </pre>
      </div>

      <span className="sr-only" aria-live="polite">
        {copyStatus === "copied"
          ? "코드가 클립보드에 복사되었습니다."
          : copyStatus === "failed"
            ? "코드를 복사하지 못했습니다."
            : ""}
      </span>
    </figure>
  );
}

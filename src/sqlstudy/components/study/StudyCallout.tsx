import type { CalloutBlock, CalloutTone } from "./types";

type StudyCalloutProps = {
  block: CalloutBlock;
};

const toneStyles: Record<
  CalloutTone,
  { wrapper: string; icon: string; defaultTitle: string; symbol: string }
> = {
  info: {
    wrapper: "border-blue-200 bg-blue-50 text-blue-950",
    icon: "bg-blue-600 text-white",
    defaultTitle: "알아두기",
    symbol: "i",
  },
  tip: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "bg-emerald-600 text-white",
    defaultTitle: "실무 팁",
    symbol: "✓",
  },
  warning: {
    wrapper: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "bg-amber-500 text-white",
    defaultTitle: "주의",
    symbol: "!",
  },
  danger: {
    wrapper: "border-rose-200 bg-rose-50 text-rose-950",
    icon: "bg-rose-600 text-white",
    defaultTitle: "중요",
    symbol: "!",
  },
};

export default function StudyCallout({ block }: StudyCalloutProps) {
  const tone = block.tone ?? "info";
  const style = toneStyles[tone];

  return (
    <aside
      className={`flex gap-3 rounded-2xl border p-4 sm:gap-4 sm:p-5 ${style.wrapper}`}
      role={tone === "danger" ? "alert" : "note"}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${style.icon}`}
        aria-hidden="true"
      >
        {style.symbol}
      </span>

      <div className="min-w-0">
        <p className="font-extrabold">{block.title ?? style.defaultTitle}</p>
        <p className="mt-1 whitespace-pre-line text-sm leading-6 opacity-85">
          {block.content}
        </p>
      </div>
    </aside>
  );
}

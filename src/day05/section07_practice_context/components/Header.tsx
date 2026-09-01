import { useEffect, useState } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const formattedTime = currentTime.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
        <span aria-hidden="true">📅</span>
        <h2>{formattedDate}</h2>
      </div>
      <time
        dateTime={currentTime.toISOString()}
        className="mt-2 block text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl"
      >
        {formattedTime}
      </time>
      <p className="mt-2 text-sm text-slate-400">
        오늘 할 일을 기록하고 차근차근 완료해 보세요.
      </p>
    </header>
  );
}

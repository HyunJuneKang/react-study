import { useState } from "react";

const pageSize = 20;

export default function PaginationVisualizer() {
  const [page, setPage] = useState(1000);
  const offset = (page - 1) * pageSize;
  const offsetWork = offset + pageSize;
  const seekWork = pageSize;
  const ratio = Math.round(offsetWork / seekWork);

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
        Cost Simulator
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">
        뒤 페이지로 갈수록 무엇이 달라질까?
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        페이지당 20행을 조회한다고 가정한 개념 모델입니다. 실제 비용은 실행
        계획과 인덱스, 데이터 분포에 따라 달라집니다.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-700">
          <label htmlFor="pagination-page-range">이동할 페이지</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="5000"
              value={page}
              onChange={(event) => {
                const nextPage = Number(event.target.value);
                setPage(Math.min(5000, Math.max(1, nextPage || 1)));
              }}
              aria-label="페이지 번호 직접 입력"
              className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-right font-black text-blue-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <span className="text-blue-700">페이지</span>
          </div>
        </div>
        <input
          id="pagination-page-range"
          type="range"
          min="1"
          max="5000"
          step="1"
          value={page}
          onChange={(event) => setPage(Number(event.target.value))}
          className="mt-3 w-full accent-blue-600"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <p className="text-xs font-black uppercase tracking-wider text-rose-600">
            LIMIT / OFFSET
          </p>
          <p className="mt-3 text-3xl font-black text-rose-800">
            {offsetWork.toLocaleString()}
            <span className="ml-1 text-sm">rows</span>
          </p>
          <p className="mt-2 text-xs leading-5 text-rose-700">
            앞의 {offset.toLocaleString()}행을 건너뛴 뒤 20행을 반환하는 개념적인
            작업량입니다.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-600">
            Keyset / Seek
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-800">
            {seekWork}
            <span className="ml-1 text-sm">rows</span>
          </p>
          <p className="mt-2 text-xs leading-5 text-emerald-700">
            마지막으로 본 인덱스 키 이후부터 필요한 20행을 읽는 개념적인
            작업량입니다.
          </p>
        </article>
      </div>

      <div className="mt-4 rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-slate-300">
        이 페이지에서는 Offset 방식이 약
        <strong className="mx-1 text-amber-300">
          {ratio.toLocaleString()}배
        </strong>
        더 많은 행을 지나갑니다.
      </div>
    </section>
  );
}

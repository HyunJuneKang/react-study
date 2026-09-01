import { useState } from "react";

const executionSteps = [
  {
    clause: "FROM · JOIN · ON",
    role: "읽을 테이블을 정하고 결합합니다.",
    question: "어떤 데이터 집합에서 시작할까?",
  },
  {
    clause: "WHERE",
    role: "그룹화 전에 개별 행을 필터링합니다.",
    question: "어떤 행만 남길까?",
  },
  {
    clause: "GROUP BY",
    role: "같은 값을 가진 행을 그룹으로 묶습니다.",
    question: "행을 어떤 기준으로 묶을까?",
  },
  {
    clause: "HAVING",
    role: "집계가 끝난 그룹을 다시 필터링합니다.",
    question: "어떤 그룹만 남길까?",
  },
  {
    clause: "SELECT",
    role: "최종 결과에 표시할 컬럼과 표현식을 계산합니다.",
    question: "무엇을 보여줄까?",
  },
  {
    clause: "DISTINCT",
    role: "SELECT 결과에서 중복 행을 제거합니다.",
    question: "중복 결과를 합칠까?",
  },
  {
    clause: "ORDER BY",
    role: "결과 행의 출력 순서를 정합니다.",
    question: "어떤 순서로 보여줄까?",
  },
  {
    clause: "LIMIT · FETCH",
    role: "정렬된 결과에서 반환할 행 수를 제한합니다.",
    question: "몇 행만 가져올까?",
  },
];

export default function ExecutionOrderLab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedStep = executionSteps[selectedIndex];

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
        Interactive Flow
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">
        논리적 실행 순서 따라가기
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        SQL을 작성하는 순서와 DB가 논리적으로 처리하는 순서는 다릅니다. 각
        단계를 눌러 역할을 확인하세요.
      </p>

      <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {executionSteps.map((step, index) => (
          <li key={step.clause}>
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={selectedIndex === index}
              className={`flex h-full w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                selectedIndex === index
                  ? "border-blue-500 bg-blue-50 text-blue-800 ring-4 ring-blue-100"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-white"
              }`}
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white">
                {index + 1}
              </span>
              <span className="text-xs font-extrabold">{step.clause}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-black">
            STEP {selectedIndex + 1}
          </span>
          <h3 className="font-black text-blue-300">{selectedStep.clause}</h3>
        </div>
        <p className="mt-4 text-lg font-extrabold">{selectedStep.question}</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {selectedStep.role}
        </p>
      </div>
    </section>
  );
}

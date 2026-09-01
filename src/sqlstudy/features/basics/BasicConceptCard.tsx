import { useState } from "react";

type CardType = "DBMS" | "DATABASE" | "SCHEMA" | "TABLE";

const concepts: { id: CardType; label: string; description: string }[] = [
  {
    id: "DBMS",
    label: "DBMS",
    description:
      "데이터베이스를 생성·조회·수정하고 권한, 동시성, 복구까지 관리하는 소프트웨어입니다.",
  },
  {
    id: "DATABASE",
    label: "Database",
    description: "관련 데이터를 목적에 맞게 구조화해 저장한 논리적인 집합입니다.",
  },
  {
    id: "SCHEMA",
    label: "Schema",
    description: "테이블, 컬럼, 관계, 제약조건을 포함한 데이터 구조의 정의입니다.",
  },
  {
    id: "TABLE",
    label: "Table",
    description: "데이터를 행과 열의 형태로 저장하는 관계형 데이터 구조입니다.",
  },
];

const visualStyles: Record<CardType, string> = {
  DBMS: "border-blue-500 bg-blue-50 ring-blue-100",
  DATABASE: "border-violet-500 bg-violet-50 ring-violet-100",
  SCHEMA: "border-amber-500 bg-amber-50 ring-amber-100",
  TABLE: "border-emerald-500 bg-emerald-50 ring-emerald-100",
};

export default function BasicConceptCard() {
  const [selectedConcept, setSelectedConcept] = useState<CardType>("DBMS");
  const selected = concepts.find((concept) => concept.id === selectedConcept)!;

  const isSelected = (concept: CardType) =>
    selectedConcept === concept ? `ring-4 ${visualStyles[concept]}` : "";

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
          Interactive Map
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          데이터베이스 구조 눌러보기
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          버튼을 선택하면 계층에서 해당 개념의 위치와 역할을 확인할 수 있습니다.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {concepts.map((concept) => (
          <button
            key={concept.id}
            type="button"
            onClick={() => setSelectedConcept(concept.id)}
            aria-pressed={selectedConcept === concept.id}
            className={`rounded-xl border px-3 py-2 text-xs font-extrabold transition ${
              selectedConcept === concept.id
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {concept.label}
          </button>
        ))}
      </div>

      <div className={`rounded-2xl border-2 p-4 transition ${isSelected("DBMS")}`}>
        <p className="text-xs font-black text-blue-700">DBMS · MySQL</p>
        <div
          className={`mt-3 rounded-2xl border-2 p-4 transition ${isSelected("DATABASE")}`}
        >
          <p className="text-xs font-black text-violet-700">Database · shop</p>
          <div
            className={`mt-3 rounded-xl border-2 p-4 transition ${isSelected("SCHEMA")}`}
          >
            <p className="text-xs font-black text-amber-700">
              Schema · shop_schema
            </p>
            <div
              className={`mt-3 rounded-lg border-2 p-4 transition ${isSelected("TABLE")}`}
            >
              <p className="text-xs font-black text-emerald-700">
                Table · customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
          {selected.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {selected.description}
        </p>
      </div>
    </section>
  );
}

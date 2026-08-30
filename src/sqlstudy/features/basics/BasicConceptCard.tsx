import { useState } from "react";

type CardType = "DBMS" | "DATABASE" | "SCHEMA" | "TABLE";

const descriptions: Record<CardType, string> = {
  DBMS: "데이터베이스를 생성하고 관리하는 소프트웨어입니다.",
  DATABASE: "관련 데이터를 목적에 맞게 모아둔 집합입니다.",
  SCHEMA: "테이블, 컬럼, 관계, 제약조건 등 데이터 구조의 정의입니다.",
  TABLE: "데이터를 행과 열 형태로 저장하는 구조입니다.",
};

export default function BasicConceptCard() {
  const [cardType, setCardType] = useState<CardType>("DBMS");

  return (
    <div className="space-y-6">
      <div
        className={`cursor-pointer rounded-3xl border-4 p-6 ${
          cardType === "DBMS"
            ? "border-blue-600 bg-blue-100"
            : "border-blue-300 bg-blue-50"
        }`}
        onClick={() => setCardType("DBMS")}
      >
        <h2 className="text-xl font-bold">DBMS: MySQL</h2>

        <div
          className={`mt-4 cursor-pointer rounded-2xl border-4 p-6 ${
            cardType === "DATABASE"
              ? "border-violet-600 bg-violet-100"
              : "border-violet-300 bg-white"
          }`}
          onClick={(event) => {
            event.stopPropagation();
            setCardType("DATABASE");
          }}
        >
          <h3 className="text-lg font-bold">Database: shop</h3>

          <div
            className={`mt-4 cursor-pointer rounded-xl border-4 p-6 ${
              cardType === "SCHEMA"
                ? "border-amber-600 bg-amber-100"
                : "border-amber-300 bg-white"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              setCardType("SCHEMA");
            }}
          >
            <h4 className="font-bold">Schema: shop_schema</h4>

            <div
              className={`mt-4 cursor-pointer rounded-lg border-4 p-4 ${
                cardType === "TABLE"
                  ? "border-emerald-600 bg-emerald-100"
                  : "border-emerald-300 bg-white"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                setCardType("TABLE");
              }}
            >
              <h5 className="font-bold">Table: customers</h5>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
        <p className="text-sm font-bold text-blue-600">현재 선택</p>
        <h2 className="mt-2 text-2xl font-bold">{cardType}</h2>
        <p className="mt-3 text-slate-600">{descriptions[cardType]}</p>
      </section>
    </div>
  );
}

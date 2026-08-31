import React, { useEffect, useRef } from "react";
export interface Transaction {
  id: number;
  type: "입금" | "출금";
  amount: number;
}

interface TxnRowProps {
  txn: Transaction;
  onDelete: (id: number) => void;
}

/**
 * 실습: React.memo로 자식 컴포넌트 리렌더 방지
 * 목표: memo가 어떤 조건에서 리렌더를 건너뛰는지 눈으로 확인한다.
 */

//자식 Component 이다.
//기본 값을 props 로 보낸경우는 Memo 가능
//object, function props 보낸 경우는 memo가 무산

function TxnRowBase({ txn, onDelete }: TxnRowProps) {
  // TODO :렌더링 횟수를 세는 ref를 만들고, 렌더될 때마다 1씩 증가시키세요.
  // 힌트: useRef(0), renders.current += 1
  const renders = useRef<number>(0);

  useEffect(() => {
    renders.current += 1;
  }, []);

  return (
    <li className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs">
      <span
        className={
          txn.type === "입금"
            ? "font-semibold text-teal-600"
            : "font-semibold text-rose-600"
        }
      >
        {txn.type}
        <span className="ml-1 rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] text-rose-500">
          {/* TODO: renders.current를 표시하세요. */}
          {/* eslint-disable-next-line react-hooks/refs -- 렌더 횟수 디버그 표시용 의도적 예외 */}
          렌더 {renders.current}
          렌더 ?
        </span>
      </span>
      <span className="flex items-center gap-2 text-slate-600">
        {txn.amount.toLocaleString()}원
        <button
          onClick={() => onDelete(txn.id)}
          className="rounded border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100"
        >
          삭제
        </button>
      </span>
    </li>
  );
}

// TODO [난이도★☆☆] TxnRowBase를 memo()로 감싸 export하세요.
// 힌트: export const TxnRow = memo(TxnRowBase);
export const TxnRow = React.memo(TxnRowBase); // 실습용

/**
 * 확인 질문
 * - memo로 감싸지 않았을 때와 감쌌을 때, "렌더 ?" 숫자가 어떻게 다르게 움직이는가?
 */
//부모가 렌더링되면 자식이 리렌더링 된다.
// 변화가 없다면 부모를 렌더링하더라도 자식 리렌더링 안하기

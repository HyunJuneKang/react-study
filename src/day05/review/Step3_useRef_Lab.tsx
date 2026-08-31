import { useState, useEffect, useRef } from "react";

/**
 * 실습: 인풋 자동 포커스 + 이전 값 추적 + 렌더링 횟수 카운트
 * 목표: useRef가 리렌더를 유발하지 않는다는 점과 DOM 직접 제어를 체험한다.
 */
export default function AccountBalance() {
  const [balance, setBalance] = useState<number>(500_000);
  const [amount, setAmount] = useState<string>("");

  // TODO : input에 연결할 ref를 선언하세요. 타입: HTMLInputElement
  // 힌트: useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null);
  // TODO :이전 balance 값을 저장할 ref를 선언하세요. 초기값은 현재 balance.
  const prevBalanceRef = useRef<number>(balance);
  // TODO : 렌더링 횟수를 세는 ref를 선언하고, 컴포넌트 함수 본문에서 매 렌더마다 1씩 증가시키세요.
  // 주의: renderCount.current += 1 은 useEffect 밖, 컴포넌트 본문 최상단 로직에 둡니다.

  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    renderCountRef.current += 1;
    console.log("렌더링 횟수:", renderCountRef.current);
  });
  useEffect(() => {
    prevBalanceRef.current = balance;
  }, [balance]);

  const deposit = () => {
    const n = Number(amount);
    if (!n) return;
    setBalance((b) => b + n);
    setAmount("");
    // TODO :입금 후 input에 자동으로 포커스를 주세요.
    // 힌트: inputRef.current?.focus()
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400">
          신한은행 · 입출금 계좌
        </p>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
          {/* TODO: renderCount.current를 표시하세요. */}
          {/* eslint-disable-next-line react-hooks/refs -- 렌더 횟수 디버그 표시용 의도적 예외 */}
          렌더링 {renderCountRef.current}회
        </span>
      </div>

      <p className="mt-1 text-3xl font-bold text-slate-800">
        {balance.toLocaleString()}
        <span className="ml-1 text-base font-medium text-slate-400">원</span>
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {/* TODO: prevBalance.current를 표시하세요. */}
        이전 잔액: {balance}원
      </p>

      <div className="mt-4 flex gap-2">
        <input
          // TODO: ref를 연결하세요.
          ref={inputRef}
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액 입력"
          className="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          onClick={deposit}
          className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          입금 후 자동 포커스
        </button>
      </div>
    </div>
  );
}

/**
 * 확인 질문
 * - renderCount.current를 useState로 만들었다면 어떤 문제가 생길까?
 * - useRef와 useState를 각각 언제 선택해야 하는가?
 */

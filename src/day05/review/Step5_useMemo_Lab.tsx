import { useReducer, useState, useMemo } from "react";

/**
 * 실습: 거래 합계를 useMemo로 캐싱하기
 * 목표: 의존성 배열에 따라 재계산 여부가 달라짐을 확인한다.

 */

interface Transaction {
  id: number;
  type: "입금" | "출금";
  amount: number;
}
interface TxnState {
  balance: number;
  history: Transaction[];
}
type TxnAction =
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "RESET" };

const initialState: TxnState = { balance: 500_000, history: [] };

function txnReducer(state: TxnState, action: TxnAction): TxnState {
  switch (action.type) {
    case "DEPOSIT":
      return {
        balance: state.balance + action.amount,
        history: [
          { id: Date.now(), type: "입금", amount: action.amount },
          ...state.history,
        ],
      };
    case "WITHDRAW":
      if (action.amount > state.balance) return state;
      return {
        balance: state.balance - action.amount,
        history: [
          { id: Date.now(), type: "출금", amount: action.amount },
          ...state.history,
        ],
      };
    case "RESET":
      return initialState;
    default:
      throw new Error("알 수 없는 action");
  }
}

// 실무에선 대량 거래내역 필터+집계라고 가정 (계산 비용을 인위적으로 흉내)
function heavySum(history: Transaction[], type: Transaction["type"]): number {
  console.log("Heavy");
  let dummy = 0;
  for (let i = 0; i < 400_000; i++) dummy += i % 3;
  return (
    history
      .filter((h) => h.type === type)
      .reduce((sum, h) => sum + h.amount, 0) +
    dummy * 0
  );
}

export default function AccountBalance() {
  const [state, dispatch] = useReducer(txnReducer, initialState);
  const [amount, setAmount] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // TODO [난이도★★☆] totalDeposit을 useMemo로 계산하세요.
  // 힌트: heavySum(state.history, "입금")
  // ⚠️ 주의: 의존성 배열에 state.history가 빠지면 값이 안 바뀌고, theme까지 넣으면 캐싱 효과가 사라집니다.
  // 예상 소요시간: 8분
  const totalDeposit = useMemo(
    () => heavySum(state.history, "입금"),
    [state.history],
  );

  // TODO [난이도★★☆] totalWithdraw도 동일한 방식으로 useMemo로 계산하세요.

  const totalWithdraw = useMemo(
    () => heavySum(state.history, "출금"),
    [state.history],
  );
  return (
    <div
      className={
        theme === "light"
          ? "max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          : "max-w-sm rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm"
      }
    >
      <p className="text-xs font-semibold text-slate-400">
        신한은행 · 거래 요약
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-teal-50 p-3">
          <p className="text-[11px] font-semibold text-teal-600">총 입금액</p>
          <p className="mt-1 text-lg font-bold text-teal-700">
            {totalDeposit.toLocaleString()}원
          </p>
        </div>
        <div className="rounded-lg bg-rose-50 p-3">
          <p className="text-[11px] font-semibold text-rose-600">총 출금액</p>
          <p className="mt-1 text-lg font-bold text-rose-700">
            {totalWithdraw.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액 입력"
          className="w-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          onClick={() => {
            dispatch({ type: "DEPOSIT", amount: Number(amount) || 0 });
            setAmount("");
          }}
          className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          입금
        </button>
        <button
          onClick={() => {
            dispatch({ type: "WITHDRAW", amount: Number(amount) || 0 });
            setAmount("");
          }}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          출금
        </button>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          테마 토글 ({theme}) — 집계와 무관
        </button>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        구현 후: '테마 토글'을 눌러도 집계가 다시 계산되지 않는지(브라우저가
        순간 멈추지 않는지) 확인해보세요.
      </p>
    </div>
  );
}

/**
 * 확인 질문
 * - useMemo 없이 그냥 heavySum()을 렌더링 중에 호출하면 어떤 문제가 생기는가?
 * - 의존성 배열에 [state.history, theme]을 넣으면 어떤 부작용이 생기는가?
 */

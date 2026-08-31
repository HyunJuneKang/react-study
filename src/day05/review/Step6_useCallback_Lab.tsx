import { useCallback, useReducer, useState } from "react";
import { TxnRow, type Transaction } from "./Step6_TxnRow_Lab";

/**
 * 실습: useCallback으로 콜백 참조 고정하기
 * 목표: memo(TxnRow)가 실제로 리렌더를 건너뛰려면 부모의 콜백도 안정적이어야 함을 확인한다.
 * 선행지식: STEP 4~5, Step6_TxnRow_Lab.tsx (먼저 완성해야 함)
 */

interface TxnState {
  balance: number;
  history: Transaction[];
}
type TxnAction =
  { type: "DEPOSIT"; amount: number } | { type: "DELETE"; id: number };

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
    case "DELETE":
      return {
        ...state,
        history: state.history.filter((h) => h.id !== action.id),
      };
    default:
      throw new Error("알 수 없는 action");
  }
}

export default function AccountBalance() {
  const [state, dispatch] = useReducer(txnReducer, initialState);
  const [amount, setAmount] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // TODO [난이도★★☆] handleDelete를 useCallback으로 감싸 참조를 고정하세요.
  // 주의: 아래처럼 useCallback 없이 매번 새 함수를 만들면 memo(TxnRow)가 무력화됩니다.
  //  const handleDelete = (id: number) => dispatch({ type: "DELETE", id });
  // 힌트:useCallback((id: number) => { dispatch(...) }, [])
  //const handleDelete = (id: number) => dispatch({ type: "DELETE", id }); // 실습용
  const handleDelete = useCallback(
    (id: number) => dispatch({ type: "DELETE", id }),
    [],
  );
  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold text-slate-400">
        신한은행 · 입출금 계좌
      </p>
      <p className="mt-1 text-3xl font-bold text-slate-800">
        {state.balance.toLocaleString()}
        <span className="ml-1 text-base font-medium text-slate-400">원</span>
      </p>

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
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          테마 토글 ({theme}) — 부모만 리렌더
        </button>
      </div>

      <ul className="mt-4 max-h-40 space-y-1 overflow-auto">
        {state.history.length === 0 && (
          <li className="text-xs text-slate-400">
            입금해서 거래내역을 만들어보세요
          </li>
        )}
        {state.history.map((h) => (
          <TxnRow key={h.id} txn={h} onDelete={handleDelete} />
        ))}
      </ul>

      <p className="mt-3 text-[11px] text-slate-400">
        구현 후: '테마 토글'을 여러 번 눌러도 각 거래 행의 "렌더" 숫자가 늘지
        않는지 확인해보세요.
      </p>
    </div>
  );
}

/**
 * 확인 질문
 * - handleDelete를 useCallback으로 감싸지 않으면 TxnRow의 "렌더" 숫자가 어떻게 달라지는가?
 * - useCallback의 의존성 배열을 []로 둘 수 있는 이유는? (dispatch의 특성과 관련)
 */

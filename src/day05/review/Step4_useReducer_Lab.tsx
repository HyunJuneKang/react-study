import { useReducer, useState } from "react";

/**
 * 실습: 거래내역을 액션 기반으로 관리하는 reducer 작성
 * 목표: 판별 유니온 액션 타입 설계와 reducer의 불변 업데이트 패턴을 익힌다.
 */
//{ id: Date.now(), type: "입금", amount: 1000 }
//{id : 1,type:"입금",amount:1000}

interface Transaction {
  id: number;
  type: "입금" | "출금";
  amount: number;
}

interface TxnState {
  balance: number;
  history: Transaction[];
}

// TODO : DEPOSIT, WITHDRAW, RESET 세 가지 액션 타입을 판별 유니온으로 정의하세요.
// 힌트: { type: "DEPOSIT"; amount: number } | { type: "WITHDRAW"; amount: number } | { type: "RESET" }
type TxnAction =
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "RESET" };

const initialState: TxnState = {
  balance: 500_000,
  history: [{ id: 1, type: "입금", amount: 1000 }],
};
//업무 로직이 Component 에서 함수로 분리됨, 상태 관리를 한다.
function txnReducer(state: TxnState, action: TxnAction): TxnState {
  switch (action.type) {
    case "DEPOSIT":
      // TODO : balance를 늘리고, history 맨 앞에 새 거래를 추가한 새 state를 반환하세요.
      // 주의: state를 직접 수정(mutate)하지 말고 항상 새 객체를 반환하세요.

      return {
        balance: state.balance + action.amount,
        history: [
          ...state.history,
          { id: Date.now(), type: "입금", amount: action.amount },
        ],
      };

    case "WITHDRAW":
      // TODO: 출금액이 balance보다 크면 state를 그대로 반환(무시)하고,
      //                아니면 balance를 줄이고 history에 거래를 추가한 새 state를 반환하세요.
      if (state.balance < action.amount) return state;

      return {
        balance: state.balance - action.amount,
        history: [
          ...state.history,
          { id: Date.now(), type: "출금", amount: action.amount },
        ],
      };

    case "RESET":
      // TODO :initialState를 반환하세요.
      return initialState;

    default:
      throw new Error("알 수 없는 action");
  }
}
//관리할 상태값이 많으면 Component가 복잡해진다.
//상태관리를 Component에서 분리 ==> useReducer
//balance(잔고), history(입출금 내역)
export default function AccountBalance() {
  // TODO :useReducer(txnReducer, initialState)로 state, dispatch를 만드세요.
  //const [state, dispatch] = useReducer(txnReducer, initialState)
  const [amount, setAmount] = useState<string>("");
  const [state, dispatch] = useReducer(txnReducer, initialState);
  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold text-slate-400">
        신한은행 · 입출금 계좌
      </p>
      <p className="mt-1 text-3xl font-bold text-slate-800">
        {state.balance.toLocaleString()}
        <span className="ml-1 text-base font-medium text-slate-400">원</span>
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액 입력"
          className="w-28 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          onClick={() => {
            // TODO: dispatch({ type: "DEPOSIT", amount: Number(amount) || 0 })를 호출하세요.
            dispatch({ type: "DEPOSIT", amount: Number(amount) || 0 });
            setAmount("");
          }}
          className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          입금
        </button>
        <button
          onClick={() => {
            // TODO: WITHDRAW 액션을 dispatch하세요.
            dispatch({ type: "WITHDRAW", amount: Number(amount) || 0 });
            setAmount("");
          }}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          출금
        </button>
        <button
          onClick={() => {
            // TODO: RESET 액션을 dispatch하세요.
            dispatch({ type: "RESET" });
          }}
          className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          초기화
        </button>
      </div>

      <ul className="mt-4 max-h-40 space-y-1 overflow-auto">
        {state.history.length === 0 && (
          <li className="text-xs text-slate-400">거래내역 없음</li>
        )}
        {state.history.map((h) => (
          <li
            key={h.id}
            className="flex justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs"
          >
            <span
              className={
                h.type === "입금"
                  ? "font-semibold text-teal-600"
                  : "font-semibold text-rose-600"
              }
            >
              {h.type}
            </span>
            <span className="text-slate-600">
              {h.amount.toLocaleString()}원
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 확인 질문
 * - reducer 함수 안에서 state.history.push(...)를 하면 안 되는 이유는?
 * - 액션이 3개뿐인데도 useReducer를 쓰는 것이 useState 3개보다 나은 지점은 어디인가?
 */

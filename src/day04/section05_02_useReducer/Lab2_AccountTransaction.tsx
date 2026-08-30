import { useReducer, useState } from "react";

type State = {
  balance: number;
  history: string[];
};
type Action =
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "RESET" };

const initAccount: State = {
  balance: 0,
  history: [],
};

function accountReducer(state: State, action: Action) {
  switch (action.type) {
    case "DEPOSIT":
      return {
        balance: state.balance + action.amount,
        history: [...state.history, `입금:${action.amount}`],
      };
    case "WITHDRAW": {
      if (state.balance < action.amount) return state;
      return {
        balance: state.balance - action.amount,
        history: [...state.history, `출금:${action.amount}`],
      };
    }
    case "RESET":
      return initAccount;
    default:
      return state;
  }
}

//만들어진 파일을 보니.....입금액,출금액은 useState()로 관리하고 잔고와 함수는 useReducer로 관리
function Lab2_AccountTransaction() {
  // TODO [난이도★☆☆-④] useReducer를 사용해 state와 dispatch를 선언하세요.
  const [state, dispatch] = useReducer(accountReducer, initAccount);
  const [depositInput, setDepositInput] = useState<string>("");
  const [withdrawInput, setWithdrawInput] = useState<string>("");

  // TODO [난이도★★☆-⑤] 입금 버튼 클릭 시 dispatch를 호출하는 함수를 작성하세요.
  // 힌트: Number(depositInput) 값이 0보다 클 때만 dispatch 하세요.
  const handleDeposit = (): void => {
    const amount = Number(depositInput);
    if (amount > 0) {
      dispatch({ type: "DEPOSIT", amount: amount });
      setDepositInput("");
    }
  };

  // TODO [난이도★★☆-⑥] 출금 버튼 클릭 시 dispatch를 호출하는 함수를 작성하세요.
  const handleWithdraw = (): void => {
    const amount = Number(withdrawInput);
    if (amount > 0) {
      dispatch({ type: "WITHDRAW", amount: amount });
      setWithdrawInput("");
    }
  };

  const handleReset = (): void => {
    dispatch({ type: "RESET" });
  };

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        계좌 거래 시뮬레이터
      </h2>

      <p className="text-center text-2xl font-semibold text-blue-600">
        잔액: {state.balance.toLocaleString()}원
      </p>

      <div className="flex gap-3">
        <input
          type="number"
          value={depositInput}
          onChange={(e) => setDepositInput(e.target.value)}
          placeholder="입금액"
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          입금
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={withdrawInput}
          onChange={(e) => setWithdrawInput(e.target.value)}
          placeholder="출금액"
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
        <button
          onClick={handleWithdraw}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          출금
        </button>
      </div>

      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        초기화
      </button>

      <div className="border-t pt-4">
        <p className="font-semibold text-gray-700 mb-2">거래내역</p>
        <ul className="space-y-1 text-sm text-gray-600">
          {state.history.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Lab2_AccountTransaction;

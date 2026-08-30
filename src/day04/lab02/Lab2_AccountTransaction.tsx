// TODO [난이도★☆☆-①] 상태 타입을 정의하세요.
// 힌트: 잔액(balance: number)과 거래내역(history: string[])을 가진 객체입니다.
type State = {};

// TODO [난이도★★☆-②] 액션 타입을 정의하세요.
// 힌트: DEPOSIT/WITHDRAW는 amount: number가 필요하고, RESET은 필요 없습니다.
type Action = {};

const initialState: State = {
  balance: 0,
  history: [],
};

// TODO [난이도★★★-③] reducer 함수를 완성하세요.
// - DEPOSIT: balance에 amount를 더하고, history 끝에 `입금 ${amount}원`을 추가합니다.
// - WITHDRAW: 잔액이 amount보다 작으면 상태를 바꾸지 않고 그대로 반환하세요.
//   (⚠️ 주의: 잔액이 마이너스가 되지 않도록 방어 코드가 반드시 필요합니다.)
//   충분하면 balance에서 amount를 빼고 history 끝에 `출금 ${amount}원`을 추가합니다.
// - RESET: initialState로 되돌립니다.
// 힌트: 배열 불변성 유지 → [...state.history, '...'] 형태를 사용하세요.
function accountReducer(state: State, action: Action): State {}
function Lab2_AccountTransaction() {
  // TODO [난이도★☆☆-④] useReducer를 사용해 state와 dispatch를 선언하세요.

  const [depositInput, setDepositInput] = useState<string>("");
  const [withdrawInput, setWithdrawInput] = useState<string>("");

  // TODO [난이도★★☆-⑤] 입금 버튼 클릭 시 dispatch를 호출하는 함수를 작성하세요.
  // 힌트: Number(depositInput) 값이 0보다 클 때만 dispatch 하세요.
  const handleDeposit = (): void => {};

  // TODO [난이도★★☆-⑥] 출금 버튼 클릭 시 dispatch를 호출하는 함수를 작성하세요.
  const handleWithdraw = (): void => {};

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

import { useState, type ChangeEvent } from "react";

/**
 * 실습: 계좌 잔액 관리
 * 목표: useState로 잔액 상태를 만들고, 입금/출금 버튼에 연결한다.
 */
export default function AccountBalance() {
  // TODO : balance 상태를 선언하세요. 초기값은 500000.
  const [balance, setBalance] = useState<number>(500000);
  // TODO : 인풋에 입력할 amount 문자열 상태를 선언하세요. 초기값은 빈 문자열 "".
  const [amount, setAmount] = useState<string>("");
  const changeAmount = (event: ChangeEvent<HTMLInputElement>): void => {
    setAmount(event.target.value);
  };
  const deposit = () => {
    // TODO :amount를 숫자로 변환해 balance에 더하세요.
    // 주의: 이전 상태값에 의존하므로 setBalance(b => b + n) 형태의 함수형 업데이트를 사용하세요.
    // (추가확인) 함수형일때와 직접계산식이었을때의 차이실습...set 2회
    // 힌트: Number(amount)가 0이거나 NaN이면 조기 return
    const numberAmount = Number(amount);

    if (amount === "" || Number.isNaN(numberAmount) || numberAmount <= 0) {
      return;
    }
    setBalance((previousBalance) => {
      return previousBalance + numberAmount;
    });

    setAmount("");
  };

  const withdraw = () => {
    // TODO : amount를 숫자로 변환해 balance에서 빼세요.
    // 주의: 출금액이 balance보다 크면 실행되지 않아야 합니다.
    const numberAmount = Number(amount);

    if (
      amount === "" ||
      Number.isNaN(numberAmount) ||
      numberAmount <= 0 ||
      numberAmount > balance
    ) {
      return;
    }

    setBalance((previousBalance) => {
      return previousBalance - numberAmount;
    });

    setAmount("");
  };

  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold text-slate-400">
        신한은행 · 입출금 계좌
      </p>
      <p className="mt-1 text-3xl font-bold text-slate-800">
        {/* TODO : balance를 3자리 콤마 형식으로 표시하세요. 힌트: toLocaleString() */}
        {balance.toLocaleString("Ko-KR")}
        <span className="ml-1 text-base font-medium text-slate-400">원</span>
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          // TODO: value와 onChange를 amount 상태에 연결하세요.
          value={amount}
          onChange={changeAmount}
          placeholder="금액 입력"
          className="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <button
          onClick={deposit}
          className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          입금
        </button>
        <button
          onClick={withdraw}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          출금
        </button>
      </div>
    </div>
  );
}

/**
 * 확인 질문
 * - setBalance(balance + n) 대신 setBalance(b => b + n)을 쓰는 이유는?
 * - useState의 두 번째 값(setter)을 호출하면 컴포넌트에 어떤 일이 일어나는가?
 */

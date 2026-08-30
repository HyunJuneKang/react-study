import { useState, useMemo, useCallback } from "react";
import RecalcButton from "./RecalcButton";

function DepositCalculator() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [customerName, setCustomerName] = useState<string>("");

  // 실무에서는 시간이 오래 걸리는 연산이라고 가정합니다. (반복문으로 흉내)
  const calculateInterest = (amount: number): number => {
    console.log("무거운 이자 계산 실행");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += amount * 0.00000001;
    }
    return Math.round(result);
  };

  // TODO [난이도★★☆-②] useMemo를 사용해 이자 계산 결과를 메모이제이션하세요.
  // 힌트: calculateInterest(principal)을 useMemo로 감싸고, 의존성 배열은 [principal]
  // ⚠️ 주의: 아래 줄을 그대로 두면 고객명을 입력할 때마다 무거운 계산이 다시 실행됩니다.
  const interest = useMemo(() => calculateInterest(principal), [principal]);

  // TODO [난이도★★☆-③] useCallback을 사용해 handleRecalculate 함수를 메모이제이션하세요.
  // 힌트: 의존성 배열은 [] (빈 배열)
  const handleRecalculate = useCallback(() => {
    console.log("현재 이자:", interest);
  }, [interest]);

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        예금 이자 계산기
      </h2>

      <p className="text-center text-lg">
        예상 이자:{" "}
        <span className="font-semibold text-blue-600">
          {interest.toLocaleString()}원
        </span>
      </p>

      <div>
        <label className="block text-sm text-gray-600 mb-1">예치금액</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          고객명 (계산과 무관)
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>

      <RecalcButton onRecalculate={handleRecalculate} />
    </div>
  );
}

export default DepositCalculator;

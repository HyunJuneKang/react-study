import { useMemo, useState } from "react";

function ExpensiveComponent() {
  const [num, setNum] = useState<number>(1);
  const [name, setName] = useState<string>("");

  const heavyCalculation = (n: number) => {
    console.log("무거운 계산 실행");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += n;
    }
    return result;
  };
  const result = useMemo(() => heavyCalculation(num), [num]);
  //const result = heavyCalculation(num);
  return (
    <div>
      <h1>결과 : {result}</h1>
      <button
        onClick={() => setNum(num + 1)}
        className="border rounded px-4 py-2 bg-green-500"
      >
        숫자 증가
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-4 py-2"
      />
    </div>
  );
}

export default ExpensiveComponent;

import { useState, useRef } from "react";

function Lab1_AccountOpenForm(): JSX.Element {
  // TODO [난이도★☆☆-①] 계좌번호, 비밀번호 input에 연결할 ref를 각각 선언하세요.
  // 힌트: useRef<HTMLInputElement | null>(null)
  // 예상 소요시간: 5분

  // TODO [난이도★☆☆-②] '비밀번호 입력칸으로 이동' 버튼이 호출할 함수를 완성하세요.
  // 힌트: 대상 ref의 .current?.focus() 를 사용합니다.
  const focusPassword = (): void => {};

  // 저장 시도 횟수를 3가지 방식으로 비교합니다.
  const [saveCountState, setSaveCountState] = useState<number>(0);

  // TODO [난이도★★☆-③] useRef로 저장 시도 횟수를 담을 변수를 선언하세요.
  // ⚠️ 주의: useRef의 값은 바뀌어도 화면이 자동으로 갱신되지 않습니다.

  let saveCountLet: number = 0;

  const [render, setRender] = useState<boolean>(false);

  const handleSaveState = (): void => {
    setSaveCountState((prev) => prev + 1);
  };

  // TODO [난이도★★☆-④] ref 저장 시도 횟수를 1 증가시키는 핸들러를 작성하세요.
  // 힌트: countRef.current += 1; 형태를 참고하세요.
  const handleSaveRef = (): void => {};

  const handleSaveLet = (): void => {
    saveCountLet = saveCountLet + 1;
    console.log("Let 저장 시도:", saveCountLet);
  };

  const forceRerender = (): void => setRender((prev) => !prev);

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        신규 계좌 개설
      </h2>

      <div className="space-y-3">
        <input
          ref={accountNoInputRef}
          type="text"
          placeholder="계좌번호"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          ref={passwordInputRef}
          type="password"
          placeholder="비밀번호"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={focusPassword}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        비밀번호 입력칸으로 이동
      </button>

      <div className="border-t pt-4 space-y-2 text-lg">
        <p>
          State 저장 시도:{" "}
          <span className="font-semibold text-blue-600">{saveCountState}</span>
        </p>
        <p>
          Ref 저장 시도:{" "}
          <span className="font-semibold text-green-600">
            {saveCountRef.current}
          </span>
        </p>
        <p>
          Let 저장 시도:{" "}
          <span className="font-semibold text-red-600">{saveCountLet}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSaveState}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          State +1
        </button>
        <button
          onClick={handleSaveRef}
          className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ref +1
        </button>
        <button
          onClick={handleSaveLet}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Let +1
        </button>
      </div>

      <p className="text-sm text-gray-500">
        render 상태: {render ? "참" : "거짓"}
      </p>
      <button
        onClick={forceRerender}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        강제 리렌더링
      </button>
    </div>
  );
}

export default Lab1_AccountOpenForm;

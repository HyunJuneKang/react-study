//function RefTest(): JSX.Element
//JSX.Element의 의미 : 이 함수는 React 컴포넌트다"라는 의도를 타입으로 명확히 표현하는 선택
//생략가능

import { useRef } from "react";
import type { JSX } from "react/jsx-runtime";

function RefTest(): JSX.Element {
  // DOM 참조용 useRef
  //null이지만 타입은 T로 취급, null제외
  const nameInputRef = useRef<HTMLInputElement>(null!);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const focusName = (): void => {
    //자바스크립트에서 사용했다면
    //document.querySelector("#userName").focus()
    nameInputRef.current.focus();
  };

  const focusEmail = (): void => {
    emailInputRef.current?.focus();
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        useRef로 포커스 이동하기
      </h2>
      {/* input 영역 */}
      <div className="space-y-3">
        <input
          ref={nameInputRef}
          type="text"
          placeholder="이름"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          ref={emailInputRef}
          type="email"
          placeholder="이메일"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-3">
        <button
          onClick={focusName}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          이름에 포커스
        </button>

        <button
          onClick={focusEmail}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          이메일에 포커스
        </button>
      </div>
    </div>
  ); //return end
} //function end
export default RefTest;

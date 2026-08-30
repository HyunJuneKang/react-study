import React, { useState, type ChangeEvent } from "react";

type PropsType = {
  title: string;
  MAX_SCORE?: number;
  options?: { size: string; color: string };
  clickHandler?: () => void;
};
//기본 data type : 약한 비교
//객체 data type : 깊은비교
function ChildComponent({
  title,
  MAX_SCORE,
  options,
  clickHandler,
}: PropsType) {
  const [score, setScore] = useState<number>(100);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScore(Number(e.target.value));
  };
  console.log("2.ChildComponent 렌더링 title=>" + title);
  return (
    <div className="border px-4 py-2">
      <h1>ChildComponent</h1>
      <input
        className="border-2 border-blue-500"
        type="number"
        value={score}
        onChange={handleChange}
      />
      <p>당신이 입력한 점수 : {score} </p>
      <p>부모에게서 받음 : {title} </p>
      <p>부모에게서 받음 MAX_SCORE: {MAX_SCORE} </p>
      <p>부모에게서 받음 size: {options?.size} </p>
      <p>부모에게서 받음 color: {options?.color} </p>
      <button
        className="px-6 py-2 bg-red-500 rounded-full text-neutral-50"
        onClick={clickHandler}
      >
        자식이 부모의 함수 사용{" "}
      </button>
    </div>
  );
}
//export default ChildComponent ;
export default React.memo(ChildComponent);

//상태관리 : 상태값이 바뀌면 React가 UI를 다시 렌더링 한다.
//class형 : this.state,this.setState()

import { useState } from "react";

//function형 : useState() - HOOK이용
export default function Counter() {
  //const su = 0;
  const [count, setCount] = useState<number>(0);
  //const clickHandler = () => su + 1;

  const btnStyle = "mt-5 px-6 py-3 text-xl rounded-full bg-blue-500 text-white";

  const incrementHandler = (): void => {
    setCount((prev) => prev + 1);
  };

  const decrementHandler = (): void => {
    setCount((prev) => prev - 1);
  };

  const resetHandler = (): void => {
    setCount(0);
  };

  //count = 0 , 값 변경은 반드시 setCount()를 이용한다
  return (
    <div>
      <button className={btnStyle} onClick={incrementHandler}>
        +
      </button>
      <button className={btnStyle} onClick={decrementHandler}>
        -
      </button>
      <button className={btnStyle} onClick={resetHandler}>
        reset
      </button>
      <h2>Count:{count}</h2>
    </div>
  );
}

//React는 useState를 통해 상태를 관리할 수 있다.

//class Component의 제공되는 React의 메서드를 이용한다.
//this.state, this.setState()
//lifeCycle을 관리위해서는 정해진함수를 사용해야했다.
//함수 component가 나오면서 제공되는 Hook이다. (기능, 함수)
//useState() : 상태관리는 한다는 의미:값이 변경되면 UI를 대신해준다.
//useEffect() : lifeCycle을 관리

import { useEffect, useState } from "react";

//useState는 상태값과 상태를 변경하는 함수를 반환한다.  [변수이름, 함수이름] = useState<변수타입>(초기값);
export default function PointCount() {
  //상태관리할 변수선언
  const [point, setPoint] = useState<number>(0);
  const [now, setNow] = useState<string>(new Date().toLocaleTimeString());
  //useEffect(실행할함수, cleanup함수return:제거시실행됨 , [의존배열])
  useEffect(() => {
    console.log("1.의존배열생략시 렌더링될때마다 실행");
  });
  useEffect(() => {
    console.log("2.의존배열 []: 렌더링시 1회 실행");
    const timerId = setInterval(() => {
      setNow(new Date().toLocaleTimeString());
    }, 1000);
    //component가 제거시에 수행된다.메모리 누수 방지를 위해 주로 사용
    return () => {
      clearInterval(timerId);
      console.log("타이머정리(cleanUp)완료 ");
    };
  }, []);

  useEffect(() => {
    console.log("3.의존배열 [point]: point가 변경시마다 실행");
  }, [point]);

  //이벤트핸들러들
  const addPoint = () => {
    //setPoint(point+10)
    setPoint((prev) => prev + 10);
  };
  const usePoint = () => {
    setPoint((prev) => Math.max(0, prev - 10));
  };
  const resetPoint = () => {
    setPoint(0);
  };
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4 text-center">
      <h2 className="text-xl font-bold text-gray-800">적립포인트: {point}P</h2>
      <p className="text-sm text-gray-500">현재 시각: {now} </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={addPoint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +10 적립
        </button>
        <button
          onClick={usePoint}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -10 사용
        </button>
        <button
          onClick={resetPoint}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          초기화
        </button>
      </div>
    </div>
  );
}

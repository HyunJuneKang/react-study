import { useEffect, useState } from "react";
import CountController from "./CounterController";
import CountViewer from "./CounterViewer";

function CounterApp() {
  //부모가 count변수를 이용하여 상태관리를 한다. count값이 변경되면 React가 UI를 다시그린다.
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("초기값");

  const messageHandler = (): void => {
    setMessage((prev) => prev + "*");
  };
  /*함수형 컨포넌트의 라이프사이클 연습
  useEffect(콜백함수, [의존배열] )
  의존배열이 []이면 최초 rendering시 1회
  */
  console.log("랜더링될때마다 수행된다.(useEffect없음)..주의~~");
  useEffect(() => {
    console.log("useEffect...랜더링될때마다 수행된다.");
    //1초마다 문자찍기
    const intervalId = setInterval(() => {
      console.log("깜빡!!!!!!");
    }, 1000);

    //cleanUP을 return (마운트후에 호출할 함수를 return한다. )
    return (): void => {
      clearInterval(intervalId);
    };
  });
  useEffect(() => {
    console.log("useEffect...최초 rendering시 1회 수행된다.");
  }, []);
  useEffect(() => {
    console.log("useEffect...최초 rendering시,count변경시마다 수행된다.");
  }, [count]);
  useEffect(() => {
    console.log("useEffect...최초 rendering시,message변경시마다 수행된다.");
  }, [message]);
  useEffect(() => {
    console.log(
      "useEffect...최초 rendering시,count,message변경시마다 수행된다.",
    );
  }, [count, message]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{message}</h1>

      <button
        onClick={messageHandler}
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
      >
        메시지 변경
      </button>

      <CountViewer count2={count} />

      <CountController setCount={setCount} />
    </div>
  );
}

export default CounterApp;

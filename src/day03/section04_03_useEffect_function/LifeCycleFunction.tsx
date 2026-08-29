import { useEffect, useState } from "react";
import Button from "./Button";

//useEffect : 함수형 Component 는 이 훅으로 라이프 사이클 관리
//사이드 이펙트 처리를 한다.
//useEffect(함수,cleanup 함수 return,[의존배열])
export default function LifeCycleFunction() {
  const [count, setCount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  //의존배열이 생략되어 있으면 이 component가 rendering시마다 실행됨
  //useEffect내에서 수행할 일이 끝나면 해야할  로직을 cleanup 작업 return
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    console.log("load시 1회 발생");
  }, []);
  useEffect(() => {
    console.log("Rendering시마다 발생");
  });
  useEffect(() => {
    console.log("count가 변경시마다 발생");
  }, [count]);
  useEffect(() => {
    console.log("email이 변경시마다 발생");
  }, [email]);
  useEffect(() => {
    console.log("count,email이 변경시마다 발생");
  }, [count, email]);
  return (
    <div>
      <h1>LifeCycle (Function Component)</h1>
      <p>
        count: {count} email:{email}{" "}
      </p>
      <button
        className="px-4 py-2 bg-blue-500 rounded text-white shadow hover:bg-blue-700"
        onClick={() => setCount((pre) => pre + 1)}
      >
        증가
      </button>
      <Button color="green" clickHandler={() => setCount((pre) => pre - 1)}>
        감소
      </Button>
      <input
        className="border px-3 py-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

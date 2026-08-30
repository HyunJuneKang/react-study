import { useCallback, useEffect, useMemo, useState } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  console.log("1.ParentComponent 렌더링");
  const [userName, setUerName] = useState<string>("");
  const MAX_SCORE = 100;
  type OptionType = { color: string; size: string };
  //useMemo<return값의타입>(()=>(), [])
  const options = useMemo<OptionType>(
    () => ({ size: "large", color: "blue" }),
    [],
  );
  //함수도 객체처럼 재 렌더링시 다시 생성된다.
  //이를 막기위해서 함수를 메모이제이션한다.... useCallback()
  const clickHandler = useCallback(() => {
    console.log("부모가 정의, 자식에게 전달");
  }, []);
  useEffect(() => {
    console.log("=====렌더링시 함수가 재생성=====");
  }, [clickHandler]);
  return (
    <div className="border px-4 py-2 m-10">
      <h1>ParentComponent : {userName}</h1>
      이름 :
      <input
        className="border-2 border-blue-500"
        onChange={(e) => setUerName(e.target.value)}
      />
      <ChildComponent
        title="A"
        MAX_SCORE={MAX_SCORE}
        options={options}
        clickHandler={clickHandler}
      />
      <ChildComponent title="B" />
    </div>
  );
}
export default ParentComponent;
/*
1.자식이 변경되면 자식만 Rendering한다. 
2.부모가 변경되면 자식도 Rendering한다.자식은 재 렌더링 할 필요가 없는경우
  (1) 단순타입의 속성을 전달하는 경우라면 자식을 memoization 
     React.memo(자식Component)
  (2) object타입은 값 저장시 useMomo(f, [])
  (3) 함수타입인 경우 저장은 useCallback(f, [])

*/

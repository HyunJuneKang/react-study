import type { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

type StudentType = {
  stdId: number;
  stdName: string;
};

type FuncType = (a: number, b: number) => number;

export default function TestComponent() {
  const myName: string = "신한";
  const myObj: StudentType = {
    stdId: 100,
    stdName: "홍길동",
  };
  const add: FuncType = (a, b) => a + b;
  return (
    <div>
      <h1 className="myHeader">부모Component</h1>
      <h2 style={{ color: "blue" }}>css연습(inline)</h2>
      <div className="card"></div>
      <ul>
        <li>myName : {myName}</li>
        <li>myObj : {myObj.stdId}</li>
        <li>f1호출 : {add(3, 4)}</li>
      </ul>
      <ChildComponent title="리엑트1" writer="예소" />
      <ChildComponent title="리엑트" writer="예소">
        자식의 내용
      </ChildComponent>
    </div>
  );
}

type ChildPropsType = { title: string; writer: string; children?: ReactNode };

function ChildComponent({ title, writer, children }: ChildPropsType) {
  const clickFunc = () => {
    alert("클릭");
  };
  return (
    <Fragment>
      <p>자식 Component</p>
      <p>title : {title}</p>
      <p>writer : {writer}</p>
      <p>children : {children || "내용없음"}</p>
      <button className="btn btn-success" onClick={() => alert("버튼1누름")}>
        버튼1
      </button>
      <button className="btn btn-danger" onClick={clickFunc}>
        버튼2
      </button>
    </Fragment>
  );
}

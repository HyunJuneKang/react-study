import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BranchDashboard from "./day04/section05_04_useCallback_useMemo/BranchDashboard";

const score = 100;
const element1 = <h1>Hello!</h1>;
const element2 = React.createElement(
  "h1",
  { title: "제목" },
  <span>안녕</span>,
  "Hello",
);

//가상 DOM
const virtualDOM = (
  <>
    {element1}
    {element2}
    <p>점수는 {score} 입니다. </p>
    {/* 속성값은 반드시 따옴표로 감싼다. */}
    <input
      className="aa"
      type="text"
      value="신한DS"
      style={{ backgroundColor: "yellow", padding: "20px" }}
    ></input>
  </>
);
// 이전 학습 예제는 보관하되 현재 루트에는 Section2Start만 렌더링한다.
void virtualDOM;

//물리 DOM #root <div id="root"></div>
createRoot(document.getElementById("root")!).render(
  <div>
    <BranchDashboard />
  </div>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoListApp from "./day05/section07_practice/components/TodoListApp";
// import SqlStudyApp from "./sqlstudy/SqlStudyApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoListApp /> 
  </StrictMode>,
);

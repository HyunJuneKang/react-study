import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import DiaryApp from "./day06/section11_practice_diary/util/DiaryApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen bg-gray-100">
      <BrowserRouter>
        <DiaryApp />
      </BrowserRouter>
    </div>
  </StrictMode>,
);

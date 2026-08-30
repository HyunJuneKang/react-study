import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SqlStudyApp from "./sqlstudy/SqlStudyApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SqlStudyApp />
  </StrictMode>,
);

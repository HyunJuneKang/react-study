import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import StartApp from "@/StartApp";
import { AuthProvider } from "@/day07/section12_02_auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StartApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

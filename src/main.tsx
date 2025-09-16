import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Project from "./Project.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Project />
    </StrictMode>
  );
}

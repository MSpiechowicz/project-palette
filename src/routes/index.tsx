import { createFileRoute } from "@tanstack/react-router";
import { ProjectPaletteGenerator } from "../components/ProjectPaletteGenerator";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <ProjectPaletteGenerator />;
}

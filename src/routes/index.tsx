import { createFileRoute } from "@tanstack/react-router";
import { ProjectMain } from "../components/ProjectMain";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <ProjectMain />;
}

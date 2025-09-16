import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "../components/ClientOnly";
import { ProjectMain } from "../components/ProjectMain";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-7xl mx-auto">Loading...</div>
        </div>
      }
    >
      <ProjectMain />
    </ClientOnly>
  );
}

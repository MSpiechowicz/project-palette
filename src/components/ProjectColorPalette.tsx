import useColorStore from "@/stores/colorStore";
import { ProjectColorGenerated } from "./ProjectColorGenerated";
import { ProjectColorPrimary } from "./ProjectColorPrimary";

export function ProjectColorPalette() {
  const { palette } = useColorStore();

  if (!palette) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Color Variations
      </h2>

      <ProjectColorPrimary />
      <ProjectColorGenerated />
    </div>
  );
}

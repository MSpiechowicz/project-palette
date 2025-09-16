import useColorStore from "@/stores/colorStore";
import { ProjectAnimatedSection } from "./ProjectAnimatedSection";
import { ProjectColorGenerated } from "./ProjectColorGenerated";
import { ProjectColorPrimary } from "./ProjectColorPrimary";

export function ProjectColorPalette() {
  const { palette } = useColorStore();

  if (!palette) {
    return null;
  }

  return (
    <ProjectAnimatedSection>
      <div
        id="color-variations"
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          Color Variations
        </h2>
        <p className="text-slate-800 text-medium mb-4 max-w-[80ch]">
          Information about your prefered color, WCAG compliance, and more.
        </p>

        <ProjectColorPrimary />
        <ProjectColorGenerated />
      </div>
    </ProjectAnimatedSection>
  );
}

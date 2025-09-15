import useColorStore from "@/stores/colorStore";
import { ProjectConfigurationColors } from "./ProjectConfigurationColors";
import { ProjectConfigurationGeneral } from "./ProjectConfigurationGeneral";
import { ProjectWarningNotification } from "./ProjectWarningNotification";

export function ProjectConfiguration() {
  const {
    includeAdditionalColors,
    includeTextColors,
    setIncludeAdditionalColors,
    setIncludeTextColors,
  } = useColorStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Output Configuration
      </h3>

      <div className="space-y-4">
        <ProjectConfigurationGeneral
          label="Include Additional Colors"
          description="When enabled, includes all generated palette colors. When disabled, only the primary color is included."
          checked={includeAdditionalColors}
          onChange={setIncludeAdditionalColors}
        />

        <ProjectConfigurationGeneral
          label="Include Text Colors"
          description="When enabled, includes WCAG-compliant text colors for each background color in the generated configurations."
          checked={includeTextColors}
          onChange={setIncludeTextColors}
        />

        <p className="text-sm text-slate-600 mb-4">
          Choose which color formats to include in the generated configuration
          for the CSS and Tailwind.
        </p>

        <ProjectConfigurationColors />
        <ProjectWarningNotification />
      </div>
    </div>
  );
}

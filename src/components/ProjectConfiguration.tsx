import useColorStore from "@/stores/colorStore";
import { ProjectConfigurationGeneral } from "./ProjectConfigurationGeneral";
import { ProjectWarningNotification } from "./ProjectWarningNotification";

export function ProjectConfiguration() {
  const {
    includeAdditionalColors,
    includeTextColors,
    showTextPreview,
    includeHex,
    includeRgb,
    includeHsl,
    includeOklch,
    setIncludeHex,
    setIncludeRgb,
    setIncludeHsl,
    setIncludeOklch,
    setIncludeAdditionalColors,
    setIncludeTextColors,
    setShowTextPreview,
  } = useColorStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-1">
        Output Configuration
      </h3>
      <p className="text-slate-800 text-medium max-w-[80ch] mb-6">
        Choose which color formats to include in the generated configuration for
        the CSS and Tailwind.
      </p>

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

        <ProjectConfigurationGeneral
          label="Include Hex"
          description="When enabled, includes the hex color in the generated configuration."
          checked={includeHex}
          onChange={setIncludeHex}
        />

        <ProjectConfigurationGeneral
          label="Include RGB"
          description="When enabled, includes the rgb color in the generated configuration."
          checked={includeRgb}
          onChange={setIncludeRgb}
        />

        <ProjectConfigurationGeneral
          label="Include HSL"
          description="When enabled, includes the hsl color in the generated configuration."
          checked={includeHsl}
          onChange={setIncludeHsl}
        />

        <ProjectConfigurationGeneral
          label="Include OKLCH"
          description="When enabled, includes the oklch color in the generated configuration."
          checked={includeOklch}
          onChange={setIncludeOklch}
        />

        <ProjectConfigurationGeneral
          label="Show Text Preview"
          description="When enabled, displays example text within each generated color to preview WCAG compliance in real-time."
          checked={showTextPreview}
          isLast={true}
          onChange={setShowTextPreview}
        />

        <ProjectWarningNotification />
      </div>
    </div>
  );
}

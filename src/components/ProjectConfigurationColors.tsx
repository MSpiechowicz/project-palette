import useColorStore from "../stores/colorStore";
import { ProjectToggleSwitch } from "./ProjectToggleSwitch";

export function ProjectConfigurationColors() {
  const {
    includeHex,
    includeRgb,
    includeHsl,
    includeOklch,
    setIncludeHex,
    setIncludeRgb,
    setIncludeHsl,
    setIncludeOklch,
  } = useColorStore();

  const colorOptions = [
    {
      label: "HEX",
      value: includeHex,
      onChange: setIncludeHex,
    },
    {
      label: "RGB",
      value: includeRgb,
      onChange: setIncludeRgb,
    },
    {
      label: "HSL",
      value: includeHsl,
      onChange: setIncludeHsl,
    },
    {
      label: "OKLCH",
      value: includeOklch,
      onChange: setIncludeOklch,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {colorOptions.map((option) => (
        <ProjectToggleSwitch
          key={option.label}
          checked={option.value}
          onChange={option.onChange}
          label={option.label}
        />
      ))}
    </div>
  );
}

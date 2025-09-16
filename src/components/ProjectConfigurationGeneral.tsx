import { ProjectToggleSwitch } from "./ProjectToggleSwitch";

export function ProjectConfigurationGeneral({
  label,
  description,
  checked,
  isLast = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  isLast?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className={`border-b border-slate-200 pb-4 ${isLast ? "border-b-0" : ""}`}>
      <ProjectToggleSwitch
        checked={checked}
        onChange={onChange}
        label={label}
      />
      <p className="text-xs text-slate-500 mt-1 ml-14">{description}</p>
    </div>
  );
}

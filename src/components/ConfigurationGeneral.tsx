import { ToggleSwitch } from "./ToggleSwitch";

export function ConfigurationGeneral({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <ToggleSwitch
        checked={checked}
        onChange={onChange}
        label={label}
      />
      <p className="text-xs text-slate-500 mt-1 ml-14">{description}</p>
    </div>
  );
}

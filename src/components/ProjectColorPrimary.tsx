import useColorStore from "@/stores/colorStore";

export function ProjectColorPrimary() {
  const { palette } = useColorStore();

  if (!palette) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Primary Color Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-700 mb-3">Primary Color</h3>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-lg shadow-md flex-shrink-0"
              style={{ backgroundColor: palette?.primary?.hex }}
            />
            <div className="flex-1 space-y-2">
              <div className="font-mono text-sm text-slate-600">
                <span className="font-medium text-slate-700">Hex:</span> {palette?.primary?.hex}
              </div>
              <div className="font-mono text-sm text-slate-500">
                <span className="font-medium text-slate-700">RGB:</span> {palette?.primary?.rgb}
              </div>
              <div className="font-mono text-sm text-slate-500">
                <span className="font-medium text-slate-700">HSL:</span> {palette?.primary?.hsl}
              </div>
              <div className="font-mono text-sm text-slate-500">
                <span className="font-medium text-slate-700">OKLCH:</span> {palette?.primary?.oklch}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Color Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-700 mb-3">Recommended Text Color</h3>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-lg border border-slate-300 flex-shrink-0"
              style={{
                backgroundColor: palette?.primary?.foregroundColor,
              }}
            />
            <div className="flex-1 space-y-2">
              <div className="font-mono text-sm text-slate-500">
                <span className="font-medium text-slate-700">Hex:</span> {palette?.primary?.foregroundColor}
              </div>
              <div className="font-mono text-sm text-slate-500">
                <span className="font-medium text-slate-700">Contrast:</span> {palette?.primary?.contrastRatio.toFixed(1)}:1
              </div>
              <div>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    palette?.primary?.wcagLevel === "AAA"
                      ? "bg-green-100 text-green-800"
                      : palette?.primary?.wcagLevel === "AA"
                        ? "bg-blue-100 text-blue-800"
                        : palette?.primary?.wcagLevel === "A"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  WCAG {palette?.primary?.wcagLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

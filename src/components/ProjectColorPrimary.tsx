import useColorStore from "@/stores/colorStore";

export function ProjectColorPrimary() {
  const { palette } = useColorStore();

  if (!palette) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-slate-700 mb-3">Primary Color</h3>
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
        <div
          className="w-16 h-16 rounded-lg shadow-md"
          style={{ backgroundColor: palette?.primary?.hex }}
        />
        <div className="flex-1">
          <div className="font-mono text-sm text-slate-600 mb-2">
            {palette?.primary?.hex}
          </div>
          <div className="font-mono text-sm text-slate-500 mb-2">
            {palette?.primary?.rgb}
          </div>
          <div className="font-mono text-sm text-slate-500 mb-2">
            {palette?.primary?.hsl}
          </div>
          <div className="font-mono text-sm text-slate-500 mb-3">
            {palette?.primary?.oklch}
          </div>

          {/* Foreground Color Suggestion */}
          <div className="border-t border-slate-200 pt-3">
            <div className="text-xs font-medium text-slate-700 mb-2">
              Recommended Text Color
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border border-slate-300"
                style={{
                  backgroundColor: palette?.primary?.foregroundColor,
                }}
              />
              <div>
                <div className="font-mono text-sm text-slate-600">
                  {palette?.primary?.foregroundColor}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    Contrast: {palette?.primary?.contrastRatio.toFixed(1)}
                    :1
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
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
    </div>
  );
}

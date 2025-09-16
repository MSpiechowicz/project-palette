import useColorStore from "@/stores/colorStore";

export function ProjectColorPrimary() {
  const { palette } = useColorStore();

  const primaryColorData = [
    {
      label: "HEX",
      value: palette?.primary?.hex,
    },
    {
      label: "RGB",
      value: palette?.primary?.rgb,
    },
    {
      label: "HSL",
      value: palette?.primary?.hsl,
    },
    {
      label: "OKLCH",
      value: palette?.primary?.oklch,
    },
  ];

  const recommendedTextColorData = [
    {
      label: "HEX",
      value: palette?.primary?.foregroundColor,
    },
    {
      label: "CONTRAST RATIO",
      value: palette?.primary?.contrastRatio.toFixed(1),
    },
    {
      label: "WCAG LEVEL",
      value: palette?.primary?.wcagLevel,
    },
  ];

  if (!palette) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundColor: palette?.primary?.hex }}
          />

          <div className="relative p-6 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Primary Color
            </h3>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-24 h-24 rounded-2xl shadow-xl border-4 border-white flex-shrink-0"
                  style={{ backgroundColor: palette?.primary?.hex }}
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {primaryColorData.map((color) => (
                    <div
                      key={color.label}
                      className="bg-white/80 shadow-md backdrop-blur-sm rounded-lg p-3"
                    >
                      <div className="text-xs font-medium text-slate-600 mb-1">
                        {color.label}
                      </div>
                      <div className="font-mono text-sm text-slate-800">
                        {color.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div
            className="p-6"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
          >
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Recommended Text Color
            </h3>
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-24 h-24 rounded-2xl shadow-xl border-4 border-white flex-shrink-0"
                  style={{ backgroundColor: palette?.primary?.foregroundColor }}
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedTextColorData.map((color) => (
                    <div
                      key={color.label}
                      className="bg-white/80 shadow-md backdrop-blur-sm rounded-lg p-3"
                    >
                      <div className="text-xs font-medium text-slate-600 mb-1">
                        {color.label}
                      </div>
                      <div className="font-mono text-sm text-slate-800">
                        {color.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

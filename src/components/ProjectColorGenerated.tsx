import useColorStore from "@/stores/colorStore";
import { generateColorPalette } from "@/utils/colorPalette";
import { useCallback } from "react";

export function ProjectColorGenerated() {
  const { palette, setBaseColor, setPalette } = useColorStore();

  const setNewPrimaryColor = useCallback(
    (color: string) => {
      setBaseColor(color);
      setPalette(generateColorPalette(color));
    },
    [setBaseColor, setPalette],
  );

  if (!palette || palette?.colors?.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-700">
          Additional Generated Colors
        </h3>
        <p className="text-sm text-slate-600 mb-3 max-w-[80ch]">
          Here are some additional colors generated from the base color. They
          are keeping the same contrast and saturation ratio as the primary
          color. You can click any color to make it your new primary color and
          generate a new palette.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {palette?.colors?.map((color, index) => (
          <div key={`${color.hex}-${index}`} className="group">
            <button
              className="w-full h-20 rounded-lg shadow-md mb-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-white"
              style={{ backgroundColor: color.hex }}
              onClick={() => setNewPrimaryColor(color.hex)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setNewPrimaryColor(color.hex);
                }
              }}
              tabIndex={0}
              title={`Click to make ${color.name} your primary color`}
              type="button"
            />
            <div className="text-center">
              <div className="font-mono text-xs text-slate-600 mb-1">
                {color.hex}
              </div>
              <div className="text-xs text-slate-500 font-medium mb-2">
                {color.name}
              </div>

              {/* Foreground Color Info */}
              <div className="flex items-center justify-center gap-1 mb-1">
                <div
                  className="w-3 h-3 rounded border border-slate-300"
                  style={{ backgroundColor: color.foregroundColor }}
                  title={`Text color: ${color.foregroundColor}`}
                />
                <span
                  className={`px-1 py-0.5 rounded text-xs font-medium ${
                    color.wcagLevel === "AAA"
                      ? "bg-green-100 text-green-800"
                      : color.wcagLevel === "AA"
                        ? "bg-blue-100 text-blue-800"
                        : color.wcagLevel === "A"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {color.wcagLevel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

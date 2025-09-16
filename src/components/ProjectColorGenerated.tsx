import useColorStore from "@/stores/colorStore";
import { generateColorPalette } from "@/utils/colorPalette";
import { useCallback } from "react";

export function ProjectColorGenerated() {
  const { palette, showTextPreview, setBaseColor, setPalette } = useColorStore();

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
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Generated Color Palette
        </h3>
        <p className="text-slate-600 mb-4 max-w-[80ch]">
          Discover additional colors generated from your base color. Each color maintains 
          perfect harmony with your primary choice. Click any color to explore new possibilities.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {palette?.colors?.map((color, index) => (
          <div key={`${color.hex}-${index}`} className="group">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Color Swatch */}
              <button
                className="w-full h-24 relative overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105"
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
              >
                {/* Text Preview */}
                {showTextPreview && (
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <span 
                      className="text-sm font-semibold text-center leading-tight"
                      style={{ color: color.foregroundColor }}
                    >
                      Sample Text
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center" style={{ backgroundColor: color.hex }}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white bg-opacity-90 rounded-full p-2">
                      <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="View color">
                        <title>View color</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              
              {/* Color Information */}
              <div className="p-4 space-y-3">
                <div className="text-center">
                  <div className="font-mono text-sm font-semibold text-slate-800 mb-1">
                    {color.hex}
                  </div>
                  <div className="text-sm font-medium text-slate-600 mb-3">
                    {color.name}
                  </div>
                </div>

                {/* Text Color Preview & WCAG Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg border-2 border-slate-300 shadow-sm"
                      style={{ backgroundColor: color.foregroundColor }}
                      title={`Text color: ${color.foregroundColor}`}
                    />
                    <span className="text-xs text-slate-500 font-medium">
                      Text
                    </span>
                  </div>
                  
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                      color.wcagLevel === "AAA"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : color.wcagLevel === "AA"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : color.wcagLevel === "A"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    WCAG {color.wcagLevel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

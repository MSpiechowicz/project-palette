import useColorStore from "@/stores/colorStore";
import { generateColorPalette } from "@/utils/colorPalette";
import { useCallback } from "react";

export function ProjectInput() {
  const { 
    baseColor, 
    setBaseColor, 
    setPalette,
    setIncludeHex,
    setIncludeRgb,
    setIncludeHsl,
    setIncludeOklch,
    setIncludeAdditionalColors,
    setIncludeTextColors,
    setTailwindV3Config,
    setTailwindV4Config,
    setCssConfig,
    setScssConfig,
    setTailwindV3CopiedCode,
    setTailwindV4CopiedCode,
    setCssCopiedCode,
    setScssCopiedCode
  } = useColorStore();

  const generateProjectPalette = useCallback(() => {
    setPalette(generateColorPalette(baseColor));
  }, [baseColor, setPalette]);

  const resetToDefaults = useCallback(() => {
    setBaseColor("#3b82f6");
    setPalette(null);
    setIncludeHex(true);
    setIncludeRgb(true);
    setIncludeHsl(true);
    setIncludeOklch(true);
    setIncludeAdditionalColors(false);
    setIncludeTextColors(true);
    setTailwindV3Config("");
    setTailwindV4Config("");
    setCssConfig("");
    setScssConfig("");
    setTailwindV3CopiedCode(false);
    setTailwindV4CopiedCode(false);
    setCssCopiedCode(false);
    setScssCopiedCode(false);
  }, [
    setBaseColor,
    setPalette,
    setIncludeHex,
    setIncludeRgb,
    setIncludeHsl,
    setIncludeOklch,
    setIncludeAdditionalColors,
    setIncludeTextColors,
    setTailwindV3Config,
    setTailwindV4Config,
    setCssConfig,
    setScssConfig,
    setTailwindV3CopiedCode,
    setTailwindV4CopiedCode,
    setCssCopiedCode,
    setScssCopiedCode
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-1 max-w-md">
            <label
              htmlFor="base-color"
              className="block text-sm font-semibold text-slate-700 mb-3"
            >
              Base Color
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-14 h-14 rounded-xl border-2 border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  style={{ 
                    padding: 0,
                    background: 'none',
                    border: '2px solid #e2e8f0'
                  }}
                />
              </div>
              <input
                id="base-color"
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={generateProjectPalette}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Generate
            </button>
            
            <button
              type="button"
              onClick={resetToDefaults}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium border border-slate-200 hover:border-slate-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

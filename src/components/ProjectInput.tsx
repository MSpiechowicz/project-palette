import useColorStore from "@/stores/colorStore";
import { generateColorPalette } from "@/utils/colorPalette";
import { useCallback } from "react";
import { ProjectSection } from "./ProjectSection";

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
    setScssCopiedCode,
  } = useColorStore();

  const generateProjectPalette = useCallback(() => {
    setPalette(generateColorPalette(baseColor));

    setTimeout(() => {
      const colorVariationsElement =
        document.getElementById("color-variations");

      if (colorVariationsElement) {
        colorVariationsElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
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
    setScssCopiedCode,
  ]);

  return (
    <ProjectSection>
      <div className="space-y-6">
        <div>
          <h2 className="block text-2xl font-bold text-slate-800 mb-1">
            Base Color
          </h2>
          <p className="text-slate-800 text-medium mb-4">
            Enter a base color in the RGB format to generate a beautiful color
            palette.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 h-12">
              <input
                id="base-color"
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-full sm:w-58 h-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm bg-slate-50 hover:bg-white"
                placeholder="#3b82f6"
              />
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-14 h-full rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
              <button
                type="button"
                onClick={generateProjectPalette}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center min-w-[120px] cursor-pointer"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={resetToDefaults}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center min-w-[100px] cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProjectSection>
  );
}

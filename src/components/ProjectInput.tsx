import useColorStore from "@/stores/colorStore";
import { generateColorPalette } from "@/utils/colorPalette";
import { useCallback } from "react";

export function ProjectInput() {
  const { baseColor, setBaseColor, setPalette } = useColorStore();

  const generateProjectPalette = useCallback(() => {
    setPalette(generateColorPalette(baseColor));
  }, [baseColor, setPalette]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <label
            htmlFor="base-color"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Base Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
            />
            <input
              id="base-color"
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={generateProjectPalette}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

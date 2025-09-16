import { useCallback } from "react";
import Eye from "../assets/eye.svg";
import EyeDropper from "../assets/eyedropper.svg";
import { WCAGRating } from "../enums/wcag";
import type { ColorInfo } from "../interfaces/color";
import useColorStore from "../stores/colorStore";
import { generateColorPalette } from "../utils/colorPalette";

export function ProjectColorGenerated() {
  const { palette, showTextPreview, setBaseColor, setPalette } = useColorStore();

  const setNewPrimaryColor = useCallback(
    (color: string) => {
      setBaseColor(color);
      setPalette(generateColorPalette(color));
    },
    [setBaseColor, setPalette]
  );

  function getWcagLevelDescription(wcagLevel: string) {
    switch (wcagLevel) {
      case WCAGRating.A:
        return "WCAG Level A";
      case WCAGRating.AA:
        return "WCAG Level AA";
      case WCAGRating.FAIL:
        return "Not recommended";
      default:
        return "WCAG Level AAA";
    }
  }

  if (!palette || palette?.colors?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-1">Generated Color Palette</h3>
        <p className="text-slate-800 mb-4 max-w-[80ch]">
          Discover additional colors generated from your base color. Each color maintains perfect harmony with your
          primary choice. Click any color to explore new possibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {palette?.colors?.map((color: ColorInfo, index: number) => (
          <div key={`${color.hex}-${index}`} className="group">
            <button
              className="h-48 w-48 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              type="button"
              onClick={() => setNewPrimaryColor(color.hex)}
              style={{ backgroundColor: color.hex }}
            >
              <div className="w-full h-24 flex items-center justify-center">
                {showTextPreview && (
                  <span className="text-md font-semibold" style={{ color: color.foregroundColor }}>
                    Lorem ipsum
                  </span>
                )}
              </div>
              <div className="w-full h-28 relative bg-white flex flex-col items-start justify-center px-4">
                <h3 className="text-black underline underline-offset-3 font-bold mb-1">{color.name}</h3>
                <div className="flex items-center">
                  <img src={EyeDropper} alt="Eye Dropper" className="w-4 h-4 mt-1 mr-0.5" />
                  <span className="text-black text-sm ml-1 mt-1">{color.hex}</span>
                </div>
                <div className="flex items-center">
                  <img src={Eye} alt="Eye" className="w-4 h-4 mt-1 mr-0.5" />
                  <span className="text-black text-sm ml-1 mt-1">{getWcagLevelDescription(color.wcagLevel)}</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

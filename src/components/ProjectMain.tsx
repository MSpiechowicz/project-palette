import { ConfigFormat } from "@/enums/config";
import type { ColorFormatConfig } from "@/interfaces/color";
import useColorStore from "@/stores/colorStore";
import { getConfigStrategy } from "@/strategies/config/ConfigFactory";
import { useCallback, useEffect } from "react";
import { generateColorPalette } from "../utils/colorPalette";
import { ProjectCodeSnippets } from "./ProjectCodeSnippets";
import { ProjectColorPalette } from "./ProjectColorPalette";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { ProjectInput } from "./ProjectInput";
import { ProjectInstructions } from "./ProjectInstructions";
import { ProjectTitle } from "./ProjectTitle";

export function ProjectMain() {
  const {
    includeHex,
    includeRgb,
    includeHsl,
    includeOklch,
    includeAdditionalColors,
    includeTextColors,
    palette,
    setPalette,
    setBaseColor,
    setTailwindV3Config,
    setTailwindV4Config,
    setCssConfig,
    setScssConfig,
    setHasAnyColorFormat,
  } = useColorStore();

  const setNewPrimaryColor = useCallback(
    (newColor: string) => {
      setBaseColor(newColor);
      setPalette(generateColorPalette(newColor));
    },
    [setPalette, setBaseColor],
  );

  useEffect(() => {
    if (palette) {
      const colorConfig: ColorFormatConfig = {
        includeHex,
        includeRgb,
        includeHsl,
        includeOklch,
        includeAdditionalColors,
        includeTextColors,
      };

      const cssConfigStrategy = getConfigStrategy(
        ConfigFormat.CSS,
        palette,
        colorConfig,
      );
      const scssConfigStrategy = getConfigStrategy(
        ConfigFormat.SCSS,
        palette,
        colorConfig,
      );
      const tailwindV3ConfigStrategy = getConfigStrategy(
        ConfigFormat.TAILWIND_v3,
        palette,
        colorConfig,
      );
      const tailwindV4ConfigStrategy = getConfigStrategy(
        ConfigFormat.TAILWIND_V4,
        palette,
        colorConfig,
      );

      setCssConfig(cssConfigStrategy.generate());
      setScssConfig(scssConfigStrategy.generate());
      setTailwindV3Config(tailwindV3ConfigStrategy.generate());
      setTailwindV4Config(tailwindV4ConfigStrategy.generate());
    }
  }, [
    palette,
    setCssConfig,
    setScssConfig,
    setTailwindV3Config,
    setTailwindV4Config,
    includeAdditionalColors,
    includeHsl,
    includeTextColors,
    includeRgb,
    includeHex,
    includeOklch,
  ]);

  useEffect(() => {
    setHasAnyColorFormat(
      includeHex || includeRgb || includeHsl || includeOklch,
    );
  }, [includeHex, includeRgb, includeHsl, includeOklch, setHasAnyColorFormat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <ProjectTitle />
        <ProjectInput />
        <ProjectConfiguration />
        <ProjectColorPalette />
        <ProjectCodeSnippets />
        <ProjectInstructions />
      </div>
    </div>
  );
}

import { ConfigFormat } from "@/enums/config";
import type { ColorFormatConfig, ColorPalette } from "@/interfaces/color";
import type { ConfigType } from "@/types/config";
import type { ConfigStrategy } from "./ConfigStrategy";
import { CssConfigStrategy } from "./CssConfigStrategy";
import { ScssConfigStrategy } from "./ScssConfigStrategy";
import { TailwindConfigStrategy } from "./TailwindConfigStrategy";
import { TailwindV4ConfigStrategy } from "./TailwindV4ConfigStrategy";

export function getConfigStrategy(
  configType: ConfigType,
  palette: ColorPalette | null,
  config: ColorFormatConfig,
): ConfigStrategy {
  switch (configType) {
    case ConfigFormat.TAILWIND_v3:
      return new TailwindConfigStrategy(palette, config);
    case ConfigFormat.TAILWIND_V4:
      return new TailwindV4ConfigStrategy(palette, config);
    case ConfigFormat.SCSS:
      return new ScssConfigStrategy(palette, config);
    case ConfigFormat.CSS:
      return new CssConfigStrategy(palette, config);
    default:
      throw new Error(`Invalid config type: ${configType}`);
  }
}

import type { ColorFormatConfig, ColorPalette } from "../../interfaces/color";

export class ConfigStrategy {
  protected palette: ColorPalette | null;
  protected config: ColorFormatConfig;

  constructor(palette: ColorPalette | null, config: ColorFormatConfig) {
    this.palette = palette;
    this.config = config;
  }

  generate(): string {
    throw new Error("Not implemented");
  }
}

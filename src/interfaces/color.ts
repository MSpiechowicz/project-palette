import type { WCAGLevel } from "../types/wcag";

export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  name: string;
  foregroundColor: string;
  contrastRatio: number;
  wcagLevel: WCAGLevel;
}

export interface ColorPalette {
  primary: ColorInfo;
  colors: ColorInfo[];
}

export interface ColorFormatConfig {
  includeHex: boolean;
  includeRgb: boolean;
  includeHsl: boolean;
  includeOklch: boolean;
  includeAdditionalColors: boolean;
  includeTextColors: boolean;
}
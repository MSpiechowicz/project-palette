import { WCAGRating } from "../enums/wcag";
import type { WCAGLevel } from "../types/wcag";
import chroma from "chroma-js";

function getWCAGLevel(contrastRatio: number): WCAGLevel {
  if (contrastRatio >= 7) {
    return WCAGRating.AAA;
  }

  if (contrastRatio >= 4.5) {
    return WCAGRating.AA;
  }

  if (contrastRatio >= 3) {
    return WCAGRating.A;
  }

  return WCAGRating.FAIL;
}

function getWCAGContrastRatio(
  color1: chroma.Color,
  color2: chroma.Color,
): number {
  const l1 = color1.luminance();
  const l2 = color2.luminance();

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getWCAGOptimalForegroundColor(backgroundColor: chroma.Color): {
  color: string;
  ratio: number;
  level: WCAGLevel;
} {
  // Try white and black to see which gives better contrast
  const white = chroma("#ffffff");
  const black = chroma("#000000");

  const whiteRatio = getWCAGContrastRatio(backgroundColor, white);
  const blackRatio = getWCAGContrastRatio(backgroundColor, black);

  const isWhiteBetter = whiteRatio > blackRatio;


  return {
    color: isWhiteBetter ? white.hex() : black.hex(),
    ratio: isWhiteBetter ? whiteRatio : blackRatio,
    level: getWCAGLevel(isWhiteBetter ? whiteRatio : blackRatio),
  };
}

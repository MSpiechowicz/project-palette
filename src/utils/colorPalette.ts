import type { ColorInfo, ColorPalette } from "@/interfaces/color";
import { getWCAGOptimalForegroundColor } from "@/utils/wcag";
import chroma from "chroma-js";

/**
 * Converts a color name to a valid CSS variable name by converting to kebab-case
 * @param name - The color name to convert
 * @returns A valid CSS variable name in kebab-case
 */
export function toKebabCase(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle camelCase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, '') // Remove any non-alphanumeric characters except hyphens
    .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export function generateColorPalette(baseColor: string): ColorPalette {
  try {
    // Validate the color first
    if (!chroma.valid(baseColor)) {
      throw new Error("Invalid color provided");
    }

    const primary = chroma(baseColor);
    const primaryForeground = getWCAGOptimalForegroundColor(primary);
    const primaryInfo: ColorInfo = {
      hex: primary.hex(),
      rgb: primary.css("rgb"),
      hsl: primary.css("hsl"),
      oklch: primary.css("oklch"),
      name: "Primary",
      foregroundColor: primaryForeground.color,
      contrastRatio: primaryForeground.ratio,
      wcagLevel: primaryForeground.level,
    };

    // Generate variations (not including primary in the variations array)
    const variations = generateColorVariations(primary);

    return {
      primary: primaryInfo,
      colors: variations,
    };
  } catch (error) {
    console.error("Error generating color palette:", error);
    // Return a default palette if there's an error
    return {
      primary: {
        hex: "#3b82f6",
        rgb: "rgb(59, 130, 246)",
        hsl: "hsl(217, 91%, 60%)",
        oklch: "oklch(0.6 0.2 250)",
        name: "Primary",
        foregroundColor: "#ffffff",
        contrastRatio: 4.5,
        wcagLevel: "AA",
      },
      colors: [],
    };
  }
}

function generateColorVariations(baseColor: chroma.Color): ColorInfo[] {
  const variations: ColorInfo[] = [];

  // Extract the base color characteristics (preserve vibe)
  const baseSaturation = baseColor.get("hsl.s");
  const baseLightness = baseColor.get("hsl.l");
  const baseAlpha = baseColor.alpha();
  const baseHue = baseColor.get("hsl.h") || 0;

  // Define thresholds for unusable colors
  const minLightness = 0.15; // 15% minimum lightness
  const maxLightness = 0.85; // 85% maximum lightness

  // Check if the color is too dark or too light to generate usable variations
  if (baseLightness < minLightness || baseLightness > maxLightness) {
    // Return empty array - no variations will be generated
    return [];
  }

  // Define curated color spectrum positions (well-distributed across color wheel)
  const spectrumPositions = [
    { hue: 0, name: "Red" }, // 0°
    { hue: 30, name: "Orange" }, // 30°
    { hue: 60, name: "Yellow" }, // 60°
    { hue: 90, name: "Lime" }, // 90°
    { hue: 120, name: "Green" }, // 120°
    { hue: 150, name: "Teal" }, // 150°
    { hue: 180, name: "Cyan" }, // 180°
    { hue: 210, name: "Sky" }, // 210°
    { hue: 240, name: "Blue" }, // 240°
    { hue: 270, name: "Indigo" }, // 270°
    { hue: 300, name: "Purple" }, // 300°
    { hue: 330, name: "Pink" }, // 330°
  ];

  // Filter out colors that are too similar to the base color
  const filteredPositions = spectrumPositions.filter((position) => {
    const hueDiff = Math.abs(position.hue - baseHue);
    const minHueDiff = Math.min(hueDiff, 360 - hueDiff); // Handle wraparound
    return minHueDiff > 20; // Only include colors that are at least 20° different
  });

  // Add neutral colors (but fewer of them)
  const neutralColors = [
    { hue: 0, saturation: 0, lightness: 0.2, name: "Dark Gray" },
    { hue: 0, saturation: 0, lightness: 0.5, name: "Gray" },
    { hue: 0, saturation: 0, lightness: 0.8, name: "Light Gray" },
  ];

  // Calculate distribution: mostly spectrum colors, few neutrals
  const neutralCount = 2; // Fixed number of neutral colors
  const spectrumCount = Math.min(12, filteredPositions.length); // Use up to 12 spectrum colors

  // Generate spectrum colors (one per hue family)
  for (let i = 0; i < spectrumCount; i++) {
    const position = filteredPositions[i];

    // Create color with same saturation and lightness as base, but different hue
    let color = chroma.hsl(position.hue, baseSaturation, baseLightness);

    // Preserve alpha if the base color has transparency
    if (baseAlpha < 1) {
      color = color.alpha(baseAlpha);
    }

    // Add minimal variation to make it feel natural
    const hueVariation = (Math.random() - 0.5) * 8; // ±4 degrees
    const saturationVariation = (Math.random() - 0.5) * 0.05; // ±2.5% saturation
    const lightnessVariation = (Math.random() - 0.5) * 0.05; // ±2.5% lightness

    color = color
      .set("hsl.h", position.hue + hueVariation)
      .set(
        "hsl.s",
        Math.max(0, Math.min(1, baseSaturation + saturationVariation)),
      )
      .set(
        "hsl.l",
        Math.max(0, Math.min(1, baseLightness + lightnessVariation)),
      );

    const foreground = getWCAGOptimalForegroundColor(color);
    variations.push({
      hex: color.hex(),
      rgb: color.css("rgb"),
      hsl: color.css("hsl"),
      oklch: color.css("oklch"),
      name: position.name,
      foregroundColor: foreground.color,
      contrastRatio: foreground.ratio,
      wcagLevel: foreground.level,
    });
  }

  // Generate neutral colors
  for (let i = 0; i < neutralCount; i++) {
    const neutral = neutralColors[i % neutralColors.length];

    let color = chroma.hsl(neutral.hue, neutral.saturation, neutral.lightness);

    // Preserve alpha if the base color has transparency
    if (baseAlpha < 1) {
      color = color.alpha(baseAlpha);
    }

    const foreground = getWCAGOptimalForegroundColor(color);
    variations.push({
      hex: color.hex(),
      rgb: color.css("rgb"),
      hsl: color.css("hsl"),
      oklch: color.css("oklch"),
      name: neutral.name,
      foregroundColor: foreground.color,
      contrastRatio: foreground.ratio,
      wcagLevel: foreground.level,
    });
  }

  // Shuffle the array to mix spectrum and neutral colors
  for (let i = variations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [variations[i], variations[j]] = [variations[j], variations[i]];
  }

  return variations;
}

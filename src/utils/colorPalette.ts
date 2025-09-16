import type { ColorInfo, ColorPalette } from "@/interfaces/color";
import { getWCAGOptimalForegroundColor } from "@/utils/wcag";
import chroma from "chroma-js";

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
    { hue: 0, name: "Red" },
    { hue: 30, name: "Orange" },
    { hue: 60, name: "Yellow" },
    { hue: 90, name: "Lime" },
    { hue: 120, name: "Green" },
    { hue: 150, name: "Teal" },
    { hue: 180, name: "Cyan" },
    { hue: 210, name: "Sky" },
    { hue: 240, name: "Blue" },
    { hue: 270, name: "Indigo" },
    { hue: 300, name: "Purple" },
    { hue: 330, name: "Pink" },
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

    // Create color with same saturation as base, but vary lightness for better contrast
    // Use a range of lightness values to create more variety
    const lightnessVariations = [0.2, 0.4, 0.6, 0.8]; // Different lightness levels
    const selectedLightness = lightnessVariations[i % lightnessVariations.length];
    
    let color = chroma.hsl(position.hue, baseSaturation, selectedLightness);

    // Preserve alpha if the base color has transparency
    if (baseAlpha < 1) {
      color = color.alpha(baseAlpha);
    }

    // Add minimal variation to make it feel natural
    const hueVariation = (Math.random() - 0.5) * 8; // ±4 degrees
    const saturationVariation = (Math.random() - 0.5) * 0.1; // ±5% saturation
    const lightnessVariation = (Math.random() - 0.5) * 0.1; // ±5% lightness

    color = color
      .set("hsl.h", position.hue + hueVariation)
      .set(
        "hsl.s",
        Math.max(0.1, Math.min(1, baseSaturation + saturationVariation)),
      )
      .set(
        "hsl.l",
        Math.max(0.1, Math.min(0.9, selectedLightness + lightnessVariation)),
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

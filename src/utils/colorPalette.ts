import type { ColorInfo, ColorPalette } from "@/interfaces/color";
import { getWCAGOptimalForegroundColor } from "@/utils/wcag";
import chroma from "chroma-js";

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

export interface ColorFormatConfig {
  includeHex: boolean;
  includeRgb: boolean;
  includeHsl: boolean;
  includeOklch: boolean;
  includeAdditionalColors: boolean;
  includeTextColors: boolean;
}

export function generateCSSVariables(
  palette: ColorPalette,
  config: ColorFormatConfig = {
    includeHex: true,
    includeRgb: true,
    includeHsl: true,
    includeOklch: true,
    includeAdditionalColors: false,
    includeTextColors: true,
  },
): string {
  const variables = [":root {", "  /* Primary Color */"];

  // Add primary color variables based on configuration
  if (config.includeHex) {
    variables.push(`  --color-primary: ${palette.primary.hex};`);
  }
  if (config.includeRgb) {
    variables.push(`  --color-primary-rgb: ${palette.primary.rgb};`);
  }
  if (config.includeHsl) {
    variables.push(`  --color-primary-hsl: ${palette.primary.hsl};`);
  }
  if (config.includeOklch) {
    variables.push(`  --color-primary-oklch: ${palette.primary.oklch};`);
  }
  if (config.includeTextColors) {
    variables.push(
      `  --color-primary-text: ${palette.primary.foregroundColor};`,
    );
  }

  // Only add additional colors if the toggle is enabled
  if (config.includeAdditionalColors) {
    variables.push("  ", "  /* Generated Palette */");

    palette.colors.forEach((color, index) => {
      if (config.includeHex) {
        variables.push(`  --color-${index + 1}: ${color.hex};`);
      }
      if (config.includeRgb) {
        variables.push(`  --color-${index + 1}-rgb: ${color.rgb};`);
      }
      if (config.includeHsl) {
        variables.push(`  --color-${index + 1}-hsl: ${color.hsl};`);
      }
      if (config.includeOklch) {
        variables.push(`  --color-${index + 1}-oklch: ${color.oklch};`);
      }
      if (config.includeTextColors) {
        variables.push(
          `  --color-${index + 1}-text: ${color.foregroundColor};`,
        );
      }
    });
  }

  variables.push("}");

  return variables.join("\n");
}

export function generateTailwindConfig(palette: ColorPalette): string {
  const colors: Record<string, string> = {
    primary: palette.primary.hex,
  };

  palette.colors.forEach((color, index) => {
    colors[`color-${index + 1}`] = color.hex;
  });

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ${Object.entries(colors)
          .map(([key, value]) => `${key}: '${value}'`)
          .join(",\n        ")}
      }
    }
  }
}`;
}

export function generateTailwindV4Config(
  palette: ColorPalette,
  config: ColorFormatConfig = {
    includeHex: true,
    includeRgb: true,
    includeHsl: true,
    includeOklch: true,
    includeAdditionalColors: false,
    includeTextColors: true,
  },
): string {
  const themeVariables: string[] = [];

  // Add primary color based on configuration
  if (config.includeHex) {
    themeVariables.push(`  --color-primary: ${palette.primary.hex};`);
  }
  if (config.includeRgb) {
    themeVariables.push(`  --color-primary-rgb: ${palette.primary.rgb};`);
  }
  if (config.includeHsl) {
    themeVariables.push(`  --color-primary-hsl: ${palette.primary.hsl};`);
  }
  if (config.includeOklch) {
    themeVariables.push(`  --color-primary-oklch: ${palette.primary.oklch};`);
  }
  if (config.includeTextColors) {
    themeVariables.push(
      `  --color-primary-text: ${palette.primary.foregroundColor};`,
    );
  }

  // Add generated colors based on configuration (only if toggle is enabled)
  if (config.includeAdditionalColors) {
    palette.colors.forEach((color, index) => {
      if (config.includeHex) {
        themeVariables.push(`  --color-${index + 1}: ${color.hex};`);
      }
      if (config.includeRgb) {
        themeVariables.push(`  --color-${index + 1}-rgb: ${color.rgb};`);
      }
      if (config.includeHsl) {
        themeVariables.push(`  --color-${index + 1}-hsl: ${color.hsl};`);
      }
      if (config.includeOklch) {
        themeVariables.push(`  --color-${index + 1}-oklch: ${color.oklch};`);
      }
      if (config.includeTextColors) {
        themeVariables.push(
          `  --color-${index + 1}-text: ${color.foregroundColor};`,
        );
      }
    });
  }

  return `@theme {
${themeVariables.join("\n")}
}`;
}

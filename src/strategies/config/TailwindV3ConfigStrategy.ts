import { ConfigStrategy } from "./ConfigStrategy";

export class TailwindV3ConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const colors: Record<string, string> = {};

    if (this.config.includeHex) {
      colors.primary = this.palette.primary.hex;
    }
    if (this.config.includeRgb) {
      colors["primary-rgb"] = this.palette.primary.rgb;
    }
    if (this.config.includeHsl) {
      colors["primary-hsl"] = this.palette.primary.hsl;
    }
    if (this.config.includeOklch) {
      colors["primary-oklch"] = this.palette.primary.oklch;
    }
    if (this.config.includeTextColors) {
      colors["primary-text"] = this.palette.primary.foregroundColor;
    }

    if (this.config.includeAdditionalColors) {
      this.palette.colors.forEach((color, index) => {
        const colorName = `color-${index + 1}`;

        if (this.config.includeHex) {
          colors[colorName] = color.hex;
        }
        if (this.config.includeRgb) {
          colors[`${colorName}-rgb`] = color.rgb;
        }
        if (this.config.includeHsl) {
          colors[`${colorName}-hsl`] = color.hsl;
        }
        if (this.config.includeOklch) {
          colors[`${colorName}-oklch`] = color.oklch;
        }
        if (this.config.includeTextColors) {
          colors[`${colorName}-text`] = color.foregroundColor;
        }
      });
    }

    return `module.exports = {
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
}

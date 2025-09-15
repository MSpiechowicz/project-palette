import { toKebabCase } from "@/utils/colorPalette";
import { ConfigStrategy } from "./ConfigStrategy";

export class TailwindV3ConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const config: Record<string, string> = {};

    if (this.config.includeHex) {
      config.primary = this.palette.primary.hex;
    }
    if (this.config.includeRgb) {
      config["primary-rgb"] = this.palette.primary.rgb;
    }
    if (this.config.includeHsl) {
      config["primary-hsl"] = this.palette.primary.hsl;
    }
    if (this.config.includeOklch) {
      config["primary-oklch"] = this.palette.primary.oklch;
    }
    if (this.config.includeTextColors) {
      config["primary-text"] = this.palette.primary.foregroundColor;
    }

    if (this.config.includeAdditionalColors) {
      for (const color of this.palette.colors) {
        const colorName = toKebabCase(color.name);
        if (this.config.includeHex) {
          config[colorName] = color.hex;
        }
        if (this.config.includeRgb) {
          config[`${colorName}-rgb`] = color.rgb;
        }
        if (this.config.includeHsl) {
          config[`${colorName}-hsl`] = color.hsl;
        }
        if (this.config.includeOklch) {
          config[`${colorName}-oklch`] = color.oklch;
        }
        if (this.config.includeTextColors) {
          config[`${colorName}-text`] = color.foregroundColor;
        }
      }
    }

    return `module.exports = {
  theme: {
    extend: {
      colors: {
        ${Object.entries(config)
          .map(([key, value]) => `'${key}': '${value}'`)
          .join(",\n        ")}
      }
    }
  }
}`;
  }
}

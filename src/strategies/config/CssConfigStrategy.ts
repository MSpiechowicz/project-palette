import { toKebabCase } from "@/utils/name";
import { ConfigStrategy } from "./ConfigStrategy";

export class CssConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const config = [":root {"];

    if (this.config.includeHex) {
      config.push(`  --color-primary: ${this.palette.primary.hex};`);
    }
    if (this.config.includeRgb) {
      config.push(`  --color-primary-rgb: ${this.palette.primary.rgb};`);
    }
    if (this.config.includeHsl) {
      config.push(`  --color-primary-hsl: ${this.palette.primary.hsl};`);
    }
    if (this.config.includeOklch) {
      config.push(`  --color-primary-oklch: ${this.palette.primary.oklch};`);
    }
    if (this.config.includeTextColors) {
      config.push(
        `  --color-primary-text: ${this.palette.primary.foregroundColor};`,
      );
    }

    if (this.config.includeAdditionalColors) {
      config.push("  ");

      for (const color of this.palette.colors) {
        const colorName = toKebabCase(color.name);
        if (this.config.includeHex) {
          config.push(`  --color-${colorName}: ${color.hex};`);
        }
        if (this.config.includeRgb) {
          config.push(`  --color-${colorName}-rgb: ${color.rgb};`);
        }
        if (this.config.includeHsl) {
          config.push(`  --color-${colorName}-hsl: ${color.hsl};`);
        }
        if (this.config.includeOklch) {
          config.push(`  --color-${colorName}-oklch: ${color.oklch};`);
        }
        if (this.config.includeTextColors) {
          config.push(
            `  --color-${colorName}-text: ${color.foregroundColor};`,
          );
        }
      }
    }

    config.push("}");

    return config.join("\n");
  }
}

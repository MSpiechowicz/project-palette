import { ConfigStrategy } from "./ConfigStrategy";

export class TailwindV4ConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const config: string[] = [];

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
      this.palette.colors.forEach((color, index) => {
        if (this.config.includeHex) {
          config.push(`  --color-${index + 1}: ${color.hex};`);
        }
        if (this.config.includeRgb) {
          config.push(`  --color-${index + 1}-rgb: ${color.rgb};`);
        }
        if (this.config.includeHsl) {
          config.push(`  --color-${index + 1}-hsl: ${color.hsl};`);
        }
        if (this.config.includeOklch) {
          config.push(`  --color-${index + 1}-oklch: ${color.oklch};`);
        }
        if (this.config.includeTextColors) {
          config.push(`  --color-${index + 1}-text: ${color.foregroundColor};`);
        }
      });
    }

    return `@theme {
${config.join("\n")}
}`;
  }
}

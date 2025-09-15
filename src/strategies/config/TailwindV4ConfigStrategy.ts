import { ConfigStrategy } from "./ConfigStrategy";

export class TailwindV4ConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const themeVariables: string[] = [];

    if (this.config.includeHex) {
      themeVariables.push(`  --color-primary: ${this.palette.primary.hex};`);
    }
    if (this.config.includeRgb) {
      themeVariables.push(`  --color-primary-rgb: ${this.palette.primary.rgb};`);
    }
    if (this.config.includeHsl) {
      themeVariables.push(`  --color-primary-hsl: ${this.palette.primary.hsl};`);
    }
    if (this.config.includeOklch) {
      themeVariables.push(`  --color-primary-oklch: ${this.palette.primary.oklch};`);
    }
    if (this.config.includeTextColors) {
      themeVariables.push(
        `  --color-primary-text: ${this.palette.primary.foregroundColor};`,
      );
    }

    if (this.config.includeAdditionalColors) {
      this.palette.colors.forEach((color, index) => {
        if (this.config.includeHex) {
          themeVariables.push(`  --color-${index + 1}: ${color.hex};`);
        }
        if (this.config.includeRgb) {
          themeVariables.push(`  --color-${index + 1}-rgb: ${color.rgb};`);
        }
        if (this.config.includeHsl) {
          themeVariables.push(`  --color-${index + 1}-hsl: ${color.hsl};`);
        }
        if (this.config.includeOklch) {
          themeVariables.push(`  --color-${index + 1}-oklch: ${color.oklch};`);
        }
        if (this.config.includeTextColors) {
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
}

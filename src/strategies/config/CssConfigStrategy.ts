import { ConfigStrategy } from "./ConfigStrategy";

export class CssConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const variables = [":root {", "  /* Primary Color */"];

    if (this.config.includeHex) {
      variables.push(`  --color-primary: ${this.palette.primary.hex};`);
    }
    if (this.config.includeRgb) {
      variables.push(`  --color-primary-rgb: ${this.palette.primary.rgb};`);
    }
    if (this.config.includeHsl) {
      variables.push(`  --color-primary-hsl: ${this.palette.primary.hsl};`);
    }
    if (this.config.includeOklch) {
      variables.push(`  --color-primary-oklch: ${this.palette.primary.oklch};`);
    }
    if (this.config.includeTextColors) {
      variables.push(
        `  --color-primary-text: ${this.palette.primary.foregroundColor};`,
      );
    }

    if (this.config.includeAdditionalColors) {
      variables.push("  ", "  /* Generated Palette */");

      this.palette.colors.forEach((color, index) => {
        if (this.config.includeHex) {
          variables.push(`  --color-${index + 1}: ${color.hex};`);
        }
        if (this.config.includeRgb) {
          variables.push(`  --color-${index + 1}-rgb: ${color.rgb};`);
        }
        if (this.config.includeHsl) {
          variables.push(`  --color-${index + 1}-hsl: ${color.hsl};`);
        }
        if (this.config.includeOklch) {
          variables.push(`  --color-${index + 1}-oklch: ${color.oklch};`);
        }
        if (this.config.includeTextColors) {
          variables.push(
            `  --color-${index + 1}-text: ${color.foregroundColor};`,
          );
        }
      });
    }

    variables.push("}");

    return variables.join("\n");
  }
}

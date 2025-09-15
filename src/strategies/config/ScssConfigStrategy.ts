import { ConfigStrategy } from "./ConfigStrategy";

export class ScssConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const variables: string[] = [];

    if (this.config.includeHex) {
      variables.push(`$color-primary: ${this.palette.primary.hex};`);
    }
    if (this.config.includeRgb) {
      variables.push(`$color-primary-rgb: ${this.palette.primary.rgb};`);
    }
    if (this.config.includeHsl) {
      variables.push(`$color-primary-hsl: ${this.palette.primary.hsl};`);
    }
    if (this.config.includeOklch) {
      variables.push(`$color-primary-oklch: ${this.palette.primary.oklch};`);
    }
    if (this.config.includeTextColors) {
      variables.push(
        `$color-primary-text: ${this.palette.primary.foregroundColor};`,
      );
    }

    if (this.config.includeAdditionalColors && this.palette.colors.length > 0) {
      variables.push("");

      this.palette.colors.forEach((color, index) => {
        const colorName = `color-${index + 1}`;

        if (this.config.includeHex) {
          variables.push(`$color-${colorName}: ${color.hex};`);
        }
        if (this.config.includeRgb) {
          variables.push(`$color-${colorName}-rgb: ${color.rgb};`);
        }
        if (this.config.includeHsl) {
          variables.push(`$color-${colorName}-hsl: ${color.hsl};`);
        }
        if (this.config.includeOklch) {
          variables.push(`$color-${colorName}-oklch: ${color.oklch};`);
        }
        if (this.config.includeTextColors) {
          variables.push(`$color-${colorName}-text: ${color.foregroundColor};`);
        }
      });
    }

    return variables.join("\n");
  }
}

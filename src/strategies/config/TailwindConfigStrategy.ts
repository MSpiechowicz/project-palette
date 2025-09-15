import { ConfigStrategy } from "./ConfigStrategy";

export class TailwindConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    const colors: Record<string, string> = {
      primary: this.palette.primary.hex,
    };

    this.palette.colors.forEach((color, index) => {
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
}

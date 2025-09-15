import { ConfigStrategy } from "./ConfigStrategy";

export class ScssConfigStrategy extends ConfigStrategy {
  generate(): string {
    if (!this.palette) {
      return "";
    }

    return "";
  }
}

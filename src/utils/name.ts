/**
 * Converts a color name to a valid CSS variable name by converting to kebab-case
 * @param name - The color name to convert
 * @returns A valid CSS variable name in kebab-case
 */
export function toKebabCase(name: string): string {
  const camelCaseRegex = /([a-z])([A-Z])/g;
  const spacesRegex = /\s+/g;
  const nonAlphanumericRegex = /[^a-z0-9-]/g;
  const multipleConsecutiveHyphensRegex = /-+/g;
  const leadingTrailingHyphensRegex = /^-|-$/g;

  return name
    .replace(camelCaseRegex, "$1-$2")
    .replace(spacesRegex, "-")
    .toLowerCase()
    .replace(nonAlphanumericRegex, "")
    .replace(multipleConsecutiveHyphensRegex, "-")
    .replace(leadingTrailingHyphensRegex, "");
}

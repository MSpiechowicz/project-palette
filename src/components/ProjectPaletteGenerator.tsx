import { ConfigFormat } from "@/enums/config";
import type { ColorFormatConfig } from "@/interfaces/color";
import useColorStore from "@/stores/colorStore";
import { getConfigStrategy } from "@/strategies/config/ConfigFactory";
import { useCallback, useEffect } from "react";
import { generateColorPalette } from "../utils/colorPalette";
import { CodeSnippet } from "./CodeSnippet";
import { ConfigurationColors } from "./ConfigurationColors";
import { ConfigurationGeneral } from "./ConfigurationGeneral";

export function ProjectPaletteGenerator() {
  const {
    includeHex,
    includeRgb,
    includeHsl,
    includeOklch,
    includeAdditionalColors,
    includeTextColors,
    baseColor,
    palette,
    tailwindV3Config,
    tailwindV4Config,
    cssConfig,
    scssConfig,
    tailwindV3CopiedCode,
    tailwindV4CopiedCode,
    cssCopiedCode,
    scssCopiedCode,
    setPalette,
    setBaseColor,
    setIncludeAdditionalColors,
    setIncludeTextColors,
    setTailwindV3Config,
    setTailwindV4Config,
    setCssConfig,
    setScssConfig,
    setTailwindV3CopiedCode,
    setTailwindV4CopiedCode,
    setCssCopiedCode,
    setScssCopiedCode,
  } = useColorStore();

  const generatePalette = useCallback(() => {
    setPalette(generateColorPalette(baseColor));
  }, [baseColor, setPalette]);

  const setNewPrimaryColor = useCallback(
    (newColor: string) => {
      setBaseColor(newColor);
      setPalette(generateColorPalette(newColor));
    },
    [setPalette, setBaseColor],
  );

  //  const copyToClipboard =

  // Check if any color formats are enabled

  const hasAnyColorFormat =
    includeHex || includeRgb || includeHsl || includeOklch;

  //  const cssConfig = getConfigStrategy("css", palette, colorConfig).generate();
  //  //  const cssVariables = cssConfig.generateConfig();

  //  const scssConfig = getConfigStrategy("scss", palette, colorConfig).generate();
  //  //  const scssVariables = scssConfig.generateConfig();

  //  const tailwindConfig = getConfigStrategy(
  //    "tailwind",
  //    palette,
  //    colorConfig,
  //  ).generate();
  //  //  const tailwindVariables = tailwindConfig.generateConfig();

  //  const tailwindV4Config = getConfigStrategy(
  //    "tailwind-v4",
  //    palette,
  //    colorConfig,
  //  ).generate();
  //  const tailwindV4Variables = tailwindV4Config.generate();

  //  const cssVariables = palette
  //    ? generateCSSVariables(palette, colorConfig)
  //    : "";
  // const scssVariables = palette
  //  ? generateSCSSVariables(palette, colorConfig)
  //  : "";
  //  const tailwindConfig = palette
  //    ? generateTailwindV4Config(palette, colorConfig)
  //    : "";
  useEffect(() => {
    if (palette) {
      const colorConfig: ColorFormatConfig = {
        includeHex,
        includeRgb,
        includeHsl,
        includeOklch,
        includeAdditionalColors,
        includeTextColors,
      };

      const cssConfigStrategy = getConfigStrategy(
        ConfigFormat.CSS,
        palette,
        colorConfig,
      );
      const scssConfigStrategy = getConfigStrategy(
        ConfigFormat.SCSS,
        palette,
        colorConfig,
      );
      const tailwindV3ConfigStrategy = getConfigStrategy(
        ConfigFormat.TAILWIND_v3,
        palette,
        colorConfig,
      );
      const tailwindV4ConfigStrategy = getConfigStrategy(
        ConfigFormat.TAILWIND_V4,
        palette,
        colorConfig,
      );

      setCssConfig(cssConfigStrategy.generate());
      setScssConfig(scssConfigStrategy.generate());
      setTailwindV3Config(tailwindV3ConfigStrategy.generate());
      setTailwindV4Config(tailwindV4ConfigStrategy.generate());
    }
  }, [
    palette,
    setCssConfig,
    setScssConfig,
    setTailwindV3Config,
    setTailwindV4Config,
    includeAdditionalColors,
    includeHsl,
    includeTextColors,
    includeRgb,
    includeHex,
    includeOklch,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Color Palette Generator
          </h1>
          <p className="text-slate-600 text-lg">
            Generate harmonious color palettes from your favorite color
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <label
                htmlFor="base-color"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Base Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                />
                <input
                  id="base-color"
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={generatePalette}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Generate Palette
            </button>
          </div>
        </div>

        {/* Configuration Toggles */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Output Configuration
          </h3>

          <div className="space-y-4">
            <ConfigurationGeneral
              label="Include Additional Colors"
              description="When enabled, includes all generated palette colors. When disabled, only the primary color is included."
              checked={includeAdditionalColors}
              onChange={setIncludeAdditionalColors}
            />

            <ConfigurationGeneral
              label="Include Text Colors"
              description="When enabled, includes WCAG-compliant text colors for each background color in the generated configurations."
              checked={includeTextColors}
              onChange={setIncludeTextColors}
            />

            <p className="text-sm text-slate-600 mb-4">
              Choose which color formats to include in the generated
              configuration for the CSS and Tailwind.
            </p>

            <ConfigurationColors />

            {/* Warning when no formats selected */}
            {!hasAnyColorFormat && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-amber-800">
                    No color formats selected
                  </span>
                </div>
                <p className="text-sm text-amber-700 mt-1 ml-7">
                  Please enable at least one color format (HEX, RGB, HSL, OKLCH,
                  or TEXT) to generate code output.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Color Palette Display */}
        {palette && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Color Variations
            </h2>

            {/* Primary Color */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-slate-700 mb-3">
                Primary Color
              </h3>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div
                  className="w-16 h-16 rounded-lg shadow-md"
                  style={{ backgroundColor: palette.primary.hex }}
                />
                <div className="flex-1">
                  <div className="font-mono text-sm text-slate-600 mb-2">
                    {palette.primary.hex}
                  </div>
                  <div className="font-mono text-sm text-slate-500 mb-2">
                    {palette.primary.rgb}
                  </div>
                  <div className="font-mono text-sm text-slate-500 mb-2">
                    {palette.primary.hsl}
                  </div>
                  <div className="font-mono text-sm text-slate-500 mb-3">
                    {palette.primary.oklch}
                  </div>

                  {/* Foreground Color Suggestion */}
                  <div className="border-t border-slate-200 pt-3">
                    <div className="text-xs font-medium text-slate-700 mb-2">
                      Recommended Text Color
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded border border-slate-300"
                        style={{
                          backgroundColor: palette.primary.foregroundColor,
                        }}
                      />
                      <div>
                        <div className="font-mono text-sm text-slate-600">
                          {palette.primary.foregroundColor}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            Contrast: {palette.primary.contrastRatio.toFixed(1)}
                            :1
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              palette.primary.wcagLevel === "AAA"
                                ? "bg-green-100 text-green-800"
                                : palette.primary.wcagLevel === "AA"
                                  ? "bg-blue-100 text-blue-800"
                                  : palette.primary.wcagLevel === "A"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            WCAG {palette.primary.wcagLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Colors */}
            {palette.colors.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-3">
                    Click any color to make it your new primary color and
                    generate a new palette:
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {palette.colors.map((color, index) => (
                    <div key={`${color.hex}-${index}`} className="group">
                      <div
                        className="w-full h-20 rounded-lg shadow-md mb-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-white"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setNewPrimaryColor(color.hex)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setNewPrimaryColor(color.hex);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        title={`Click to make ${color.name} your primary color`}
                      />
                      <div className="text-center">
                        <div className="font-mono text-xs text-slate-600 mb-1">
                          {color.hex}
                        </div>
                        <div className="text-xs text-slate-500 font-medium mb-2">
                          {color.name}
                        </div>

                        {/* Foreground Color Info */}
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div
                            className="w-3 h-3 rounded border border-slate-300"
                            style={{ backgroundColor: color.foregroundColor }}
                            title={`Text color: ${color.foregroundColor}`}
                          />
                          <span
                            className={`px-1 py-0.5 rounded text-xs font-medium ${
                              color.wcagLevel === "AAA"
                                ? "bg-green-100 text-green-800"
                                : color.wcagLevel === "AA"
                                  ? "bg-blue-100 text-blue-800"
                                  : color.wcagLevel === "A"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {color.wcagLevel}
                          </span>
                        </div>

                        <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to select
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-slate-500 mb-2">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  No Color Variations Available
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  This color is too dark or too light to generate usable
                  variations. Try selecting a color with medium brightness for
                  the best results.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Code Output Sections */}
        {palette && hasAnyColorFormat && (
          <div className="space-y-6">
            <CodeSnippet
              config={cssConfig}
              copiedCode={cssCopiedCode}
              setCopiedCode={setCssCopiedCode}
              title="CSS"
            />
            <CodeSnippet
              config={scssConfig}
              copiedCode={scssCopiedCode}
              setCopiedCode={setScssCopiedCode}
              title="SCSS"
            />
            <CodeSnippet
              config={tailwindV3Config}
              copiedCode={tailwindV3CopiedCode}
              setCopiedCode={setTailwindV3CopiedCode}
              title="Tailwind CSS v3"
            />
            <CodeSnippet
              config={tailwindV4Config}
              copiedCode={tailwindV4CopiedCode}
              setCopiedCode={setTailwindV4CopiedCode}
              title="Tailwind CSS v4"
            />
            {/*<div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Tailwind CSS v4 Configuration
                  </h2>
                  <div className="flex gap-2 mt-1">
                    {includeHex && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        HEX
                      </span>
                    )}
                    {includeRgb && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        RGB
                      </span>
                    )}
                    {includeHsl && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        HSL
                      </span>
                    )}
                    {includeOklch && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                        OKLCH
                      </span>
                    )}
                    {includeTextColors && (
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded">
                        TEXT
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(tailwindV4Config, setTailwindV4CopiedCode)
                  }
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  {tailwindV4CopiedCode ? "Copied!" : "Copy Config"}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{tailwindV4Config}</code>
              </pre>
            </div>*/}
          </div>
        )}

        {/* Instructions */}
        {!palette && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-slate-500">
              <p className="text-lg mb-2">
                🎨 Ready to create your color palette?
              </p>
              <p>
                Choose your favorite color and click "Generate Palette" to get
                started!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

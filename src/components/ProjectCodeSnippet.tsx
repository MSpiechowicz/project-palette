import Clipboard from "@/assets/clipboard.svg";
import useColorStore from "@/stores/colorStore";
import { copyToClipboard } from "@/utils/clipboard";

export function ProjectCodeSnippet({
  config,
  copiedCode,
  setCopiedCode,
  title,
}: {
  config: string;
  copiedCode: boolean;
  setCopiedCode: (copiedCode: boolean) => void;
  title: string;
}) {
  const {
    includeHex,
    includeRgb,
    includeHsl,
    includeOklch,
    includeTextColors,
  } = useColorStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <div className="flex gap-2 mt2">
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
          onClick={() => copyToClipboard(config, setCopiedCode)}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium flex items-center"
        >
          <img src={Clipboard} alt="Clipboard" className="w-4 h-4 mr-2" />
          {copiedCode ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{config}</code>
      </pre>
    </div>
  );
}

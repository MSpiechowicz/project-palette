import useColorStore from "@/stores/colorStore";

export function ProjectWarningNotification() {
  const { hasAnyColorFormat } = useColorStore();

  if (hasAnyColorFormat) {
    return null;
  }

  return (
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
        Please enable at least one color format (HEX, RGB, HSL, OKLCH, or TEXT)
        to generate code output.
      </p>
    </div>
  );
}

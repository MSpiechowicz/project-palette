export function ProjectSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-200 rounded-full animate-spin border-t-blue-600" />
        <div
          className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-r-blue-400"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
      </div>

      <div className="text-center">
        <p className="text-slate-600 font-medium">Loading Project Palette</p>
        <p className="text-slate-400 text-sm mt-1">
          Preparing your color tools...
        </p>
      </div>
    </div>
  );
}

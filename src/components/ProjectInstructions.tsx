import useColorStore from "@/stores/colorStore";

export function ProjectInstructions() {
  const { palette } = useColorStore();

  if (palette) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <div className="text-slate-500">
        <p className="text-lg mb-2">🎨 Ready to create your color palette?</p>
        <p>
          Choose your favorite color and click "Generate Palette" to get
          started!
        </p>
      </div>
    </div>
  );
}

import useColorStore from "@/stores/colorStore";

export function ProjectInstructions() {
  const { palette } = useColorStore();

  if (palette) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <div className="flex flex-col">
        <h4 className="text-2xl mb-2 font-bold">Ready to create your color palette?</h4>
        <p className="text-md">
          Choose your favorite color and click "Generate Palette" to get
          started!
        </p>
      </div>
    </div>
  );
}

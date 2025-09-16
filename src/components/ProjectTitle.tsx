import Logo from "../assets/logo.png";

export function ProjectTitle() {
  return (
    <div className="bg-black rounded-2xl text-center mb-8 p-6 flex flex-row justify-center items-center">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <img
            src={Logo}
            alt="Color Palette Generator"
            className="hidden sm:block w-12 h-12"
          />
          <h1 className="text-4xl font-bold text-white mb-2">
            Project Palette
          </h1>
        </div>
        <p className="text-white text-lg">
          Generate harmonious color palettes from your favorite color
        </p>
      </div>
    </div>
  );
}

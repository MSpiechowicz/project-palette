import useColorStore from "@/stores/colorStore";
import { ProjectCodeSnippet } from "./ProjectCodeSnippet";

export function ProjectCodeSnippets() {
  const {
    palette,
    hasAnyColorFormat,
    cssConfig,
    scssConfig,
    tailwindV3Config,
    tailwindV4Config,
    cssCopiedCode,
    scssCopiedCode,
    tailwindV3CopiedCode,
    tailwindV4CopiedCode,
    setCssCopiedCode,
    setScssCopiedCode,
    setTailwindV3CopiedCode,
    setTailwindV4CopiedCode,
  } = useColorStore();

  if (!palette || !hasAnyColorFormat) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ProjectCodeSnippet
        config={cssConfig}
        copiedCode={cssCopiedCode}
        setCopiedCode={setCssCopiedCode}
        title="CSS"
      />
      <ProjectCodeSnippet
        config={scssConfig}
        copiedCode={scssCopiedCode}
        setCopiedCode={setScssCopiedCode}
        title="SCSS"
      />
      <ProjectCodeSnippet
        config={tailwindV3Config}
        copiedCode={tailwindV3CopiedCode}
        setCopiedCode={setTailwindV3CopiedCode}
        title="Tailwind CSS v3"
      />
      <ProjectCodeSnippet
        config={tailwindV4Config}
        copiedCode={tailwindV4CopiedCode}
        setCopiedCode={setTailwindV4CopiedCode}
        title="Tailwind CSS v4"
      />
    </div>
  );
}

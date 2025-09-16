import useColorStore from "@/stores/colorStore";
import { ProjectAnimatedSection } from "./ProjectAnimatedSection";
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
      <ProjectAnimatedSection delay={0}>
        <ProjectCodeSnippet
          config={cssConfig}
          copiedCode={cssCopiedCode}
          setCopiedCode={setCssCopiedCode}
          title="CSS"
        />
      </ProjectAnimatedSection>
      <ProjectAnimatedSection delay={100}>
        <ProjectCodeSnippet
          config={scssConfig}
          copiedCode={scssCopiedCode}
          setCopiedCode={setScssCopiedCode}
          title="SCSS"
        />
      </ProjectAnimatedSection>
      <ProjectAnimatedSection delay={200}>
        <ProjectCodeSnippet
          config={tailwindV3Config}
          copiedCode={tailwindV3CopiedCode}
          setCopiedCode={setTailwindV3CopiedCode}
          title="Tailwind CSS v3"
        />
      </ProjectAnimatedSection>
      <ProjectAnimatedSection delay={300}>
        <ProjectCodeSnippet
          config={tailwindV4Config}
          copiedCode={tailwindV4CopiedCode}
          setCopiedCode={setTailwindV4CopiedCode}
          title="Tailwind CSS v4"
        />
      </ProjectAnimatedSection>
    </div>
  );
}

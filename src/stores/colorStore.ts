import type { ColorPalette } from '@/interfaces/color'
import { create } from 'zustand'

interface ColorStore {
  includeHex: boolean
  includeRgb: boolean
  includeHsl: boolean
  includeOklch: boolean
  hasAnyColorFormat: boolean
  includeAdditionalColors: boolean
  includeTextColors: boolean
  palette: ColorPalette | null
  baseColor: string
  tailwindV3Config: string
  tailwindV4Config: string
  cssConfig: string
  scssConfig: string
  tailwindV3CopiedCode: boolean
  tailwindV4CopiedCode: boolean
  cssCopiedCode: boolean
  scssCopiedCode: boolean
  setIncludeHex: (includeHex: boolean) => void
  setIncludeRgb: (includeRgb: boolean) => void
  setIncludeHsl: (includeHsl: boolean) => void
  setIncludeOklch: (includeOklch: boolean) => void
  setIncludeAdditionalColors: (includeAdditionalColors: boolean) => void
  setIncludeTextColors: (includeTextColors: boolean) => void
  setPalette: (palette: ColorPalette | null) => void
  setBaseColor: (baseColor: string) => void
  setTailwindV3Config: (tailwindV3Config: string) => void
  setTailwindV4Config: (tailwindV4Config: string) => void
  setCssConfig: (cssConfig: string) => void
  setScssConfig: (cssConfig: string) => void
  setTailwindV3CopiedCode: (tailwindV3CopiedCode: boolean) => void
  setTailwindV4CopiedCode: (tailwindV4CopiedCode: boolean) => void
  setCssCopiedCode: (cssCopiedCode: boolean) => void
  setScssCopiedCode: (scssCopiedCode: boolean) => void
  setHasAnyColorFormat: (hasAnyColorFormat: boolean) => void
}

const useColorStore = create<ColorStore>((set) => ({
  includeHex: true,
  includeRgb: true,
  includeHsl: true,
  includeOklch: true,
  hasAnyColorFormat: true,
  includeAdditionalColors: false,
  includeTextColors: true,
  palette: null,
  baseColor: "#3b82f6",
  tailwindV3Config: "",
  tailwindV4Config: "",
  cssConfig: "",
  scssConfig: "",
  tailwindV3CopiedCode: false,
  tailwindV4CopiedCode: false,
  cssCopiedCode: false,
  scssCopiedCode: false,
  setIncludeHex: (includeHex: boolean) => set({ includeHex }),
  setIncludeRgb: (includeRgb: boolean) => set({ includeRgb }),
  setIncludeHsl: (includeHsl: boolean) => set({ includeHsl }),
  setIncludeOklch: (includeOklch: boolean) => set({ includeOklch }),
  setHasAnyColorFormat: (hasAnyColorFormat: boolean) => set({ hasAnyColorFormat }),
  setIncludeAdditionalColors: (includeAdditionalColors: boolean) => set({ includeAdditionalColors }),
  setIncludeTextColors: (includeTextColors: boolean) => set({ includeTextColors }),
  setPalette: (palette: ColorPalette | null) => set({ palette }),
  setBaseColor: (baseColor: string) => set({ baseColor }),
  setTailwindV3Config: (tailwindV3Config: string) => set({ tailwindV3Config }),
  setTailwindV4Config: (tailwindV4Config: string) => set({ tailwindV4Config }),
  setCssConfig: (cssConfig: string) => set({ cssConfig }),
  setScssConfig: (scssConfig: string) => set({ scssConfig }),
  setTailwindV3CopiedCode: (tailwindV3CopiedCode: boolean) => set({ tailwindV3CopiedCode }),
  setTailwindV4CopiedCode: (tailwindV4CopiedCode: boolean) => set({ tailwindV4CopiedCode }),
  setCssCopiedCode: (cssCopiedCode: boolean) => set({ cssCopiedCode }),
  setScssCopiedCode: (scssCopiedCode: boolean) => set({ scssCopiedCode }),
}))

export default useColorStore;

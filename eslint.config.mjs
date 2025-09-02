// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  // 1) Cargamos la config de Next
  ...compat.extends("next/core-web-vitals"),

  // 2) Tus ignores + overrides (van DESPUÉS para que ganen prioridad)
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/quotes": "off",
      "quotes": "off",                 // <- clave para tu caso
      "no-useless-escape": "off",
    },
  },
];

export default eslintConfig;

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.ts"];
const jsFiles = ["**/*.js", "**/*.mjs", "**/*.cjs"];
const withFiles = (configs, files) =>
  configs.map((config) => ({ ...config, files }));

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      ".claude/skills/**",
      "vendor/**",
      "docs/.vitepress/dist/**",
      "docs/.vitepress/cache/**",
    ],
  },
  {
    files: jsFiles,
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: tsFiles,
    ...js.configs.recommended,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
  },
  ...withFiles(tseslint.configs.strictTypeChecked, tsFiles),
  ...withFiles(tseslint.configs.stylisticTypeChecked, tsFiles),
  {
    files: tsFiles,
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-expect-error": "allow-with-description",
        },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],
    },
  },
  {
    files: tsFiles,
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message: "Use a string-literal union; FDS forbids domain enums.",
        },
        {
          selector: "TSInterfaceDeclaration",
          message:
            "Use a readonly type alias; interfaces are open to declaration merging.",
        },
      ],
    },
  },
  {
    files: [
      "src/sras/cli.ts",
      "src/sras/cli/**/*.ts",
      "src/sras/adapters/output.ts",
    ],
    rules: {
      "no-console": "off",
    },
  },
);

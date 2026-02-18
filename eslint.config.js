import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import-x";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const fsdLayerOrder = [
  "@/app",
  "@/pages",
  "@/widgets",
  "@/features",
  "@/entities",
  "@/shared",
];

/** @type {import("eslint").Linter.Config[]} */
export default tseslint.config(
  // глобальные игноры
  {
    ignores: ["dist/**", "node_modules/**", "vite.config.ts"],
  },

  // базовые правила JS
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  //  React
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },

  //  Import ordering (FSD)
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "import-x": importPlugin,
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          project: ["./tsconfig.json"], // Adjust path(s) as needed
        },
      },
    },
    rules: {
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: fsdLayerOrder.map((pattern) => ({
            pattern: `${pattern}/**`,
            group: "internal",
            position: "before",
          })),
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      //  FSD: запрет импортов сверху вниз
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            // shared не может импортировать ничего выше
            {
              target: "./src/shared/**",
              from: "./src/{entities,features,widgets,pages,app}/**",
              message: "shared cannot import from upper layers",
            },
            // entities → только shared
            {
              target: "./src/entities/**",
              from: "./src/{features,widgets,pages,app}/**",
              message: "entities can only import from shared",
            },
            // features → entities + shared
            {
              target: "./src/features/**",
              from: "./src/{widgets,pages,app}/**",
              message: "features can only import from entities and shared",
            },
            // widgets → features + entities + shared
            {
              target: "./src/widgets/**",
              from: "./src/{pages,app}/**",
              message: "widgets can only import from features, entities and shared",
            },
            // pages → widgets + features + entities + shared
            {
              target: "./src/pages/**",
              from: "./src/app/**",
              message: "pages cannot import from app",
            },
          ],
        },
      ],
    },
  },

  //  TypeScript-специфичные правила
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    },
  },

  //  Prettier (должен быть последним)
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
);

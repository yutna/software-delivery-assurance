import { defineConfig } from "vitepress";
import type { DefaultTheme, UserConfig } from "vitepress";

const REPOSITORY = "https://github.com/yutna/software-delivery-assurance";

const readBase = (value: string | undefined): string => {
  if (value === undefined || value === "") return "/";
  const withLeading = value.startsWith("/") ? value : `/${value}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};

const enNav: DefaultTheme.NavItem[] = [
  { text: "Guide", link: "/en/quick-start" },
  { text: "Reference", link: "/en/reference/" },
  { text: "Project template", link: "/en/templates/project" },
];

const thNav: DefaultTheme.NavItem[] = [
  { text: "คู่มือ", link: "/th/quick-start" },
  { text: "Reference", link: "/en/reference/" },
  { text: "Template โปรเจกต์", link: "/th/templates/project" },
];

const enSidebar: DefaultTheme.Sidebar = [
  {
    text: "Guide",
    items: [
      { text: "Quick start", link: "/en/quick-start" },
      { text: "Project template", link: "/en/templates/project" },
    ],
  },
  {
    text: "Reference",
    items: [{ text: "SRAS reference", link: "/en/reference/" }],
  },
];

const thSidebar: DefaultTheme.Sidebar = [
  {
    text: "คู่มือ",
    items: [
      { text: "เริ่มต้นอย่างรวดเร็ว", link: "/th/quick-start" },
      { text: "Template โปรเจกต์", link: "/th/templates/project" },
    ],
  },
  {
    text: "Reference",
    items: [{ text: "SRAS reference (ภาษาอังกฤษ)", link: "/en/reference/" }],
  },
];

/**
 * The site config carries `version` for `tools/check-version.ts`, so it is
 * typed as the VitePress config plus that one repository field. Keep the
 * literal on its own line; the version checker reads it from this file.
 */
const config = {
  version: "0.6.0",
  title: "Software Delivery Assurance",
  description:
    "Open, evidence-based assurance for software delivery: SRAS standards, registers, and tools.",
  base: readBase(process.env["DOCS_BASE"]),
  lastUpdated: true,
  head: [["meta", { name: "theme-color", content: "#0f766e" }]],
  vite: {
    build: { chunkSizeWarningLimit: 1200 },
    esbuild: {
      // VitePress 1.6 bundles an esbuild release that does not know the
      // project's ES2024 target. The site only needs an evergreen browser
      // target; TypeScript still type-checks against ES2024.
      target: "es2022",
      tsconfigRaw: { compilerOptions: { target: "es2022" } },
    },
  },
  locales: {
    "/en/": {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
      },
    },
    "/th/": {
      label: "ไทย",
      lang: "th-TH",
      link: "/th/",
      themeConfig: {
        nav: thNav,
        sidebar: thSidebar,
      },
    },
  },
  themeConfig: {
    socialLinks: [{ icon: "github", link: REPOSITORY }],
    search: { provider: "local" },
    editLink: {
      pattern: `${REPOSITORY}/edit/main/docs/:path`,
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT licence. Not legal advice.",
      copyright: "SRAS — Software Delivery Assurance Library",
    },
  },
} satisfies UserConfig<DefaultTheme.Config> & { readonly version: string };

export default defineConfig(config);

import { defineConfig } from "vitepress";
import type { DefaultTheme, UserConfig } from "vitepress";

const REPOSITORY = "https://github.com/yutna/software-delivery-assurance";

const readBase = (value: string | undefined): string => {
  if (value === undefined || value === "") return "/";
  const withLeading = value.startsWith("/") ? value : `/${value}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};

const enNav: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    items: [
      { text: "Overview", link: "/en/overview" },
      { text: "Quick start", link: "/en/quick-start" },
      { text: "Glossary", link: "/en/glossary" },
    ],
  },
  { text: "Concepts", link: "/en/concepts/", activeMatch: "/en/concepts/" },
  { text: "Sectors", link: "/en/sectors/", activeMatch: "/en/sectors/" },
  { text: "Registers", link: "/en/registers/", activeMatch: "/en/registers/" },
  { text: "Reference", link: "/en/reference/" },
  { text: "Templates", link: "/en/templates/", activeMatch: "/en/templates/" },
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
      { text: "Overview", link: "/en/overview" },
      { text: "Quick start", link: "/en/quick-start" },
      { text: "Glossary", link: "/en/glossary" },
    ],
  },
  {
    text: "Concepts",
    items: [
      { text: "Concepts overview", link: "/en/concepts/" },
      {
        text: "Requirements and criticality",
        link: "/en/concepts/requirements",
      },
      { text: "Profiles and maturity", link: "/en/concepts/profiles" },
      {
        text: "Modules and overlays",
        link: "/en/concepts/modules-and-overlays",
      },
      { text: "Resolution", link: "/en/concepts/resolution" },
      { text: "Project instances", link: "/en/concepts/project-instance" },
      {
        text: "Claims and evidence",
        link: "/en/concepts/claims-and-evidence",
      },
      { text: "Tools and checks", link: "/en/concepts/tools" },
    ],
  },
  {
    text: "Sectors",
    items: [
      { text: "Sector overview", link: "/en/sectors/" },
      { text: "Finance", link: "/en/sectors/finance" },
      { text: "E-commerce", link: "/en/sectors/e-commerce" },
      { text: "Logistics", link: "/en/sectors/logistics" },
      { text: "Public sector", link: "/en/sectors/public-sector" },
    ],
  },
  {
    text: "Registers",
    items: [{ text: "Register index", link: "/en/registers/" }],
  },
  {
    text: "Templates",
    items: [
      { text: "Templates overview", link: "/en/templates/" },
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

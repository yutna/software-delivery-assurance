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
      {
        text: "Template readiness",
        link: "/en/governance/template-readiness",
      },
      {
        text: "Confidence labels",
        link: "/en/governance/confidence-labels",
      },
      {
        text: "Legal concerns",
        link: "/en/governance/legal-concerns",
      },
      {
        text: "Accessibility",
        link: "/en/governance/accessibility",
      },
      {
        text: "AI audit and limitations",
        link: "/en/governance/v1-readiness",
      },
      {
        text: "External review packet (adopter)",
        link: "/en/governance/external-review-packet",
      },
      {
        text: "Thai review kit (adopter)",
        link: "/en/governance/thai-review-kit",
      },
      {
        text: "Review policy",
        link: "/en/governance/review-policy",
      },
      {
        text: "AI audit record",
        link: "/en/governance/v1-audit",
      },
      {
        text: "v1.1.0 release notes",
        link: "/en/releases/v1.1.0",
      },
      {
        text: "v1.1.0 announcement",
        link: "/en/announcements/v1.1.0",
      },
      {
        text: "v1.0.0 release notes",
        link: "/en/releases/v1.0.0",
      },
      {
        text: "v1.0.0 announcement",
        link: "/en/announcements/v1.0.0",
      },
    ],
  },
  { text: "Concepts", link: "/en/concepts/", activeMatch: "/en/concepts/" },
  { text: "Sectors", link: "/en/sectors/", activeMatch: "/en/sectors/" },
  { text: "Registers", link: "/en/registers/", activeMatch: "/en/registers/" },
  { text: "Pilots", link: "/en/pilots/", activeMatch: "/en/pilots/" },
  { text: "Reference", link: "/en/reference/" },
  { text: "Templates", link: "/en/templates/", activeMatch: "/en/templates/" },
];

const thNav: DefaultTheme.NavItem[] = [
  {
    text: "คู่มือ",
    items: [
      { text: "ภาพรวม", link: "/th/overview" },
      { text: "เริ่มต้นอย่างรวดเร็ว", link: "/th/quick-start" },
      { text: "อภิธานศัพท์", link: "/th/glossary" },
      {
        text: "ความพร้อมของ template",
        link: "/th/governance/template-readiness",
      },
      {
        text: "Confidence labels",
        link: "/th/governance/confidence-labels",
      },
      {
        text: "ข้อกังวลทางกฎหมาย",
        link: "/th/governance/legal-concerns",
      },
      {
        text: "Accessibility",
        link: "/th/governance/accessibility",
      },
      {
        text: "AI audit และข้อจำกัด",
        link: "/th/governance/v1-readiness",
      },
      {
        text: "External review packet (adopter)",
        link: "/th/governance/external-review-packet",
      },
      {
        text: "Thai review kit (adopter)",
        link: "/th/governance/thai-review-kit",
      },
      {
        text: "นโยบายการทบทวน",
        link: "/th/governance/review-policy",
      },
      {
        text: "บันทึก AI audit",
        link: "/th/governance/v1-audit",
      },
      {
        text: "Release notes v1.1.0",
        link: "/th/releases/v1.1.0",
      },
      {
        text: "Announcement v1.1.0",
        link: "/th/announcements/v1.1.0",
      },
      {
        text: "Release notes v1.0.0",
        link: "/th/releases/v1.0.0",
      },
      {
        text: "Announcement v1.0.0",
        link: "/th/announcements/v1.0.0",
      },
    ],
  },
  { text: "แนวคิด", link: "/th/concepts/", activeMatch: "/th/concepts/" },
  { text: "ภาคธุรกิจ", link: "/th/sectors/", activeMatch: "/th/sectors/" },
  { text: "ทะเบียน", link: "/th/registers/", activeMatch: "/th/registers/" },
  { text: "การนำร่อง", link: "/th/pilots/", activeMatch: "/th/pilots/" },
  { text: "Reference", link: "/th/reference/" },
  { text: "Templates", link: "/th/templates/", activeMatch: "/th/templates/" },
];

const enSidebar: DefaultTheme.Sidebar = [
  {
    text: "Guide",
    items: [
      { text: "Overview", link: "/en/overview" },
      { text: "Quick start", link: "/en/quick-start" },
      { text: "Glossary", link: "/en/glossary" },
      {
        text: "Template readiness",
        link: "/en/governance/template-readiness",
      },
      {
        text: "Confidence labels",
        link: "/en/governance/confidence-labels",
      },
      {
        text: "Legal concerns",
        link: "/en/governance/legal-concerns",
      },
      {
        text: "Accessibility",
        link: "/en/governance/accessibility",
      },
      {
        text: "AI audit and limitations",
        link: "/en/governance/v1-readiness",
      },
      {
        text: "External review packet (adopter)",
        link: "/en/governance/external-review-packet",
      },
      {
        text: "Thai review kit (adopter)",
        link: "/en/governance/thai-review-kit",
      },
      {
        text: "Review policy",
        link: "/en/governance/review-policy",
      },
      {
        text: "AI audit record",
        link: "/en/governance/v1-audit",
      },
      {
        text: "v1.1.0 release notes",
        link: "/en/releases/v1.1.0",
      },
      {
        text: "v1.1.0 announcement",
        link: "/en/announcements/v1.1.0",
      },
      {
        text: "v1.0.0 release notes",
        link: "/en/releases/v1.0.0",
      },
      {
        text: "v1.0.0 announcement",
        link: "/en/announcements/v1.0.0",
      },
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
    items: [
      { text: "Register index", link: "/en/registers/" },
      {
        text: "ASEAN comparison",
        link: "/en/registers/asean-comparison",
      },
      {
        text: "EU comparison",
        link: "/en/registers/eu-comparison",
      },
    ],
  },
  {
    text: "Templates",
    items: [
      { text: "Templates overview", link: "/en/templates/" },
      { text: "Project template", link: "/en/templates/project" },
      {
        text: "AI-assisted assessment",
        link: "/en/templates/ai-assessment",
      },
      { text: "Validate in CI", link: "/en/templates/ci-validation" },
      { text: "Upgrade a 1.x instance", link: "/en/templates/upgrade-1x" },
      { text: "e2e walkthrough", link: "/en/templates/e2e-walkthrough" },
      { text: "Owner map", link: "/en/templates/owner-map" },
    ],
  },
  {
    text: "Pilots",
    items: [
      { text: "Pilot overview", link: "/en/pilots/" },
      { text: "Finance pilot", link: "/en/pilots/finance" },
      { text: "Public sector pilot", link: "/en/pilots/public-sector" },
      { text: "Pilot summary", link: "/en/pilots/summary" },
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
      { text: "ภาพรวม", link: "/th/overview" },
      { text: "เริ่มต้นอย่างรวดเร็ว", link: "/th/quick-start" },
      { text: "อภิธานศัพท์", link: "/th/glossary" },
      {
        text: "ความพร้อมของ template",
        link: "/th/governance/template-readiness",
      },
      {
        text: "Confidence labels",
        link: "/th/governance/confidence-labels",
      },
      {
        text: "ข้อกังวลทางกฎหมาย",
        link: "/th/governance/legal-concerns",
      },
      {
        text: "Accessibility",
        link: "/th/governance/accessibility",
      },
      {
        text: "AI audit และข้อจำกัด",
        link: "/th/governance/v1-readiness",
      },
      {
        text: "External review packet (adopter)",
        link: "/th/governance/external-review-packet",
      },
      {
        text: "Thai review kit (adopter)",
        link: "/th/governance/thai-review-kit",
      },
      {
        text: "นโยบายการทบทวน",
        link: "/th/governance/review-policy",
      },
      {
        text: "บันทึก AI audit",
        link: "/th/governance/v1-audit",
      },
      {
        text: "Release notes v1.1.0",
        link: "/th/releases/v1.1.0",
      },
      {
        text: "Announcement v1.1.0",
        link: "/th/announcements/v1.1.0",
      },
      {
        text: "Release notes v1.0.0",
        link: "/th/releases/v1.0.0",
      },
      {
        text: "Announcement v1.0.0",
        link: "/th/announcements/v1.0.0",
      },
    ],
  },
  {
    text: "แนวคิด",
    items: [
      { text: "ภาพรวมแนวคิด", link: "/th/concepts/" },
      {
        text: "ข้อกำหนดและ criticality",
        link: "/th/concepts/requirements",
      },
      { text: "Profile และ maturity", link: "/th/concepts/profiles" },
      {
        text: "Module และ overlay",
        link: "/th/concepts/modules-and-overlays",
      },
      { text: "Resolution", link: "/th/concepts/resolution" },
      { text: "Project instance", link: "/th/concepts/project-instance" },
      {
        text: "Claim และ evidence",
        link: "/th/concepts/claims-and-evidence",
      },
      { text: "เครื่องมือและการตรวจสอบ", link: "/th/concepts/tools" },
    ],
  },
  {
    text: "ภาคธุรกิจ",
    items: [
      { text: "ภาพรวมภาคธุรกิจ", link: "/th/sectors/" },
      { text: "การเงิน", link: "/th/sectors/finance" },
      { text: "อีคอมเมิร์ซ", link: "/th/sectors/e-commerce" },
      { text: "โลจิสติกส์", link: "/th/sectors/logistics" },
      { text: "ภาครัฐ", link: "/th/sectors/public-sector" },
    ],
  },
  {
    text: "ทะเบียน",
    items: [
      { text: "ดัชนีทะเบียน", link: "/th/registers/" },
      {
        text: "การเปรียบเทียบอาเซียน",
        link: "/th/registers/asean-comparison",
      },
      {
        text: "การเปรียบเทียบสหภาพยุโรป",
        link: "/th/registers/eu-comparison",
      },
    ],
  },
  {
    text: "Templates",
    items: [
      { text: "ภาพรวม templates", link: "/th/templates/" },
      { text: "Template โปรเจกต์", link: "/th/templates/project" },
      {
        text: "การประเมินด้วย AI",
        link: "/th/templates/ai-assessment",
      },
      { text: "ตรวจสอบใน CI", link: "/th/templates/ci-validation" },
      { text: "อัปเกรดอินสแตนซ์ 1.x", link: "/th/templates/upgrade-1x" },
      { text: "ตัวอย่าง e2e", link: "/th/templates/e2e-walkthrough" },
      { text: "Owner map", link: "/th/templates/owner-map" },
    ],
  },
  {
    text: "การนำร่อง",
    items: [
      { text: "ภาพรวมการนำร่อง", link: "/th/pilots/" },
      { text: "การนำร่องด้านการเงิน", link: "/th/pilots/finance" },
      { text: "การนำร่องภาครัฐ", link: "/th/pilots/public-sector" },
      { text: "สรุปการนำร่อง", link: "/th/pilots/summary" },
    ],
  },
  {
    text: "Reference",
    items: [{ text: "ดัชนี reference", link: "/th/reference/" }],
  },
];

/**
 * The site config carries `version` for `tools/check-version.ts`, so it is
 * typed as the VitePress config plus that one repository field. Keep the
 * literal on its own line; the version checker reads it from this file.
 */
const config = {
  version: "1.1.0",
  title: "Software Delivery Assurance",
  description:
    "Open, evidence-based assurance for software delivery: SRAS reference requirements, registers, and tools.",
  base: readBase(process.env["DOCS_BASE"]),
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
    [
      "meta",
      {
        name: "robots",
        content:
          "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate, noai, noimageai",
      },
    ],
    [
      "meta",
      {
        name: "googlebot",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
    ],
    [
      "meta",
      {
        name: "bingbot",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
    ],
  ],
  /**
   * The default theme sets the appearance switch title in a client-only
   * effect, so the server-rendered button has no accessible name. Add one at
   * build time; `npm run check:a11y` fails if this stops matching.
   */
  transformHtml: (html: string): string =>
    html.replace(
      /(<button[^>]*class="VPSwitch VPSwitchAppearance"[^>]*?)>/gu,
      '$1 aria-label="Dark theme">',
    ),
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
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
      },
    },
    th: {
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
    socialLinks: [
      { icon: "github", link: REPOSITORY, ariaLabel: "GitHub repository" },
    ],
    search: { provider: "local" },
    i18nRouting: false,
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

export type TranslationStatus = "complete" | "partial" | "missing";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isTranslationStatus = (value: unknown): value is TranslationStatus =>
  value === "complete" || value === "partial" || value === "missing";

/**
 * Reads the translation status from a page's frontmatter. A page without the
 * field is canonical content, so the default is `complete`.
 */
export const readTranslationStatus = (
  frontmatter: unknown,
): TranslationStatus => {
  if (!isRecord(frontmatter)) return "complete";
  const value = frontmatter["translation_status"];
  return isTranslationStatus(value) ? value : "complete";
};

/**
 * Reports whether the page used a machine draft. Only an explicit `true`
 * counts; a missing or malformed value is treated as human-authored.
 */
export const readMachineTranslated = (frontmatter: unknown): boolean => {
  if (!isRecord(frontmatter)) return false;
  return frontmatter["machine_translated"] === true;
};

/**
 * Reports whether a page declares its translation state. Generated reference
 * pages have no frontmatter, so they are excluded from page-level language
 * links even though their effective status is canonical.
 */
export const hasTranslationStatus = (frontmatter: unknown): boolean => {
  if (!isRecord(frontmatter)) return false;
  return isTranslationStatus(frontmatter["translation_status"]);
};

/**
 * Maps a source path to the same page in the other locale. The result is a
 * site path without a file extension or base prefix; the caller adds `.html`
 * when the site does not use clean URLs.
 *
 * `en/index.md` -> `/th/`
 * `en/concepts/index.md` -> `/th/concepts/`
 * `en/quick-start.md` -> `/th/quick-start`
 */
export const counterpartPath = (relativePath: string): string | undefined => {
  const normalized = relativePath.replaceAll("\\", "/");
  const locale = normalized.startsWith("en/")
    ? "en"
    : normalized.startsWith("th/")
      ? "th"
      : undefined;

  if (locale === undefined) return undefined;

  const other = locale === "en" ? "th" : "en";
  const rest = normalized.slice(locale.length + 1).replace(/\.md$/, "");
  const withoutIndex = rest.replace(/(^|\/)index$/, "$1");
  return `/${other}/${withoutIndex}`;
};

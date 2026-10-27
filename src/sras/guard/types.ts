export type GuardPhraseRule = {
  readonly category: string;
  readonly phrase: string;
  readonly reason: string;
};

export type GuardRegexRule = {
  readonly id: string;
  readonly category: string;
  readonly pattern: string;
  readonly flags: string;
  readonly reason: string;
};

export type GuardExclude = {
  readonly path: string;
  readonly reason: string;
};

export type GuardAllow = {
  readonly path: string;
  readonly text: string;
  readonly reason: string;
};

export type GuardRuleSet = {
  readonly categories: readonly GuardPhraseRule[];
  readonly regexes: readonly GuardRegexRule[];
  readonly exclude: readonly GuardExclude[];
  readonly allow: readonly GuardAllow[];
};

export type GuardFinding = {
  readonly tag: "Finding";
  readonly category: string;
  readonly ruleId: string;
  readonly file: string;
  readonly line: number;
  readonly preview: string;
  readonly reason: string;
};

export type GuardResult = {
  readonly findings: readonly GuardFinding[];
  readonly scanned: number;
  readonly skipped: readonly string[];
};

export type GuardError =
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | {
      readonly tag: "Denylist";
      readonly file: string;
      readonly message: string;
    }
  | { readonly tag: "Regex"; readonly id: string; readonly message: string };

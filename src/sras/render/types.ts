import type { ValidationIssue } from "../standard/types.js";

export type RenderPage = {
  readonly path: string;
  readonly text: string;
};

export type RenderSummary = {
  readonly pages: number;
};

export type RenderDriftIssue =
  | { readonly tag: "Missing"; readonly path: string }
  | {
      readonly tag: "Changed";
      readonly path: string;
      readonly line: number;
      readonly expected: string;
      readonly actual: string;
    }
  | { readonly tag: "Extra"; readonly path: string };

export type RenderError =
  | { readonly tag: "NoContent" }
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | { readonly tag: "Schema"; readonly message: string }
  | { readonly tag: "Validation"; readonly issues: readonly ValidationIssue[] }
  | { readonly tag: "Write"; readonly file: string; readonly message: string };

export type RenderCheckError =
  | RenderError
  | { readonly tag: "Drift"; readonly issues: readonly RenderDriftIssue[] };

import { parse } from "yaml";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";

const MAX_BYTES = 1024 * 1024;
const MAX_ALIAS_COUNT = 100;

export type YamlError =
  | {
      readonly tag: "TooLarge";
      readonly file: string;
      readonly bytes: number;
      readonly limit: number;
    }
  | { readonly tag: "Parse"; readonly file: string; readonly message: string };

export const parseYaml = (file: SourceFile): Result<unknown, YamlError> => {
  const bytes = Buffer.byteLength(file.text, "utf8");

  if (bytes > MAX_BYTES) {
    return err({ tag: "TooLarge", file: file.path, bytes, limit: MAX_BYTES });
  }

  try {
    const value: unknown = parse(file.text, { maxAliasCount: MAX_ALIAS_COUNT });
    return ok(value);
  } catch (error) {
    return err({
      tag: "Parse",
      file: file.path,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

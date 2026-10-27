#!/usr/bin/env node
import { run } from "./cli/run.js";

try {
  process.exitCode = await run(process.argv.slice(2));
} catch {
  process.stderr.write("sras: unexpected failure\n");
  process.exitCode = 1;
}

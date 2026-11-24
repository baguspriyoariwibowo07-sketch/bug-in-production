// Fortune Cookie Wisdom for Developers entry: the unreproducible bug.
// Writes a single one-line fortune to /output/entry.txt.
// The line was authored in-session for this entry: the bug you cannot
// reproduce is the one already in production, a true developer-day
// observation turned into fortune-cookie wisdom.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const LINE =
  "The bug you cannot reproduce is the one already in production.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 120 characters, a single line, not only whitespace.
// An entry outside those limits is never judged and takes no prize, so
// check the line against the same limits before writing it out.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`line must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}
assertGateValid(LINE);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

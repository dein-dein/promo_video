import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir =
  "campaigns/2026-06-12-motto-to-mark-reveal-bumper/working/stills";
await mkdir(outputDir, {recursive: true});

for (const format of ["vertical", "landscape"]) {
  const composition =
    format === "vertical"
      ? "MottoToMarkRevealVertical"
      : "MottoToMarkRevealLandscape";

  for (const [name, frame] of [
    ["opening-you", 0],
    ["motto-assembled", 54],
    ["motto-lift-logo-rise", 88],
    ["logo-resolve", 108],
    ["final-hold", 150],
  ]) {
    execFileSync(
      "npx",
      [
        "remotion",
        "still",
        "src/index.ts",
        composition,
        `${outputDir}/${name}-${format}-review-v01.png`,
        "--frame",
        String(frame),
      ],
      {stdio: "inherit"},
    );
  }
}

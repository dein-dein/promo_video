import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir =
  "campaigns/2026-06-12-motto-logo-cinematic-bumper/working/stills";

await mkdir(outputDir, {recursive: true});

for (const format of ["vertical", "landscape"]) {
  const composition =
    format === "vertical"
      ? "MottoLogoCinematicBumperVertical"
      : "MottoLogoCinematicBumperLandscape";

  for (const [name, frame] of [
    ["opening-you", 0],
    ["your-movies", 45],
    ["gold-line-transition", 68],
    ["logo-reveal", 80],
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

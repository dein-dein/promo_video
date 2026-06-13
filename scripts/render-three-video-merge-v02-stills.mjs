import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir = "campaigns/2026-06-14-three-video-merge/working/stills";
await mkdir(outputDir, {recursive: true});

for (const format of ["landscape", "vertical"]) {
  const composition =
    format === "landscape" ? "ThreeVideoMergeLandscape" : "ThreeVideoMergeVertical";

  for (const frame of [119, 120, 150, 156, 224, 225, 240, 264, 779, 780, 930]) {
    execFileSync(
      "npx",
      [
        "remotion",
        "still",
        "src/index.ts",
        composition,
        `${outputDir}/frame-${frame}-${format}-review-v02.png`,
        "--frame",
        String(frame),
      ],
      {stdio: "inherit"},
    );
  }
}

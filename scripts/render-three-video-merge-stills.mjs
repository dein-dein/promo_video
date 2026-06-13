import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir = "campaigns/2026-06-14-three-video-merge/working/stills";
await mkdir(outputDir, {recursive: true});

for (const format of ["landscape", "vertical"]) {
  const composition =
    format === "landscape" ? "ThreeVideoMergeLandscape" : "ThreeVideoMergeVertical";

  for (const [name, frame] of [
    ["opening", 0],
    ["homepage-final", 149],
    ["showtime-opening", 150],
    ["showtime-movie", 315],
    ["showtime-next-session", 435],
    ["showtime-provider-final", 779],
    ["motto-opening", 780],
    ["final-hold", 930],
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

import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir =
  "campaigns/2026-06-11-homepage-browser-load/working/stills";

await mkdir(outputDir, {recursive: true});

for (const [name, frame] of [
  ["opening", 0],
  ["typing", 36],
  ["loading", 63],
  ["screenshot-reveal", 90],
  ["zoom", 120],
  ["final-hold", 149],
]) {
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "HomepageBrowserLoadBumper",
      `${outputDir}/${name}-landscape-review-v01.png`,
      "--frame",
      String(frame),
    ],
    {stdio: "inherit"},
  );
}

import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";

const outputDir =
  "campaigns/2026-06-12-showtime-city-ticket-discovery/working/stills";

await mkdir(outputDir, {recursive: true});

for (const [name, frame] of [
  ["opening-motto", 45],
  ["opening-scroll-blend", 84],
  ["complete-movie-list", 110],
  ["movie-title-zoom", 150],
  ["movie-title-gold-hover", 177],
  ["movie-title-click", 192],
  ["loading", 225],
  ["next-session-zoom", 285],
  ["next-session-hold", 303],
  ["scroll-to-cities", 390],
  ["dusseldorf-selection", 510],
  ["ticket-link-hover", 600],
  ["closing-hold", 690],
]) {
  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      "ShowtimeCityTicketDiscovery",
      `${outputDir}/${name}-landscape-review-v02.png`,
      "--frame",
      String(frame),
    ],
    {stdio: "inherit"},
  );
}

import {mkdir} from "node:fs/promises";
import {execFileSync} from "node:child_process";

await mkdir("campaigns/intro/working/stills", {recursive: true});

for (const [name, frame] of [
  ["hook", 45],
  ["filters", 150],
  ["showtimes", 300],
  ["showtime-detail", 450],
  ["cta", 555],
]) {
  execFileSync("npx", [
    "remotion",
    "still",
    "src/index.ts",
    "ShowtimeTicketLinkIntro",
    `campaigns/intro/working/stills/${name}-landscape-review-v02.png`,
    "--frame",
    String(frame),
  ], {stdio: "inherit"});
}

import {mkdir} from "node:fs/promises";
import {execFileSync} from "node:child_process";

await mkdir("campaigns/intro/working/stills", {recursive: true});

for (const [name, frame] of [
  ["hook", 45],
  ["languages", 270],
  ["showtimes", 405],
  ["provider-handoff", 555],
  ["cta", 690],
]) {
  execFileSync("npx", [
    "remotion",
    "still",
    "src/index.ts",
    "ShowtimeTicketLinkIntro",
    `campaigns/intro/working/stills/${name}-review-v01.png`,
    "--frame",
    String(frame),
  ], {stdio: "inherit"});
}

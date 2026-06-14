import {execFileSync} from "node:child_process";
import {mkdir} from "node:fs/promises";
import {pathToFileURL} from "node:url";
import {
  movieShowtimeSocialPosterCampaign,
  validateMovieShowtimePosterInput,
} from "../src/campaigns/movie-showtime-social-poster.js";

const outputDir = "campaigns/movie-showtime-social-poster/working/renders";

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const parsePosterArgs = (args) => {
  const values = {};
  const supported = new Map([
    ["--category", "category"],
    ["--region", "region"],
    ["--movie-title", "movieTitle"],
  ]);

  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const field = supported.get(flag);
    if (!field) throw new Error(`Unsupported argument: ${flag}`);
    const value = args[index + 1];
    if (value == null) throw new Error(`Missing value for ${flag}`);
    values[field] = value;
  }

  return validateMovieShowtimePosterInput(values);
};

export const getPosterOutputPath = (input) => {
  const validated = validateMovieShowtimePosterInput(input);
  const subject = validated.movieTitle
    ? slugify(validated.movieTitle)
    : "category";
  return `${outputDir}/${slugify(validated.category)}-${slugify(validated.region)}-${subject}-review.png`;
};

const main = async () => {
  const input = parsePosterArgs(process.argv.slice(2));
  const outputPath = getPosterOutputPath(input);
  await mkdir(outputDir, {recursive: true});

  execFileSync(
    "npx",
    [
      "remotion",
      "still",
      "src/index.ts",
      movieShowtimeSocialPosterCampaign.composition.id,
      outputPath,
      "--props",
      JSON.stringify(input),
    ],
    {stdio: "inherit"},
  );
  console.log(outputPath);
};

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}

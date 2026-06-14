import assert from "node:assert/strict";
import test from "node:test";

const loadCli = async () =>
  import("../scripts/render-movie-showtime-social-poster.mjs");

test("poster CLI parses structured fields and builds deterministic review paths", async () => {
  const {parsePosterArgs, getPosterOutputPath} = await loadCli();
  const input = parsePosterArgs([
    "--category",
    "Mollywood",
    "--region",
    "Germany",
    "--movie-title",
    "Selected Movie",
  ]);

  assert.deepEqual(input, {
    category: "Mollywood",
    region: "Germany",
    movieTitle: "Selected Movie",
  });
  assert.equal(
    getPosterOutputPath(input),
    "campaigns/movie-showtime-social-poster/working/renders/mollywood-germany-selected-movie-review.png",
  );
  assert.equal(
    getPosterOutputPath({category: "Mollywood", region: "Germany"}),
    "campaigns/movie-showtime-social-poster/working/renders/mollywood-germany-category-review.png",
  );
});

test("poster CLI rejects unsafe values and unsupported arguments", async () => {
  const {parsePosterArgs} = await loadCli();

  assert.throws(
    () =>
      parsePosterArgs([
        "--category",
        "../Mollywood",
        "--region",
        "Germany",
      ]),
    /unsafe/i,
  );
  assert.throws(
    () => parsePosterArgs(["--category", "Mollywood", "--region", "Germany", "--output", "../bad.png"]),
    /unsupported argument/i,
  );
});

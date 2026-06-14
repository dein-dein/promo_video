import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/movie-showtime-social-poster.js");

test("movie showtime poster locks the approved fixed composition and copy", async () => {
  const {movieShowtimeSocialPosterCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.composition, {
    id: "MovieShowtimeSocialPoster",
    width: 1080,
    height: 1350,
  });
  assert.equal(campaign.logo, "dein-new-logo.png");
  assert.equal(campaign.copy.cta, "Find showtimes");
  assert.equal(campaign.copy.url, "dein-dein.com");
  assert.equal(
    campaign.copy.disclaimer,
    "Dein-Dein is an independent discovery platform. Confirm showtimes, availability, and booking terms with the official provider.",
  );
});

test("movie showtime poster supports category-only and selected-movie inputs", async () => {
  const {buildMovieShowtimePosterCopy} = await loadCampaign();

  assert.deepEqual(
    buildMovieShowtimePosterCopy({category: "Mollywood", region: "Germany"}),
    {
      headline: "Mollywood showtimes in Germany.",
      movieTitle: null,
    },
  );
  assert.deepEqual(
    buildMovieShowtimePosterCopy({
      category: "Mollywood",
      region: "Germany",
      movieTitle: "Selected Movie",
    }),
    {
      headline: "Mollywood showtimes in Germany.",
      movieTitle: "Selected Movie",
    },
  );
});

test("movie showtime poster rejects missing fields and unreadably long movie titles", async () => {
  const {validateMovieShowtimePosterInput} = await loadCampaign();

  assert.throws(
    () => validateMovieShowtimePosterInput({category: "", region: "Germany"}),
    /category is required/i,
  );
  assert.throws(
    () => validateMovieShowtimePosterInput({category: "Mollywood", region: ""}),
    /region is required/i,
  );
  assert.throws(
    () =>
      validateMovieShowtimePosterInput({
        category: "Mollywood",
        region: "Germany",
        movieTitle:
          "This movie title is intentionally far too long to remain readable inside the fixed three line poster title area",
      }),
    /movie title is too long/i,
  );
});

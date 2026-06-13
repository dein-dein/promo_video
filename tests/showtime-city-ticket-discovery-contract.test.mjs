import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/showtime-city-ticket-discovery.js");

test("showtime city ticket discovery is a silent 24-second YouTube landscape composition", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 720);
  assert.equal(campaign.width, 1920);
  assert.equal(campaign.height, 1080);
  assert.equal(campaign.audio, null);
});

test("campaign preserves the supplied screenshots and marks the hover screenshot reference-only", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.screenshots.sources, {
    homepage:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/01.png",
    movieList:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/1.png",
    selectedMovie:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/2.png",
    eventDetail:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/3.png",
    cityShowtimes:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/4.png",
    dusseldorfShowtimes:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images/5.png",
  });
  assert.deepEqual(campaign.screenshots.referenceOnly, ["selectedMovie"]);
});

test("campaign scrolls continuously from the motto into the complete movie list before title zoom", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();
  const scene = campaign.scenes.movieList;

  assert.equal(scene.from, 75);
  assert.equal(scene.fullListEnd, 114);
  assert.equal(scene.zoomEnd, 165);
  assert.equal(scene.fit, "contain");
  assert.deepEqual(scene.scrollTransition, {
    start: 75,
    end: 114,
    homepageExitY: -1080,
    movieListEnterY: 1080,
    overlap: true,
  });
  assert.deepEqual(scene.target, {x: 0.3, y: 0.25, scale: 1.55});
  assert.ok(scene.fullListEnd < scene.zoomEnd);
});

test("movie hover keeps the list screenshot and changes only the title color", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();
  const scene = campaign.scenes.movieHover;

  assert.equal(scene.from, 165);
  assert.equal(scene.durationInFrames, 39);
  assert.equal(scene.source, "movieList");
  assert.equal(scene.reference, "selectedMovie");
  assert.equal(scene.effect, "title-color-only");
  assert.equal(scene.title, "MAIN VAAPAS AAUNGA");
  assert.equal(scene.color, "#F0C75E");
  assert.deepEqual(scene.overlay, {
    left: 36,
    top: 111,
    fontSize: 58,
    mask: {left: 28, top: 104, width: 650, height: 91},
  });
});

test("captions use scene-specific callouts with protected focus targets", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();
  const callouts = campaign.callouts;

  assert.deepEqual(Object.keys(callouts), [
    "discovery",
    "chooseMovie",
    "nextSession",
    "browseCities",
    "chooseCity",
    "providerCta",
  ]);
  assert.ok(Object.values(callouts).every((callout) => callout.position));
  assert.deepEqual(
    Object.values(callouts).map((callout) => callout.protects),
    [
      "complete-movie-list",
      "main-vaapas-aaunga-title",
      "next-session-card",
      "city-showtimes",
      "dusseldorf-selector",
      "ticket-url-button",
    ],
  );
});

test("next session scene zooms in, settles, zooms out, then scrolls into city showtimes", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();
  const scene = campaign.scenes.nextSession;

  assert.deepEqual(scene.timing, {
    zoomInStart: 246,
    zoomInEnd: 291,
    holdEnd: 315,
    zoomOutEnd: 330,
    scrollEnd: 450,
  });
  assert.deepEqual(scene.target, {x: 0.76, y: 0.28, scale: 1.38});
});

test("campaign uses compliant provider language and never claims Dein-Dein sells tickets", async () => {
  const {showtimeCityTicketDiscoveryCampaign: campaign} = await loadCampaign();
  const copy = [
    ...Object.values(campaign.copy),
    campaign.disclaimer,
  ].join(" ");

  assert.equal(
    campaign.copy.providerCta,
    "Confirm and book with the official provider ★",
  );
  assert.equal(
    campaign.disclaimer,
    "Dein-Dein is an independent discovery platform. Confirm showtimes, availability, and booking terms with the official provider.",
  );
  assert.doesNotMatch(copy, /\bBook Now\b|\bBuy tickets\b/i);
  assert.ok(campaign.scenes.closing.durationInFrames >= 90);
});

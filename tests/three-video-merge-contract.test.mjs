import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/three-video-merge.js");

test("three-video merge defines silent 32-second landscape and vertical compositions", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 960);
  assert.equal(campaign.audio, null);
  assert.equal(campaign.transition, "direct-cut");
  assert.deepEqual(campaign.compositions, {
    landscape: {
      id: "ThreeVideoMergeLandscape",
      width: 1920,
      height: 1080,
    },
    vertical: {
      id: "ThreeVideoMergeVertical",
      width: 1080,
      height: 1920,
    },
    verticalV03: {
      id: "ThreeVideoMergeVerticalV03",
      width: 1080,
      height: 1920,
    },
  });
});

test("three-video merge locks approved source versions and checksums", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.sources, {
    homepageLandscape:
      "campaigns/2026-06-11-homepage-browser-load/exports/approved/2026-06-11-homepage-browser-load-landscape-1920x1080-approved-v01.mp4",
    homepageLandscapeSha256:
      "ea8261f17023088e8a0880cb7360b82a2c5a5b57961af5380b7b6ee4eb724ed9",
    showtimeLandscape:
      "campaigns/2026-06-12-showtime-city-ticket-discovery/exports/approved/2026-06-12-showtime-city-ticket-discovery-landscape-1920x1080-approved-v02.mp4",
    showtimeLandscapeSha256:
      "e098497c7a39caa6153e4e178ead9916ec14a56b20c26601c04df8fc625209f2",
    mottoLandscape:
      "campaigns/2026-06-12-motto-to-mark-reveal-bumper/exports/approved/2026-06-12-motto-to-mark-reveal-bumper-landscape-1920x1080-approved-v01.mp4",
    mottoLandscapeSha256:
      "8724c908f7864def4dc4caa996f317ebece1f130a74f10dc1d285471aa850248",
    mottoVertical:
      "campaigns/2026-06-12-motto-to-mark-reveal-bumper/exports/approved/2026-06-12-motto-to-mark-reveal-bumper-vertical-1080x1920-approved-v01.mp4",
    mottoVerticalSha256:
      "9614e2e2cfe804d79b67f3e83207ffea80b4a2a446be27953041aa12ccbf4477",
  });
});

test("three-video merge removes the showtime closing scene and uses direct boundaries", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.segments, {
    homepage: {from: 0, durationInFrames: 150, sourceFrom: 0, sourceTo: 150},
    showtime: {from: 150, durationInFrames: 630, sourceFrom: 0, sourceTo: 630},
    motto: {from: 780, durationInFrames: 180, sourceFrom: 0, sourceTo: 180},
  });
  assert.equal(campaign.segments.showtime.sourceTo / campaign.fps, 21);
  assert.equal(campaign.segments.motto.from, 26 * campaign.fps);
});

test("three-video merge defines a continuous homepage-to-showtime bridge", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.openingContinuity, {
    bridgeBegins: 120,
    productSettleCompletes: 156,
    scrollBegins: 225,
    scrollUnderway: 240,
    movieListSettles: 264,
    showtimeSourceFrameAtSettle: 114,
  });
  assert.equal(
    campaign.openingContinuity.movieListSettles -
      campaign.segments.showtime.from,
    campaign.openingContinuity.showtimeSourceFrameAtSettle,
  );
  assert.equal(campaign.openingContinuity.scrollUnderway / campaign.fps, 8);
});

test("three-video merge preserves the direct showtime-to-motto ending", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.endingTransition, "direct-cut");
  assert.equal(campaign.segments.showtime.from + campaign.segments.showtime.durationInFrames, 780);
  assert.equal(campaign.segments.motto.from, 780);
});

test("vertical adaptations preserve factual sources and v02 story policy", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.verticalAdaptations.homepage, "native-screenshot-layout");
  assert.equal(campaign.verticalAdaptations.showtime, "native-screenshot-layout-v02");
  assert.equal(campaign.verticalAdaptations.showtimeClosingRemoved, true);
  assert.equal(campaign.verticalAdaptations.sourceContentAltered, false);
});

test("vertical v03 converts the approved landscape v02 without cropping", async () => {
  const {threeVideoMergeCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.compositions.verticalV03, {
    id: "ThreeVideoMergeVerticalV03",
    width: 1080,
    height: 1920,
  });
  assert.deepEqual(campaign.verticalV03, {
    source:
      "campaigns/2026-06-14-three-video-merge/exports/approved/2026-06-14-three-video-merge-landscape-1920x1080-approved-v02.mp4",
    sourceSha256:
      "cd868e526df02dc31a2a6f7fc142a463042234fd779da8550b52e477327d5529",
    fit: "contain",
    crop: false,
    audio: null,
  });
});

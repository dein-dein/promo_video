import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/motto-logo-cinematic-bumper.js");

test("motto logo bumper defines six-second vertical and landscape compositions", async () => {
  const {mottoLogoCinematicBumperCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 180);
  assert.deepEqual(campaign.compositions, {
    vertical: {
      id: "MottoLogoCinematicBumperVertical",
      width: 1080,
      height: 1920,
    },
    landscape: {
      id: "MottoLogoCinematicBumperLandscape",
      width: 1920,
      height: 1080,
    },
  });
});

test("motto logo bumper locks approved copy, official logo, and silent ending policy", async () => {
  const {mottoLogoCinematicBumperCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.copy, {
    firstBeat: "You.",
    secondBeat: "Your Movies.",
    url: "dein-dein.com",
  });
  assert.equal(
    campaign.disclaimer,
    "Independent event discovery platform. Confirm details with the official provider.",
  );
  assert.equal(campaign.logo, "dein-new-logo.png");
  assert.equal(campaign.audio, null);
  assert.equal(campaign.ending, "url-with-disclaimer");
  assert.equal(campaign.cta, null);
});

test("motto logo bumper uses the approved cinematic timing and restrained logo reveal", async () => {
  const {mottoLogoCinematicBumperCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.scenes, {
    firstBeat: {from: 0, to: 26},
    secondBeat: {from: 27, to: 62},
    transition: {from: 63, to: 73},
    closing: {from: 74, to: 179},
  });
  assert.deepEqual(campaign.logoReveal, {
    from: 74,
    to: 85,
    initialScale: 0.96,
    finalScale: 1,
  });
  assert.equal(campaign.initialFrame.background, "#1A1432");
  assert.equal(campaign.initialFrame.visibleCopy, "You.");
  assert.ok(campaign.scenes.closing.to - campaign.logoReveal.to >= 45);
});

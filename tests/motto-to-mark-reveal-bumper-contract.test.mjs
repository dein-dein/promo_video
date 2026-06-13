import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/motto-to-mark-reveal-bumper.js");

test("motto-to-mark reveal defines six-second vertical and landscape variants", async () => {
  const {mottoToMarkRevealCampaign: campaign} = await loadCampaign();

  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 180);
  assert.deepEqual(campaign.compositions, {
    vertical: {
      id: "MottoToMarkRevealVertical",
      width: 1080,
      height: 1920,
    },
    landscape: {
      id: "MottoToMarkRevealLandscape",
      width: 1920,
      height: 1080,
    },
  });
});

test("motto-to-mark reveal preserves approved copy, transparent logo, and silent ending", async () => {
  const {mottoToMarkRevealCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.copy, {
    firstLine: "You.",
    secondLine: "Your Movies.",
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

test("motto-to-mark reveal uses a restrained text lift and intact logo rise", async () => {
  const {mottoToMarkRevealCampaign: campaign} = await loadCampaign();

  assert.deepEqual(campaign.timing, {
    firstLineIn: {from: 0, to: 18},
    secondLineIn: {from: 18, to: 42},
    underline: {from: 42, to: 66},
    textExit: {from: 68, to: 90},
    backgroundTransition: {from: 88, to: 108},
    logoReveal: {from: 78, to: 105},
    finalCopyReveal: {from: 104, to: 122},
  });
  assert.deepEqual(campaign.logoReveal, {
    initialScale: 0.96,
    finalScale: 1,
    risePixels: 22,
  });
  assert.equal(campaign.initialTextOpacity, 0.55);
  assert.ok(campaign.durationInFrames - campaign.timing.finalCopyReveal.to >= 45);
});

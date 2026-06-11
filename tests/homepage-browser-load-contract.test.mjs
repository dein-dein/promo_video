import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () =>
  import("../src/campaigns/homepage-browser-load.js");

test("homepage browser load bumper is a five-second landscape composition", async () => {
  const {homepageBrowserLoadCampaign} = await loadCampaign();

  assert.equal(homepageBrowserLoadCampaign.fps, 30);
  assert.equal(homepageBrowserLoadCampaign.durationInFrames, 150);
  assert.equal(homepageBrowserLoadCampaign.width, 1920);
  assert.equal(homepageBrowserLoadCampaign.height, 1080);
});

test("homepage browser load bumper uses the exact approved URL and source screenshot", async () => {
  const {homepageBrowserLoadCampaign} = await loadCampaign();

  assert.equal(homepageBrowserLoadCampaign.url, "https://dein-dein.com");
  assert.equal(
    homepageBrowserLoadCampaign.screenshot,
    "campaigns/2026-06-11-homepage-browser-load/source/images/homepage-screenshot.png",
  );
});

test("homepage browser load bumper is silent and ends on product proof", async () => {
  const {homepageBrowserLoadCampaign} = await loadCampaign();

  assert.equal(homepageBrowserLoadCampaign.audio, null);
  assert.equal(homepageBrowserLoadCampaign.ending, "product-only");
  assert.equal(homepageBrowserLoadCampaign.cta, null);
});

test("homepage browser load bumper uses the approved restrained timing and zoom", async () => {
  const {homepageBrowserLoadCampaign} = await loadCampaign();
  const {timing, finalCamera} = homepageBrowserLoadCampaign;

  assert.deepEqual(timing, {
    browserRevealEnd: 18,
    typingStart: 12,
    typingEnd: 48,
    loadingStart: 48,
    loadingEnd: 75,
    screenshotRevealStart: 75,
    screenshotRevealEnd: 99,
    zoomStart: 99,
    zoomEnd: 144,
  });
  assert.ok(finalCamera.scale > 1);
  assert.ok(finalCamera.scale <= 1.18);
  assert.ok(finalCamera.focusX < 0.5);
  assert.ok(finalCamera.focusY < 0.5);
});

test("homepage browser load bumper has no fully blank opening frame", async () => {
  const {homepageBrowserLoadCampaign} = await loadCampaign();

  assert.ok(homepageBrowserLoadCampaign.initialBrowserOpacity > 0);
});

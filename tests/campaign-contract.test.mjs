import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () => import("../src/campaigns/showtime-ticket-link.js");

test("campaign runs for 20 seconds in landscape at 30 fps", async () => {
  const {campaign} = await loadCampaign();
  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 600);
  assert.equal(campaign.width, 1920);
  assert.equal(campaign.height, 1080);
});

test("campaign stays focused on showtime discovery without ticket-sales claims", async () => {
  const {campaign} = await loadCampaign();
  const copy = campaign.scenes
    .flatMap((scene) => [scene.copy, scene.disclosure].filter(Boolean))
    .join(" ");

  assert.match(copy, /showtimes/i);
  assert.doesNotMatch(copy, /\bBook Now\b|\bBuy tickets\b|\bTickets are sold\b/i);
});

test("campaign uses the approved scene copy and closes with one CTA for at least three seconds", async () => {
  const {campaign} = await loadCampaign();
  const hook = campaign.scenes.at(0);
  const closing = campaign.scenes.at(-1);

  assert.equal(hook.copy, "Looking for Indian movie showtimes?");
  assert.deepEqual(
    campaign.scenes.map((scene) => scene.copy),
    [
      "Looking for Indian movie showtimes?",
      "Choose your city and language.",
      "See relevant showtimes in one place.",
      "Find the right screening faster.",
      "Find showtimes",
    ],
  );
  assert.equal(closing.copy, "Find showtimes");
  assert.equal(closing.url, "dein-dein.com");
  assert.ok(closing.durationInFrames >= 90);
});

test("campaign uses extracted factual states and keeps source recording and official logo managed", async () => {
  const {campaign} = await loadCampaign();

  assert.equal(campaign.recording, "campaigns/intro/source/recordings/intro_recording.mov");
  assert.equal(campaign.logo, "dein-new-logo.png");
  assert.ok(campaign.scenes.filter((scene) => scene.stateFrame).length >= 4);
  assert.ok(campaign.scenes.every((scene) => !scene.clipStart));
});

test("product scenes use restrained focus treatments and factual extracted states", async () => {
  const {campaign} = await loadCampaign();
  const productScenes = campaign.scenes.filter((scene) => scene.stateFrame);

  assert.ok(productScenes.every((scene) => scene.camera));
  assert.ok(productScenes.some((scene) => scene.focus?.length));
  assert.ok(productScenes.every((scene) => scene.stateFrame.startsWith("campaigns/intro/working/processed-clips/states/")));
});

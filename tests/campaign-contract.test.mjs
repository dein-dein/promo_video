import assert from "node:assert/strict";
import test from "node:test";

const loadCampaign = async () => import("../src/campaigns/showtime-ticket-link.js");

test("campaign runs for 25 seconds at 30 fps", async () => {
  const {campaign} = await loadCampaign();
  assert.equal(campaign.fps, 30);
  assert.equal(campaign.durationInFrames, 750);
});

test("campaign uses legally cautious ticket-provider copy", async () => {
  const {campaign} = await loadCampaign();
  const copy = campaign.scenes
    .flatMap((scene) => [scene.copy, scene.disclosure].filter(Boolean))
    .join(" ");

  assert.match(copy, /Continue to the official ticket provider/i);
  assert.match(copy, /Tickets are sold by the official provider/i);
  assert.doesNotMatch(copy, /\bBook Now\b|\bBuy tickets\b/i);
});

test("campaign closes with one approved CTA for at least two seconds", async () => {
  const {campaign} = await loadCampaign();
  const closing = campaign.scenes.at(-1);

  assert.equal(closing.copy, "Find showtimes");
  assert.equal(closing.url, "dein-dein.com");
  assert.ok(closing.durationInFrames >= 60);
});

test("campaign keeps source recording and official logo on managed paths", async () => {
  const {campaign} = await loadCampaign();

  assert.equal(campaign.recording, "campaigns/intro/source/recordings/intro_recording.mov");
  assert.equal(campaign.logo, "dein-new-logo.png");
});

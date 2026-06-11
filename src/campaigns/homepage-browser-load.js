/**
 * @typedef {object} HomepageBrowserLoadCampaign
 * @property {string} id
 * @property {number} fps
 * @property {number} width
 * @property {number} height
 * @property {number} durationInFrames
 * @property {string} url
 * @property {string} screenshot
 * @property {null} audio
 * @property {"product-only"} ending
 * @property {null} cta
 * @property {number} initialBrowserOpacity
 * @property {{
 *   browserRevealEnd: number,
 *   typingStart: number,
 *   typingEnd: number,
 *   loadingStart: number,
 *   loadingEnd: number,
 *   screenshotRevealStart: number,
 *   screenshotRevealEnd: number,
 *   zoomStart: number,
 *   zoomEnd: number,
 * }} timing
 * @property {{scale: number, focusX: number, focusY: number}} finalCamera
 */

/** @satisfies {HomepageBrowserLoadCampaign} */
export const homepageBrowserLoadCampaign = {
  id: "homepage-browser-load-bumper",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 150,
  url: "https://dein-dein.com",
  screenshot:
    "campaigns/2026-06-11-homepage-browser-load/source/images/homepage-screenshot.png",
  audio: null,
  ending: "product-only",
  cta: null,
  initialBrowserOpacity: 0.28,
  timing: {
    browserRevealEnd: 18,
    typingStart: 12,
    typingEnd: 48,
    loadingStart: 48,
    loadingEnd: 75,
    screenshotRevealStart: 75,
    screenshotRevealEnd: 99,
    zoomStart: 99,
    zoomEnd: 144,
  },
  finalCamera: {
    scale: 1.14,
    focusX: 0.25,
    focusY: 0.24,
  },
};

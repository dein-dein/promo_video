/**
 * @typedef {object} MottoLogoCinematicBumperCampaign
 * @property {number} fps
 * @property {number} durationInFrames
 * @property {{
 *   vertical: {id: string, width: number, height: number},
 *   landscape: {id: string, width: number, height: number},
 * }} compositions
 * @property {{firstBeat: string, secondBeat: string, url: string}} copy
 * @property {string} disclaimer
 * @property {string} logo
 * @property {null} audio
 * @property {"url-with-disclaimer"} ending
 * @property {null} cta
 * @property {{
 *   firstBeat: {from: number, to: number},
 *   secondBeat: {from: number, to: number},
 *   transition: {from: number, to: number},
 *   closing: {from: number, to: number},
 * }} scenes
 * @property {{from: number, to: number, initialScale: number, finalScale: number}} logoReveal
 * @property {{background: string, visibleCopy: string}} initialFrame
 */

/** @satisfies {MottoLogoCinematicBumperCampaign} */
export const mottoLogoCinematicBumperCampaign = {
  fps: 30,
  durationInFrames: 180,
  compositions: {
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
  },
  copy: {
    firstBeat: "You.",
    secondBeat: "Your Movies.",
    url: "dein-dein.com",
  },
  disclaimer:
    "Independent event discovery platform. Confirm details with the official provider.",
  logo: "dein-new-logo.png",
  audio: null,
  ending: "url-with-disclaimer",
  cta: null,
  scenes: {
    firstBeat: {from: 0, to: 26},
    secondBeat: {from: 27, to: 62},
    transition: {from: 63, to: 73},
    closing: {from: 74, to: 179},
  },
  logoReveal: {
    from: 74,
    to: 85,
    initialScale: 0.96,
    finalScale: 1,
  },
  initialFrame: {
    background: "#1A1432",
    visibleCopy: "You.",
  },
};

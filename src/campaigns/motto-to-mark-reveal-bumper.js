/** @satisfies {Record<string, any>} */
export const mottoToMarkRevealCampaign = {
  fps: 30,
  durationInFrames: 180,
  compositions: {
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
  },
  copy: {
    firstLine: "You.",
    secondLine: "Your Movies.",
    url: "dein-dein.com",
  },
  disclaimer:
    "Independent event discovery platform. Confirm details with the official provider.",
  logo: "dein-new-logo.png",
  audio: null,
  ending: "url-with-disclaimer",
  cta: null,
  timing: {
    firstLineIn: {from: 0, to: 18},
    secondLineIn: {from: 18, to: 42},
    underline: {from: 42, to: 66},
    textExit: {from: 68, to: 90},
    backgroundTransition: {from: 88, to: 108},
    logoReveal: {from: 78, to: 105},
    finalCopyReveal: {from: 104, to: 122},
  },
  logoReveal: {
    initialScale: 0.96,
    finalScale: 1,
    risePixels: 22,
  },
  initialTextOpacity: 0.55,
};

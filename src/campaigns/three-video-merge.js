/** @satisfies {Record<string, any>} */
export const threeVideoMergeCampaign = {
  fps: 30,
  durationInFrames: 960,
  audio: null,
  transition: "direct-cut",
  endingTransition: "direct-cut",
  compositions: {
    landscape: {id: "ThreeVideoMergeLandscape", width: 1920, height: 1080},
    vertical: {id: "ThreeVideoMergeVertical", width: 1080, height: 1920},
    verticalV03: {id: "ThreeVideoMergeVerticalV03", width: 1080, height: 1920},
  },
  sources: {
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
  },
  segments: {
    homepage: {from: 0, durationInFrames: 150, sourceFrom: 0, sourceTo: 150},
    showtime: {from: 150, durationInFrames: 630, sourceFrom: 0, sourceTo: 630},
    motto: {from: 780, durationInFrames: 180, sourceFrom: 0, sourceTo: 180},
  },
  openingContinuity: {
    bridgeBegins: 120,
    productSettleCompletes: 156,
    scrollBegins: 225,
    scrollUnderway: 240,
    movieListSettles: 264,
    showtimeSourceFrameAtSettle: 114,
  },
  verticalAdaptations: {
    homepage: "native-screenshot-layout",
    showtime: "native-screenshot-layout-v02",
    showtimeClosingRemoved: true,
    sourceContentAltered: false,
  },
  verticalV03: {
    source:
      "campaigns/2026-06-14-three-video-merge/exports/approved/2026-06-14-three-video-merge-landscape-1920x1080-approved-v02.mp4",
    sourceSha256:
      "cd868e526df02dc31a2a6f7fc142a463042234fd779da8550b52e477327d5529",
    fit: "contain",
    crop: false,
    audio: null,
  },
};

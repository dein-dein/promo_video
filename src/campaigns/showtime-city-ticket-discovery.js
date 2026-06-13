const root = "campaigns/2026-06-12-showtime-city-ticket-discovery/source/images";

/**
 * @typedef {object} ShowtimeCityTicketDiscoveryCampaign
 * @property {string} id
 * @property {number} fps
 * @property {number} width
 * @property {number} height
 * @property {number} durationInFrames
 * @property {null} audio
 * @property {string} logo
 * @property {{sources: Record<string, string>, referenceOnly: string[]}} screenshots
 * @property {Record<string, string>} copy
 * @property {Record<string, any>} callouts
 * @property {string} disclaimer
 * @property {Record<string, any>} scenes
 */

/** @satisfies {ShowtimeCityTicketDiscoveryCampaign} */
export const showtimeCityTicketDiscoveryCampaign = {
  id: "showtime-city-ticket-discovery",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 720,
  audio: null,
  logo: "dein-new-logo.png",
  screenshots: {
    sources: {
      homepage: `${root}/01.png`,
      movieList: `${root}/1.png`,
      selectedMovie: `${root}/2.png`,
      eventDetail: `${root}/3.png`,
      cityShowtimes: `${root}/4.png`,
      dusseldorfShowtimes: `${root}/5.png`,
    },
    referenceOnly: ["selectedMovie"],
  },
  copy: {
    discovery: "Find movie showtimes across Germany.",
    chooseMovie: "Choose a movie.",
    nextSession: "See the next immediate show.",
    browseCities: "Browse every showtime by city.",
    chooseCity: "Choose your city.",
    providerCta: "Confirm and book with the official provider ★",
    closingCta: "Confirm and book with the official provider",
    url: "dein-dein.com",
  },
  disclaimer:
    "Dein-Dein is an independent discovery platform. Confirm showtimes, availability, and booking terms with the official provider.",
  callouts: {
    discovery: {
      position: {left: 1110, top: 145, maxWidth: 650},
      protects: "complete-movie-list",
    },
    chooseMovie: {
      position: {left: 1110, top: 160, maxWidth: 430},
      protects: "main-vaapas-aaunga-title",
    },
    nextSession: {
      position: {left: 90, top: 510, maxWidth: 590},
      protects: "next-session-card",
    },
    browseCities: {
      position: {left: 1130, top: 80, maxWidth: 610},
      protects: "city-showtimes",
    },
    chooseCity: {
      position: {left: 1160, top: 75, maxWidth: 420},
      protects: "dusseldorf-selector",
    },
    providerCta: {
      position: {left: 690, top: 90, maxWidth: 690},
      protects: "ticket-url-button",
    },
  },
  scenes: {
    homepage: {from: 0, durationInFrames: 75, target: {x: 0.27, y: 0.26, scale: 1.18}},
    movieList: {
      from: 75,
      durationInFrames: 90,
      fullListEnd: 114,
      zoomEnd: 165,
      fit: "contain",
      scrollTransition: {
        start: 75,
        end: 114,
        homepageExitY: -1080,
        movieListEnterY: 1080,
        overlap: true,
      },
      target: {x: 0.3, y: 0.25, scale: 1.55},
    },
    movieHover: {
      from: 165,
      durationInFrames: 39,
      source: "movieList",
      reference: "selectedMovie",
      effect: "title-color-only",
      title: "MAIN VAAPAS AAUNGA",
      color: "#F0C75E",
      overlay: {
        left: 36,
        top: 111,
        fontSize: 58,
        mask: {left: 28, top: 104, width: 650, height: 91},
      },
    },
    loading: {from: 204, durationInFrames: 42},
    nextSession: {
      from: 246,
      durationInFrames: 204,
      timing: {
        zoomInStart: 246,
        zoomInEnd: 291,
        holdEnd: 315,
        zoomOutEnd: 330,
        scrollEnd: 450,
      },
      target: {x: 0.76, y: 0.28, scale: 1.38},
    },
    cityShowtimes: {from: 345, durationInFrames: 105},
    chooseCity: {from: 450, durationInFrames: 75},
    provider: {from: 525, durationInFrames: 105},
    closing: {from: 630, durationInFrames: 90},
  },
};

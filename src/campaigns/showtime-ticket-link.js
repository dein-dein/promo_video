const stateRoot = "campaigns/intro/working/processed-clips/states";

export const campaign = {
  id: "showtime-ticket-link-intro",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 600,
  recording: "campaigns/intro/source/recordings/intro_recording.mov",
  logo: "dein-new-logo.png",
  audio: "campaigns/intro/working/audio/original-minimal-landscape-pulse-v03.wav",
  scenes: [
    {
      id: "hook",
      from: 0,
      durationInFrames: 90,
      copy: "Looking for Indian movie showtimes?",
      stateFrame: `${stateRoot}/homepage.jpg`,
      camera: {from: {x: 50, y: 48, scale: 1.06}, to: {x: 50, y: 48, scale: 1}},
      focus: [],
    },
    {
      id: "filters",
      from: 90,
      durationInFrames: 120,
      copy: "Choose your city and language.",
      stateFrame: `${stateRoot}/multilingual-list.jpg`,
      camera: {from: {x: 50, y: 48, scale: 1}, to: {x: 42, y: 48, scale: 1.16}},
      focus: [
        {label: "Language", x: 31, y: 48, width: 20, height: 18},
        {label: "City", x: 72, y: 27, width: 17, height: 11},
      ],
    },
    {
      id: "results",
      from: 210,
      durationInFrames: 180,
      copy: "See relevant showtimes in one place.",
      stateFrame: `${stateRoot}/showtimes-city.jpg`,
      camera: {from: {x: 50, y: 50, scale: 1.02}, to: {x: 58, y: 56, scale: 1.19}},
      focus: [
        {label: "Cinema", x: 45, y: 54, width: 28, height: 13},
        {label: "Date, language and time", x: 69, y: 63, width: 30, height: 20},
      ],
    },
    {
      id: "details",
      from: 390,
      durationInFrames: 120,
      copy: "Find the right screening faster.",
      stateFrame: `${stateRoot}/movie-detail.jpg`,
      camera: {from: {x: 50, y: 50, scale: 1}, to: {x: 64, y: 50, scale: 1.2}},
      focus: [{label: "Screening details", x: 68, y: 56, width: 34, height: 25}],
    },
    {
      id: "closing",
      from: 510,
      durationInFrames: 90,
      copy: "Find showtimes",
      url: "dein-dein.com",
    },
  ],
};

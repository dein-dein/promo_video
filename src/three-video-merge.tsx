import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {homepageBrowserLoadCampaign as homepage} from "./campaigns/homepage-browser-load.js";
import {showtimeCityTicketDiscoveryCampaign as showtime} from "./campaigns/showtime-city-ticket-discovery.js";
import {threeVideoMergeCampaign as merge} from "./campaigns/three-video-merge.js";

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const progress = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: ease});

const LandscapeVideo = ({src}: {src: string}) => (
  <Video src={staticFile(src)} muted style={{width: "100%", height: "100%"}} />
);

const LandscapeShowtimeContinuation = () => {
  const frame = useCurrentFrame();

  return (
    <Video
      src={staticFile(merge.sources.showtimeLandscape)}
      trimBefore={0.2}
      muted
      style={{width: "100%", height: "100%", opacity: progress(frame, 0, 12)}}
    />
  );
};

const VerticalShell = ({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(160deg, #1A1432 0%, #241C46 62%, #3B2464 100%)",
      padding: "120px 48px 150px",
      fontFamily: "Inter, system-ui, sans-serif",
    }}
  >
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        borderRadius: 38,
        background: "#fff",
        boxShadow: "0 34px 90px rgba(0,0,0,.34)",
        border: "2px solid rgba(240,199,94,.28)",
      }}
    >
      {children}
    </div>
    {caption ? (
      <div
        style={{
          marginTop: 48,
          minHeight: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 34px",
          borderRadius: 30,
          background: "rgba(26,20,50,.94)",
          borderLeft: "8px solid #F0C75E",
          color: "#F6F1E8",
          fontSize: 44,
          fontWeight: 720,
          lineHeight: 1.14,
          textAlign: "center",
        }}
      >
        {caption}
      </div>
    ) : null}
  </AbsoluteFill>
);

export const HomepageBrowserLoadVertical = ({frameOffset = 0}: {frameOffset?: number}) => {
  const frame = useCurrentFrame() + frameOffset;
  const typing = progress(frame, homepage.timing.typingStart, homepage.timing.typingEnd);
  const reveal = progress(frame, homepage.timing.screenshotRevealStart, homepage.timing.screenshotRevealEnd);
  const zoom = progress(frame, homepage.timing.zoomStart, homepage.timing.zoomEnd);
  const typedUrl = homepage.url.slice(0, Math.ceil(typing * homepage.url.length));

  return (
    <VerticalShell>
      <div
        style={{
          height: 110,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid rgba(30,23,55,.13)",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "18px 22px",
            borderRadius: 17,
            border: "1px solid rgba(30,23,55,.18)",
            color: "#1E1737",
            fontSize: 28,
            fontWeight: 560,
          }}
        >
          <span style={{color: "#5D826C", marginRight: 12}}>●</span>
          {typedUrl}
        </div>
      </div>
      <Img
        src={staticFile(homepage.screenshot)}
        style={{
          width: "100%",
          height: "calc(100% - 110px)",
          objectFit: "contain",
          background: "#fff",
          opacity: reveal,
          transformOrigin: "center center",
          transform: `scale(${interpolate(zoom, [0, 1], [1, 1.04])})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 110,
          height: 7,
          width: `${progress(frame, homepage.timing.loadingStart, homepage.timing.loadingEnd) * 100}%`,
          background: "#F0C75E",
        }}
      />
    </VerticalShell>
  );
};

const verticalScenes = [
  {from: 0, to: 75, source: "homepage", caption: "Find movie showtimes across Germany.", scale: 1.02},
  {from: 75, to: 165, source: "movieList", caption: "Choose a movie.", scale: 1.02},
  {from: 165, to: 204, source: "movieList", caption: "Choose a movie.", scale: 1.06},
  {from: 204, to: 246, source: "eventDetail", caption: "See the next immediate show.", scale: 1.02},
  {from: 246, to: 345, source: "eventDetail", caption: "See the next immediate show.", scale: 1.06},
  {from: 345, to: 450, source: "cityShowtimes", caption: "Browse every showtime by city.", scale: 1.03},
  {from: 450, to: 525, source: "dusseldorfShowtimes", caption: "Choose your city.", scale: 1.03},
  {from: 525, to: 630, source: "dusseldorfShowtimes", caption: "Confirm and book with the official provider ★", scale: 1.06},
] as const;

export const ShowtimeCityTicketDiscoveryVerticalV02 = () => {
  const frame = useCurrentFrame();
  const scene = verticalScenes.find(({from, to}) => frame >= from && frame < to) ?? verticalScenes[verticalScenes.length - 1];
  const local = progress(frame, scene.from, Math.min(scene.to - 1, scene.from + 36));
  const src = showtime.screenshots.sources[scene.source];

  return (
    <VerticalShell caption={scene.caption}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "#fff",
          transform: `scale(${interpolate(local, [0, 1], [Math.max(1, scene.scale - 0.06), scene.scale])})`,
        }}
      />
      {frame >= 204 && frame < 246 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 8,
            width: `${progress(frame, 204, 244) * 100}%`,
            background: "#F0C75E",
          }}
        />
      ) : null}
    </VerticalShell>
  );
};

const OpeningContinuityBridge = ({format}: {format: "landscape" | "vertical"}) => {
  const frame = useCurrentFrame();
  const isVertical = format === "vertical";
  const settle = progress(frame, 0, 36);
  const scroll = progress(frame, 105, 143);
  const viewportHeight = isVertical ? 1450 : 1032;
  const firstOpacity = 1 - settle;
  const content = (
    <>
      <Img
        src={staticFile(showtime.screenshots.sources.homepage)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: isVertical ? "contain" : "cover",
          background: "#fff",
          opacity: settle * (1 - scroll * 0.35),
          transform: `translateY(${-scroll * viewportHeight}px) scale(${interpolate(settle, [0, 1], [1.08, 1.02])})`,
        }}
      />
      <Img
        src={staticFile(showtime.screenshots.sources.movieList)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "#fff",
          opacity: scroll,
          transform: `translateY(${(1 - scroll) * viewportHeight}px)`,
        }}
      />
    </>
  );

  if (isVertical) {
    return (
      <AbsoluteFill>
        <VerticalShell caption={scroll > 0.55 ? "Choose a movie." : "Find movie showtimes across Germany."}>{content}</VerticalShell>
        <AbsoluteFill style={{opacity: firstOpacity}}>
          <HomepageBrowserLoadVertical frameOffset={120} />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: "#F7F2EA", padding: interpolate(settle, [0, 1], [0, 24])}}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: interpolate(settle, [0, 1], [22, 28]),
            background: "#fff",
            boxShadow: `0 28px 82px rgba(36,28,70,${interpolate(settle, [0, 1], [0.12, 0.2])})`,
          }}
        >
          {content}
        </div>
      </AbsoluteFill>
      <Sequence from={36} durationInFrames={108} premountFor={30}>
        <LandscapeShowtimeContinuation />
      </Sequence>
      <Video
        src={staticFile(merge.sources.homepageLandscape)}
        trimBefore={4}
        muted
        style={{width: "100%", height: "100%", opacity: firstOpacity}}
      />
    </AbsoluteFill>
  );
};

const LandscapeBase = () => (
  <Series>
    <Series.Sequence durationInFrames={merge.segments.homepage.durationInFrames}>
      <LandscapeVideo src={merge.sources.homepageLandscape} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={merge.segments.showtime.durationInFrames}>
      <LandscapeVideo src={merge.sources.showtimeLandscape} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={merge.segments.motto.durationInFrames}>
      <LandscapeVideo src={merge.sources.mottoLandscape} />
    </Series.Sequence>
  </Series>
);

export const ThreeVideoMergeLandscape = () => (
  <AbsoluteFill>
    <LandscapeBase />
    <Sequence
      from={merge.openingContinuity.bridgeBegins}
      durationInFrames={
        merge.openingContinuity.movieListSettles -
        merge.openingContinuity.bridgeBegins
      }
      premountFor={30}
    >
      <OpeningContinuityBridge format="landscape" />
    </Sequence>
  </AbsoluteFill>
);

export const ThreeVideoMergeVertical = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={merge.segments.homepage.durationInFrames}>
        <HomepageBrowserLoadVertical />
      </Series.Sequence>
      <Series.Sequence durationInFrames={merge.segments.showtime.durationInFrames}>
        <ShowtimeCityTicketDiscoveryVerticalV02 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={merge.segments.motto.durationInFrames}>
        <LandscapeVideo src={merge.sources.mottoVertical} />
      </Series.Sequence>
    </Series>
    <Sequence
      from={merge.openingContinuity.bridgeBegins}
      durationInFrames={
        merge.openingContinuity.movieListSettles -
        merge.openingContinuity.bridgeBegins
      }
      premountFor={30}
    >
      <OpeningContinuityBridge format="vertical" />
    </Sequence>
  </AbsoluteFill>
);

export const ThreeVideoMergeVerticalV03 = () => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(160deg, #1A1432 0%, #241C46 62%, #3B2464 100%)",
    }}
  >
    <Video
      src={staticFile(merge.verticalV03.source)}
      muted
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
        boxShadow: "0 32px 96px rgba(0,0,0,.34)",
      }}
    />
  </AbsoluteFill>
);

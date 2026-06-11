import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {homepageBrowserLoadCampaign as campaign} from "./campaigns/homepage-browser-load.js";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

const progress = (
  frame: number,
  from: number,
  to: number,
  easing = easeOut,
) =>
  interpolate(frame, [from, to], [0, 1], {
    ...clamp,
    easing,
  });

const BrowserChrome = ({typedUrl}: {typedUrl: string}) => {
  const frame = useCurrentFrame();
  const typingComplete = frame >= campaign.timing.typingEnd;
  const cursorVisible = !typingComplete && Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        height: 78,
        background: "#ffffff",
        borderBottom: "1px solid rgba(30, 23, 55, 0.11)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 22,
      }}
    >
      <div style={{display: "flex", gap: 10}}>
        {["#F0C75E", "#8A6DD1", "#9AB0C2"].map((color) => (
          <div
            key={color}
            style={{width: 13, height: 13, borderRadius: "50%", background: color}}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          height: 45,
          borderRadius: 12,
          background: "#ffffff",
          border: "1px solid rgba(30, 23, 55, 0.14)",
          boxShadow: "inset 0 1px 2px rgba(30, 23, 55, 0.04)",
          display: "flex",
          alignItems: "center",
          padding: "0 17px",
          color: "#1E1737",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 21,
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{color: "#5D826C", fontSize: 17, marginRight: 10}}>●</span>
        {typedUrl}
        <span
          style={{
            width: 2,
            height: 24,
            marginLeft: 2,
            background: "#241C46",
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

export const HomepageBrowserLoadBumper = () => {
  const frame = useCurrentFrame();
  const {timing, finalCamera} = campaign;

  const browserReveal = progress(frame, 0, timing.browserRevealEnd);
  const browserOpacity = interpolate(
    browserReveal,
    [0, 1],
    [campaign.initialBrowserOpacity, 1],
  );
  const typing = progress(frame, timing.typingStart, timing.typingEnd, Easing.linear);
  const typedUrl = campaign.url.slice(
    0,
    Math.min(campaign.url.length, Math.ceil(typing * campaign.url.length)),
  );
  const loading = progress(frame, timing.loadingStart, timing.loadingEnd, easeInOut);
  const screenshotReveal = progress(
    frame,
    timing.screenshotRevealStart,
    timing.screenshotRevealEnd,
    easeOut,
  );
  const zoom = progress(frame, timing.zoomStart, timing.zoomEnd, easeInOut);
  const screenshotScale = interpolate(zoom, [0, 1], [1, finalCamera.scale]);

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 1580,
          height: 1075,
          borderRadius: 22,
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid rgba(30, 23, 55, 0.12)",
          boxShadow: "0 28px 80px rgba(30, 23, 55, 0.17)",
          opacity: browserOpacity,
          transform: `translateY(${interpolate(browserReveal, [0, 1], [16, 0])}px) scale(${interpolate(browserReveal, [0, 1], [0.985, 1])})`,
        }}
      >
        <BrowserChrome typedUrl={typedUrl} />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 997,
            overflow: "hidden",
            background: "#ffffff",
          }}
        >
          <Img
            src={staticFile(campaign.screenshot)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: screenshotReveal,
              transformOrigin: `${finalCamera.focusX * 100}% ${finalCamera.focusY * 100}%`,
              transform: `scale(${screenshotScale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 4,
              width: `${loading * 100}%`,
              background: "#F0C75E",
              boxShadow: "0 0 12px rgba(240, 199, 94, 0.55)",
              opacity: frame >= timing.loadingStart && frame < timing.screenshotRevealEnd ? 1 : 0,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

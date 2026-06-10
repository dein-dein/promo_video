import {Audio, Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {campaign} from "./campaigns/showtime-ticket-link.js";

const colors = {
  deepNavy: "#1A1432",
  navy: "#241C46",
  gold: "#F0C75E",
  plum: "#8A6DD1",
  ivory: "#F6F1E8",
  warmCanvas: "#F7F2EA",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Background = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, campaign.durationInFrames], [-80, 80], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.deepNavy}, ${colors.navy} 58%, #33205a)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          left: -360 + drift,
          top: 420,
          background: "radial-gradient(circle, rgba(138,109,209,.25), rgba(138,109,209,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          borderRadius: "50%",
          right: -300 - drift,
          top: -180,
          background: "radial-gradient(circle, rgba(240,199,94,.20), rgba(240,199,94,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Caption = ({copy, kicker}: {copy: string; kicker?: string}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 0.35 * fps, 2.8 * fps, 3.4 * fps], [0, 1, 1, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const y = interpolate(frame, [0, 0.45 * fps], [28, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{position: "absolute", left: 76, right: 76, top: 120, opacity, transform: `translateY(${y}px)`}}>
      {kicker ? (
        <div style={{color: colors.gold, fontSize: 22, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 18}}>
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          color: colors.ivory,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 72,
          fontWeight: 750,
          letterSpacing: "-0.045em",
          lineHeight: 1.04,
          maxWidth: 920,
        }}
      >
        {copy}
      </div>
      <div style={{width: 92, height: 6, borderRadius: 999, background: colors.gold, marginTop: 28}} />
    </div>
  );
};

const ProductStage = ({
  clipStart,
  playbackRate,
  focus,
  disclosure,
}: {
  clipStart: number;
  playbackRate: number;
  focus: string;
  disclosure?: string;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scale = interpolate(frame, [0, 3.8 * fps], [0.965, 1.02], clamp);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 54,
          right: 54,
          top: 430,
          height: 1060,
          borderRadius: 44,
          padding: 10,
          background: "linear-gradient(135deg, rgba(240,199,94,.95), rgba(138,109,209,.78))",
          boxShadow: "0 38px 100px rgba(5,2,18,.55)",
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 70}px) scale(${scale})`,
          overflow: "hidden",
        }}
      >
        <div style={{position: "relative", width: "100%", height: "100%", borderRadius: 35, overflow: "hidden", background: colors.warmCanvas}}>
          <Video
            src={staticFile(campaign.recording)}
            muted
            trimBefore={clipStart * fps}
            playbackRate={playbackRate}
            objectFit="cover"
            style={{width: "100%", height: "100%", objectPosition: focus}}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,.4), inset 0 -180px 180px -160px rgba(26,20,50,.38)",
            }}
          />
        </div>
      </div>
      {disclosure ? (
        <div
          style={{
            position: "absolute",
            left: 86,
            right: 86,
            bottom: 150,
            padding: "22px 28px",
            borderRadius: 24,
            background: "rgba(247,242,234,.96)",
            color: colors.navy,
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 27,
            lineHeight: 1.25,
            textAlign: "center",
            boxShadow: "0 16px 50px rgba(0,0,0,.24)",
          }}
        >
          {disclosure}
        </div>
      ) : null}
    </>
  );
};

const ProductScene = ({scene}: {scene: (typeof campaign.scenes)[number]}) => (
  <AbsoluteFill>
    <Caption copy={scene.copy} kicker={scene.id === "provider" ? "OFFICIAL PROVIDER HANDOFF" : "DEIN-DEIN MOVIE DISCOVERY"} />
    {"clipStart" in scene ? (
      <ProductStage
        clipStart={scene.clipStart}
        playbackRate={scene.playbackRate}
        focus={scene.focus}
        disclosure={"disclosure" in scene ? scene.disclosure : undefined}
      />
    ) : null}
  </AbsoluteFill>
);

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 0.45 * fps], [0, 1], clamp);
  const scale = interpolate(frame, [0, 0.65 * fps], [0.96, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", opacity}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${scale})`}}>
        <Img
          src={staticFile(campaign.logo)}
          style={{width: 280, height: 280, borderRadius: 34, boxShadow: "0 24px 70px rgba(0,0,0,.34)"}}
        />
        <div style={{color: colors.ivory, fontFamily: "Inter, system-ui, sans-serif", fontSize: 76, fontWeight: 760, marginTop: 54}}>
          Find showtimes
        </div>
        <div style={{color: colors.gold, fontFamily: "Inter, system-ui, sans-serif", fontSize: 38, fontWeight: 700, marginTop: 20}}>
          dein-dein.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ShowtimeTicketLinkIntro = () => (
  <AbsoluteFill>
    <Background />
    <Audio src={staticFile(campaign.audio)} volume={0.34} />
    {campaign.scenes.map((scene) => (
      <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames} premountFor={30}>
        {scene.id === "closing" ? <ClosingScene /> : <ProductScene scene={scene} />}
      </Sequence>
    ))}
  </AbsoluteFill>
);

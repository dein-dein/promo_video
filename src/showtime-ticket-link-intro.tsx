import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {campaign} from "./campaigns/showtime-ticket-link.js";

const colors = {
  deepNavy: "#1A1432",
  navy: "#241C46",
  gold: "#F0C75E",
  plum: "#8A6DD1",
  ivory: "#F6F1E8",
  canvas: "#F7F2EA",
  ink: "#1E1737",
};

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const smooth = Easing.bezier(0.16, 1, 0.3, 1);

const progress = (frame: number, duration: number, start = 0, end = 1) =>
  interpolate(frame, [duration * start, duration * end], [0, 1], {...clamp, easing: smooth});

const DotGrid = () => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.canvas,
      backgroundImage: "radial-gradient(rgba(36,28,70,.13) 1.5px, transparent 1.5px)",
      backgroundSize: "28px 28px",
    }}
  />
);

const BrowserWindow = ({scene}: {scene: (typeof campaign.scenes)[number]}) => {
  const frame = useCurrentFrame();
  if (!("stateFrame" in scene)) return null;

  const camera = scene.camera!;
  const focusItems = scene.focus ?? [];
  const stateFrame = scene.stateFrame!;
  const duration = scene.durationInFrames;
  const reveal = progress(frame, duration, 0, 0.18);
  const travel = progress(frame, duration, 0.08, 0.92);
  const exit = progress(frame, duration, 0.9, 1);
  const x = interpolate(travel, [0, 1], [camera.from.x, camera.to.x]);
  const y = interpolate(travel, [0, 1], [camera.from.y, camera.to.y]);
  const scale = interpolate(travel, [0, 1], [camera.from.scale, camera.to.scale]);

  return (
    <div
      style={{
        position: "absolute",
        left: 160,
        right: 160,
        top: 214,
        height: 790,
        borderRadius: 28,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(36,28,70,.14)",
        boxShadow: "0 35px 90px rgba(36,28,70,.22)",
        opacity: reveal * (1 - exit),
        transform: `translateY(${interpolate(reveal, [0, 1], [28, 0])}px) scale(${interpolate(reveal, [0, 1], [.985, 1])})`,
      }}
    >
      <div style={{height: 54, background: "#fffaf3", borderBottom: "1px solid rgba(36,28,70,.12)", display: "flex", alignItems: "center", paddingLeft: 24, gap: 12}}>
        {["#D66E55", colors.gold, "#72A879"].map((color) => (
          <div key={color} style={{width: 14, height: 14, borderRadius: "50%", background: color}} />
        ))}
        <div style={{marginLeft: 28, width: 520, height: 25, borderRadius: 999, background: "rgba(36,28,70,.07)"}} />
      </div>
      <div style={{position: "relative", height: 736, overflow: "hidden", background: colors.canvas}}>
        <Img
          src={staticFile(stateFrame)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: `${x}% ${y}%`,
            transform: `scale(${scale})`,
          }}
        />
        {focusItems.map((item, index) => {
          const focusReveal = interpolate(frame, [18 + index * 10, 34 + index * 10], [0, 1], {...clamp, easing: smooth});
          return (
            <div
              key={item.label}
              style={{
                position: "absolute",
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.width}%`,
                height: `${item.height}%`,
                borderRadius: 18,
                border: `3px solid ${colors.gold}`,
                boxShadow: "0 0 0 7px rgba(240,199,94,.18), 0 12px 36px rgba(36,28,70,.24)",
                opacity: focusReveal,
                transform: `translate(-50%,-50%) scale(${interpolate(focusReveal, [0, 1], [.94, 1])})`,
              }}
            >
              <div style={{position: "absolute", left: 10, top: -36, padding: "7px 13px", borderRadius: 999, background: colors.navy, color: colors.ivory, fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 700, whiteSpace: "nowrap"}}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductScene = ({scene}: {scene: (typeof campaign.scenes)[number]}) => {
  const frame = useCurrentFrame();
  const reveal = progress(frame, scene.durationInFrames, 0.02, 0.2);
  return (
    <AbsoluteFill>
      <DotGrid />
      <div style={{position: "absolute", width: 600, height: 600, right: -180, top: -250, borderRadius: "50%", background: "radial-gradient(circle, rgba(138,109,209,.2), transparent 70%)"}} />
      <div style={{position: "absolute", left: 160, top: 58, opacity: reveal, transform: `translateY(${interpolate(reveal, [0, 1], [24, 0])}px)`}}>
        <div style={{fontFamily: "Inter, system-ui, sans-serif", color: colors.navy, fontSize: 58, lineHeight: 1.04, letterSpacing: "-.045em", fontWeight: 780}}>
          {scene.copy}
        </div>
        <div style={{width: 92, height: 6, marginTop: 18, borderRadius: 10, background: colors.gold}} />
      </div>
      <BrowserWindow scene={scene} />
    </AbsoluteFill>
  );
};

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const reveal = progress(frame, 90, 0, 0.22);
  return (
    <AbsoluteFill style={{background: colors.deepNavy, alignItems: "center", justifyContent: "center"}}>
      <div style={{position: "absolute", width: 850, height: 850, borderRadius: "50%", background: "radial-gradient(circle, rgba(138,109,209,.22), transparent 70%)"}} />
      <div style={{display: "flex", alignItems: "center", gap: 58, opacity: reveal, transform: `translateY(${interpolate(reveal, [0, 1], [24, 0])}px) scale(${interpolate(reveal, [0, 1], [.96, 1])})`}}>
        <Img src={staticFile(campaign.logo)} style={{width: 230, height: 230, borderRadius: 28, boxShadow: "0 25px 65px rgba(0,0,0,.35)"}} />
        <div>
          <div style={{fontFamily: "Inter, system-ui, sans-serif", color: colors.ivory, fontSize: 78, fontWeight: 780, letterSpacing: "-.045em"}}>Find showtimes</div>
          <div style={{fontFamily: "Inter, system-ui, sans-serif", color: colors.gold, fontSize: 42, fontWeight: 720, marginTop: 14}}>dein-dein.com</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ShowtimeTicketLinkIntro = () => (
  <AbsoluteFill>
    <Audio src={staticFile(campaign.audio)} volume={0.32} />
    {campaign.scenes.map((scene) => (
      <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames} premountFor={30}>
        {scene.id === "closing" ? <ClosingScene /> : <ProductScene scene={scene} />}
      </Sequence>
    ))}
  </AbsoluteFill>
);

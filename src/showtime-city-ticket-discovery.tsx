import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {showtimeCityTicketDiscoveryCampaign as campaign} from "./campaigns/showtime-city-ticket-discovery.js";

const colors = {
  deepNavy: "#1A1432",
  navy: "#241C46",
  gold: "#F0C75E",
  plum: "#8A6DD1",
  ivory: "#F6F1E8",
  canvas: "#F7F2EA",
};
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const smooth = Easing.bezier(0.16, 1, 0.3, 1);
const ease = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: smooth});
const mix = (frame: number, from: number, to: number, a: number, b: number) =>
  interpolate(frame, [from, to], [a, b], {...clamp, easing: smooth});

const Callout = ({
  text,
  placement,
}: {
  text: string;
  placement: {left: number; top: number; maxWidth: number};
}) => (
  <div
    style={{
      position: "absolute",
      left: placement.left,
      top: placement.top,
      maxWidth: placement.maxWidth,
      padding: "15px 27px",
      borderRadius: 18,
      background: "rgba(26,20,50,.92)",
      color: colors.ivory,
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: 31,
      fontWeight: 700,
      letterSpacing: "-.02em",
      textAlign: "center",
      boxShadow: "0 18px 50px rgba(26,20,50,.26)",
      borderLeft: `6px solid ${colors.gold}`,
      zIndex: 8,
    }}
  >
    {text}
  </div>
);

const Cursor = ({x, y, click = 0}: {x: number; y: number; click?: number}) => (
  <>
    {click > 0 ? (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: `4px solid ${colors.gold}`,
          opacity: 1 - click,
          transform: `translate(-50%,-50%) scale(${0.4 + click * 1.25})`,
          zIndex: 9,
        }}
      />
    ) : null}
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 0,
        height: 0,
        borderLeft: "14px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "34px solid #fff",
        filter: "drop-shadow(0 2px 2px rgba(26,20,50,.75))",
        transform: "rotate(-38deg)",
        transformOrigin: "bottom center",
        zIndex: 10,
      }}
    />
  </>
);

const Screenshot = ({
  src,
  scale = 1,
  focusX = 0.5,
  focusY = 0.5,
  opacity = 1,
  y = 0,
  fit = "cover",
}: {
  src: string;
  scale?: number;
  focusX?: number;
  focusY?: number;
  opacity?: number;
  y?: number;
  fit?: "cover" | "contain";
}) => (
  <Img
    src={staticFile(src)}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: fit,
      background: "#fff",
      transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
      transform: `translateY(${y}px) scale(${scale})`,
      opacity,
    }}
  />
);

const FocusCallout = ({id}: {id: keyof typeof campaign.callouts}) => (
  <Callout text={campaign.copy[id]} placement={campaign.callouts[id].position} />
);

const ProductFrame = ({children}: {children: React.ReactNode}) => (
  <AbsoluteFill style={{background: colors.canvas, padding: 24}}>
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 28,
        background: "#fff",
        border: "1px solid rgba(36,28,70,.13)",
        boxShadow: "0 28px 82px rgba(36,28,70,.2)",
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

const Closing = ({opacity}: {opacity: number}) => (
  <AbsoluteFill style={{background: colors.deepNavy, alignItems: "center", justifyContent: "center", opacity}}>
    <div style={{position: "absolute", width: 950, height: 950, borderRadius: "50%", background: "radial-gradient(circle, rgba(138,109,209,.23), transparent 70%)"}} />
    <div style={{display: "flex", alignItems: "center", gap: 46, transform: `translateY(${(1 - opacity) * 18}px) scale(${0.97 + opacity * 0.03})`}}>
      <Img src={staticFile(campaign.logo)} style={{width: 190, height: 190, borderRadius: 24}} />
      <div style={{fontFamily: "Inter, system-ui, sans-serif", maxWidth: 1040}}>
        <div style={{fontSize: 64, lineHeight: 1.03, fontWeight: 780, color: colors.ivory, letterSpacing: "-.045em"}}>{campaign.copy.closingCta}</div>
        <div style={{fontSize: 38, fontWeight: 720, color: colors.gold, marginTop: 15}}>{campaign.copy.url}</div>
        <div style={{fontSize: 21, lineHeight: 1.4, color: "rgba(246,241,232,.72)", marginTop: 28}}>{campaign.disclaimer}</div>
      </div>
    </div>
  </AbsoluteFill>
);

export const ShowtimeCityTicketDiscovery = () => {
  const frame = useCurrentFrame();
  const {scenes} = campaign;
  const screenshots = campaign.screenshots.sources;

  if (frame < scenes.movieList.from) {
    const scale = mix(frame, 0, 72, 1, scenes.homepage.target.scale);
    return <ProductFrame><Screenshot src={screenshots.homepage} scale={scale} focusX={0.27} focusY={0.26} /></ProductFrame>;
  }

  if (frame < scenes.movieHover.from) {
    const scroll = ease(
      frame,
      scenes.movieList.scrollTransition.start,
      scenes.movieList.scrollTransition.end,
    );
    const scale = mix(frame, scenes.movieList.fullListEnd, scenes.movieList.zoomEnd, 1, scenes.movieList.target.scale);
    const cursorTravel = ease(frame, 102, 157);
    return (
      <ProductFrame>
        <Screenshot
          src={screenshots.homepage}
          scale={scenes.homepage.target.scale}
          focusX={0.27}
          focusY={0.26}
          y={mix(scroll, 0, 1, 0, scenes.movieList.scrollTransition.homepageExitY)}
          opacity={1 - scroll * 0.45}
        />
        <Screenshot
          src={screenshots.movieList}
          scale={scale}
          focusX={0.3}
          focusY={0.25}
          fit="contain"
          y={frame < scenes.movieList.fullListEnd ? mix(scroll, 0, 1, scenes.movieList.scrollTransition.movieListEnterY, 0) : 0}
          opacity={scroll}
        />
        <Cursor x={mix(cursorTravel, 0, 1, 1540, 550)} y={mix(cursorTravel, 0, 1, 900, 285)} />
        {frame >= 102 && frame < scenes.movieList.fullListEnd ? <FocusCallout id="discovery" /> : null}
        {frame >= scenes.movieList.fullListEnd ? <FocusCallout id="chooseMovie" /> : null}
      </ProductFrame>
    );
  }

  if (frame < scenes.loading.from) {
    const hover = ease(frame, scenes.movieHover.from, scenes.movieHover.from + 15);
    const click = ease(frame, 184, 198);
    return (
      <ProductFrame>
        <Screenshot src={screenshots.movieList} scale={1.55} focusX={0.3} focusY={0.25} />
        <div
          style={{
            position: "absolute",
            ...scenes.movieHover.overlay.mask,
            background: "#fff",
            opacity: hover,
            zIndex: 6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: scenes.movieHover.overlay.left,
            top: scenes.movieHover.overlay.top,
            color: scenes.movieHover.color,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: scenes.movieHover.overlay.fontSize,
            fontWeight: 400,
            letterSpacing: "-.035em",
            opacity: hover,
            zIndex: 7,
          }}
        >
          {scenes.movieHover.title}
        </div>
        <Cursor x={585} y={175} click={click} />
        <FocusCallout id="chooseMovie" />
      </ProductFrame>
    );
  }

  if (frame < scenes.nextSession.from) {
    const load = ease(frame, scenes.loading.from, scenes.nextSession.from - 2);
    return (
      <ProductFrame>
        <Screenshot src={screenshots.eventDetail} opacity={load} />
        <div style={{position: "absolute", left: 0, top: 0, height: 6, width: `${load * 100}%`, background: colors.gold, boxShadow: "0 0 18px rgba(240,199,94,.65)"}} />
      </ProductFrame>
    );
  }

  if (frame < scenes.chooseCity.from) {
    const {timing, target} = scenes.nextSession;
    const zoomIn = ease(frame, timing.zoomInStart, timing.zoomInEnd);
    const zoomOut = ease(frame, timing.holdEnd, timing.zoomOutEnd);
    const scale = interpolate(zoomOut, [0, 1], [interpolate(zoomIn, [0, 1], [1, target.scale]), 1]);
    const cityReveal = ease(frame, 345, timing.scrollEnd);
    const detailY = mix(frame, timing.zoomOutEnd, timing.scrollEnd, 0, -900);
    const cityY = mix(frame, 345, timing.scrollEnd, 880, 0);
    return (
      <ProductFrame>
        <Screenshot src={screenshots.eventDetail} scale={scale} focusX={target.x} focusY={target.y} y={detailY} opacity={1 - cityReveal} />
        <Screenshot src={screenshots.cityShowtimes} y={cityY} opacity={cityReveal} />
        {frame < timing.holdEnd ? <FocusCallout id="nextSession" /> : <FocusCallout id="browseCities" />}
      </ProductFrame>
    );
  }

  if (frame < scenes.provider.from) {
    const travel = ease(frame, 458, 500);
    const click = ease(frame, 501, 518);
    const reveal = ease(frame, 512, scenes.provider.from);
    return (
      <ProductFrame>
        <Screenshot src={screenshots.cityShowtimes} opacity={1 - reveal} />
        <Screenshot src={screenshots.dusseldorfShowtimes} opacity={reveal} />
        <Cursor x={mix(travel, 0, 1, 1480, 260)} y={mix(travel, 0, 1, 890, 350)} click={click} />
        <FocusCallout id="chooseCity" />
      </ProductFrame>
    );
  }

  if (frame < scenes.closing.from) {
    const travel = ease(frame, scenes.provider.from, 570);
    const hover = ease(frame, 570, 600);
    return (
      <ProductFrame>
        <Screenshot src={screenshots.dusseldorfShowtimes} />
        <div style={{position: "absolute", left: 1490, top: 402, width: 250, height: 66, borderRadius: 999, border: `4px solid ${colors.gold}`, boxShadow: `0 0 0 ${hover * 12}px rgba(240,199,94,.22)`, opacity: hover}} />
        <Cursor x={mix(travel, 0, 1, 310, 1615)} y={mix(travel, 0, 1, 900, 435)} />
        <FocusCallout id="providerCta" />
      </ProductFrame>
    );
  }

  return <Closing opacity={ease(frame, scenes.closing.from, scenes.closing.from + 18)} />;
};

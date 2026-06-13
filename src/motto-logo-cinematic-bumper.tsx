import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {mottoLogoCinematicBumperCampaign as campaign} from "./campaigns/motto-logo-cinematic-bumper.js";

type Format = "vertical" | "landscape";

const colors = {
  deepNavy: "#1A1432",
  navy: "#241C46",
  gold: "#F0C75E",
  plum: "#8A6DD1",
  ivory: "#F6F1E8",
  canvas: "#F7F2EA",
  ink: "#1E1737",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const progress = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: easeOut});

const MottoBeat = ({
  text,
  color,
  format,
  atmosphere = false,
}: {
  text: string;
  color: string;
  format: Format;
  atmosphere?: boolean;
}) => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      background: colors.deepNavy,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {atmosphere ? (
      <div
        style={{
          position: "absolute",
          width: format === "vertical" ? 1320 : 1500,
          height: format === "vertical" ? 1320 : 1050,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138,109,209,.3) 0%, rgba(138,109,209,0) 70%)",
        }}
      />
    ) : null}
    <div
      style={{
        maxWidth: format === "vertical" ? 900 : 1600,
        padding: format === "vertical" ? "0 72px" : "0 120px",
        color,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: format === "vertical" ? 152 : 178,
        fontWeight: 760,
        letterSpacing: "-0.055em",
        lineHeight: 0.95,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);

const TransitionBeat = ({frame, format}: {frame: number; format: Format}) => {
  const line = progress(
    frame,
    campaign.scenes.transition.from,
    campaign.scenes.transition.to,
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.navy,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: format === "vertical" ? `${line * 72}%` : `${line * 58}%`,
          height: format === "vertical" ? 8 : 7,
          borderRadius: 999,
          background: colors.gold,
          transformOrigin: "center",
        }}
      />
    </AbsoluteFill>
  );
};

const Closing = ({frame, format}: {frame: number; format: Format}) => {
  const reveal = progress(
    frame,
    campaign.logoReveal.from,
    campaign.logoReveal.to,
  );
  const logoScale = interpolate(
    reveal,
    [0, 1],
    [campaign.logoReveal.initialScale, campaign.logoReveal.finalScale],
  );
  const isVertical = format === "vertical";

  return (
    <AbsoluteFill
      style={{
        background: colors.canvas,
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "130px 82px" : "80px 128px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isVertical ? 62 : 96,
          width: "100%",
        }}
      >
        <Img
          src={staticFile(campaign.logo)}
          style={{
            width: isVertical ? 620 : 520,
            height: isVertical ? 620 : 520,
            objectFit: "contain",
            transform: `scale(${logoScale})`,
          }}
        />
        <div
          style={{
            maxWidth: isVertical ? 860 : 840,
            color: colors.ink,
            fontFamily: "Inter, system-ui, sans-serif",
            textAlign: isVertical ? "center" : "left",
          }}
        >
          <div
            style={{
              color: colors.navy,
              fontSize: isVertical ? 76 : 78,
              fontWeight: 780,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            {campaign.copy.url}
          </div>
          <div
            style={{
              height: isVertical ? 7 : 6,
              width: isVertical ? 190 : 180,
              margin: isVertical ? "32px auto 31px" : "30px 0 29px",
              borderRadius: 999,
              background: colors.gold,
            }}
          />
          <div
            style={{
              color: colors.ink,
              fontSize: isVertical ? 35 : 31,
              fontWeight: 560,
              letterSpacing: "-0.015em",
              lineHeight: 1.35,
            }}
          >
            {campaign.disclaimer}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MottoLogoCinematicBumper = ({format}: {format: Format}) => {
  const frame = useCurrentFrame();

  if (frame <= campaign.scenes.firstBeat.to) {
    return (
      <MottoBeat
        text={campaign.copy.firstBeat}
        color={colors.ivory}
        format={format}
      />
    );
  }

  if (frame <= campaign.scenes.secondBeat.to) {
    return (
      <MottoBeat
        text={campaign.copy.secondBeat}
        color={colors.gold}
        format={format}
        atmosphere
      />
    );
  }

  if (frame <= campaign.scenes.transition.to) {
    return <TransitionBeat frame={frame} format={format} />;
  }

  return <Closing frame={frame} format={format} />;
};

export const MottoLogoCinematicBumperVertical = () => (
  <MottoLogoCinematicBumper format="vertical" />
);

export const MottoLogoCinematicBumperLandscape = () => (
  <MottoLogoCinematicBumper format="landscape" />
);

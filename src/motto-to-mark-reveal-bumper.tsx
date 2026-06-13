import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {mottoToMarkRevealCampaign as campaign} from "./campaigns/motto-to-mark-reveal-bumper.js";

type Format = "vertical" | "landscape";

const colors = {
  deepNavy: "#1A1432",
  gold: "#F0C75E",
  ivory: "#F6F1E8",
  canvas: "#F7F2EA",
  ink: "#1E1737",
  navy: "#241C46",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const progress = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: easeOut});

const TextStory = ({frame, format}: {frame: number; format: Format}) => {
  const first = progress(
    frame,
    campaign.timing.firstLineIn.from,
    campaign.timing.firstLineIn.to,
  );
  const second = progress(
    frame,
    campaign.timing.secondLineIn.from,
    campaign.timing.secondLineIn.to,
  );
  const underline = progress(
    frame,
    campaign.timing.underline.from,
    campaign.timing.underline.to,
  );
  const exit = progress(
    frame,
    campaign.timing.textExit.from,
    campaign.timing.textExit.to,
  );
  const isVertical = format === "vertical";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - exit,
        transform: `translateY(${-exit * (isVertical ? 52 : 38)}px)`,
        zIndex: 3,
      }}
    >
      <div
        style={{
          color: colors.ivory,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: isVertical ? 142 : 142,
          fontWeight: 760,
          letterSpacing: "-0.055em",
          lineHeight: 0.94,
          opacity: campaign.initialTextOpacity + first * (1 - campaign.initialTextOpacity),
          transform: `translateY(${(1 - first) * 18}px)`,
        }}
      >
        {campaign.copy.firstLine}
      </div>
      <div
        style={{
          marginTop: isVertical ? 30 : 24,
          color: colors.gold,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: isVertical ? 142 : 142,
          fontWeight: 760,
          letterSpacing: "-0.055em",
          lineHeight: 0.94,
          opacity: second,
          transform: `translateY(${(1 - second) * 18}px)`,
          textAlign: "center",
        }}
      >
        {campaign.copy.secondLine}
      </div>
      <div
        style={{
          width: `${underline * (isVertical ? 330 : 360)}px`,
          height: isVertical ? 8 : 7,
          marginTop: isVertical ? 46 : 40,
          borderRadius: 999,
          background: colors.gold,
        }}
      />
    </div>
  );
};

const MarkStory = ({frame, format}: {frame: number; format: Format}) => {
  const reveal = progress(
    frame,
    campaign.timing.logoReveal.from,
    campaign.timing.logoReveal.to,
  );
  const copyReveal = progress(
    frame,
    campaign.timing.finalCopyReveal.from,
    campaign.timing.finalCopyReveal.to,
  );
  const scale = interpolate(
    reveal,
    [0, 1],
    [campaign.logoReveal.initialScale, campaign.logoReveal.finalScale],
  );
  const isVertical = format === "vertical";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: isVertical ? "130px 82px" : "80px 128px",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 62 : 96,
        opacity: reveal,
        zIndex: 2,
      }}
    >
      <Img
        src={staticFile(campaign.logo)}
        style={{
          width: isVertical ? 620 : 520,
          height: isVertical ? 620 : 520,
          objectFit: "contain",
          transform: `translateY(${(1 - reveal) * campaign.logoReveal.risePixels}px) scale(${scale})`,
        }}
      />
      <div
        style={{
          maxWidth: isVertical ? 860 : 840,
          color: colors.ink,
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: isVertical ? "center" : "left",
          opacity: copyReveal,
          transform: `translateY(${(1 - copyReveal) * 14}px)`,
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
            fontSize: isVertical ? 35 : 31,
            fontWeight: 620,
            letterSpacing: "-0.015em",
            lineHeight: 1.3,
          }}
        >
          {campaign.platformStatement}
        </div>
        <div
          style={{
            maxWidth: isVertical ? 760 : 760,
            margin: isVertical ? "25px auto 0" : "23px 0 0",
            paddingTop: isVertical ? 23 : 20,
            borderTop: `2px solid ${colors.gold}`,
            color: colors.navy,
            fontSize: isVertical ? 23 : 20,
            fontStyle: "italic",
            fontWeight: 480,
            letterSpacing: "-0.005em",
            lineHeight: 1.4,
            opacity: 0.76,
          }}
        >
          {campaign.disclaimer}
        </div>
      </div>
    </div>
  );
};

const MottoToMarkReveal = ({format}: {format: Format}) => {
  const frame = useCurrentFrame();
  const background = progress(
    frame,
    campaign.timing.backgroundTransition.from,
    campaign.timing.backgroundTransition.to,
  );

  return (
    <AbsoluteFill style={{overflow: "hidden", background: colors.deepNavy}}>
      <AbsoluteFill
        style={{
          background: colors.canvas,
          opacity: background,
        }}
      />
      <TextStory frame={frame} format={format} />
      <MarkStory frame={frame} format={format} />
    </AbsoluteFill>
  );
};

export const MottoToMarkRevealVertical = () => (
  <MottoToMarkReveal format="vertical" />
);
export const MottoToMarkRevealLandscape = () => (
  <MottoToMarkReveal format="landscape" />
);

import {AbsoluteFill, Img, staticFile} from "remotion";
import {
  buildMovieShowtimePosterCopy,
  movieShowtimeSocialPosterCampaign as campaign,
  validateMovieShowtimePosterInput,
} from "./campaigns/movie-showtime-social-poster.js";

export type MovieShowtimeSocialPosterProps = {
  category: string;
  region: string;
  movieTitle?: string;
};

const colors = {
  deepNavy: "#1A1432",
  navy: "#241C46",
  gold: "#F0C75E",
  plum: "#8A6DD1",
  ivory: "#F6F1E8",
};

const movieTitleSize = (title: string) => {
  if (title.length <= 22) return 72;
  if (title.length <= 44) return 60;
  return 50;
};

export const MovieShowtimeSocialPoster = (
  props: MovieShowtimeSocialPosterProps,
) => {
  const input = validateMovieShowtimePosterInput(props);
  const copy = buildMovieShowtimePosterCopy(input);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        padding: "72px 72px 54px",
        background:
          "linear-gradient(150deg, #1A1432 0%, #241C46 70%, #39245F 100%)",
        color: colors.ivory,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          right: -290,
          top: 150,
          background:
            "radial-gradient(circle, rgba(240,199,94,.28) 0%, rgba(240,199,94,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          left: -420,
          bottom: 80,
          background:
            "radial-gradient(circle, rgba(138,109,209,.18) 0%, rgba(138,109,209,0) 70%)",
        }}
      />

      <Img
        src={staticFile(campaign.logo)}
        style={{width: 118, height: 118, objectFit: "contain"}}
      />

      <div
        style={{
          position: "relative",
          marginTop: 82,
          maxWidth: 870,
          fontSize: 110,
          lineHeight: 0.98,
          letterSpacing: "-0.06em",
          fontWeight: 780,
        }}
      >
        <div>{input.category}</div>
        <div style={{color: colors.gold}}>showtimes</div>
        <div>in {input.region}.</div>
      </div>

      <div
        style={{
          width: 150,
          height: 10,
          marginTop: 48,
          borderRadius: 999,
          background: colors.gold,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 242,
        }}
      >
        <div
          style={{
            marginBottom: 18,
            color: colors.gold,
            fontSize: 24,
            fontWeight: 760,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {copy.movieTitle ? "Now discover" : "Discover cinema near you"}
        </div>
        <div
          style={{
            maxWidth: 840,
            color: copy.movieTitle ? colors.ivory : "rgba(246,241,232,.78)",
            fontSize: copy.movieTitle ? movieTitleSize(copy.movieTitle) : 39,
            fontWeight: copy.movieTitle ? 760 : 520,
            letterSpacing: copy.movieTitle ? "-0.045em" : "-0.02em",
            lineHeight: copy.movieTitle ? 1.03 : 1.24,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {copy.movieTitle ??
            "Browse current screenings and confirm details with the official provider."}
        </div>
        <div
          style={{
            display: "inline-flex",
            marginTop: 30,
            padding: "18px 30px",
            borderRadius: 999,
            background: colors.gold,
            color: colors.navy,
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {campaign.copy.cta}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 52,
          paddingTop: 24,
          borderTop: "2px solid rgba(246,241,232,.18)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 30,
        }}
      >
        <div style={{fontSize: 28, fontWeight: 800, whiteSpace: "nowrap"}}>
          {campaign.copy.url}
        </div>
        <div
          style={{
            maxWidth: 590,
            color: "rgba(246,241,232,.72)",
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.38,
            textAlign: "right",
          }}
        >
          {campaign.copy.disclaimer}
        </div>
      </div>
    </AbsoluteFill>
  );
};

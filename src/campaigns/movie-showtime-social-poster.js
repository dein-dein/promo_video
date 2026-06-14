const MAX_MOVIE_TITLE_LENGTH = 72;
const UNSAFE_VALUE = /[\/\\<>:"|?*\u0000-\u001f]/;

export const movieShowtimeSocialPosterCampaign = {
  composition: {
    id: "MovieShowtimeSocialPoster",
    width: 1080,
    height: 1350,
  },
  logo: "dein-new-logo.png",
  copy: {
    cta: "Find showtimes",
    url: "dein-dein.com",
    disclaimer:
      "Dein-Dein is an independent discovery platform. Confirm showtimes, availability, and booking terms with the official provider.",
  },
  defaultProps: {
    category: "Mollywood",
    region: "Germany",
  },
};

const requiredText = (value, field) => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required.`);
  }
  const text = value.trim();
  if (UNSAFE_VALUE.test(text)) {
    throw new Error(`${field} contains unsafe characters.`);
  }
  return text;
};

export const validateMovieShowtimePosterInput = (input) => {
  const category = requiredText(input?.category, "Category");
  const region = requiredText(input?.region, "Region");
  const movieTitle =
    input?.movieTitle == null || input.movieTitle.trim().length === 0
      ? undefined
      : requiredText(input.movieTitle, "Movie title");

  if (movieTitle && movieTitle.length > MAX_MOVIE_TITLE_LENGTH) {
    throw new Error(
      `Movie title is too long. Use ${MAX_MOVIE_TITLE_LENGTH} characters or fewer.`,
    );
  }

  return {category, region, ...(movieTitle ? {movieTitle} : {})};
};

export const buildMovieShowtimePosterCopy = (input) => {
  const validated = validateMovieShowtimePosterInput(input);
  return {
    headline: `${validated.category} showtimes in ${validated.region}.`,
    movieTitle: validated.movieTitle ?? null,
  };
};

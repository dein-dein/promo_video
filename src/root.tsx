import {Composition} from "remotion";
import {campaign} from "./campaigns/showtime-ticket-link.js";
import {ShowtimeTicketLinkIntro} from "./showtime-ticket-link-intro";

export const Root = () => (
  <Composition
    id="ShowtimeTicketLinkIntro"
    component={ShowtimeTicketLinkIntro}
    durationInFrames={campaign.durationInFrames}
    fps={campaign.fps}
    width={1080}
    height={1920}
  />
);

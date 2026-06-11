import {Composition} from "remotion";
import {campaign} from "./campaigns/showtime-ticket-link.js";
import {homepageBrowserLoadCampaign} from "./campaigns/homepage-browser-load.js";
import {HomepageBrowserLoadBumper} from "./homepage-browser-load-bumper";
import {ShowtimeTicketLinkIntro} from "./showtime-ticket-link-intro";

export const Root = () => (
  <>
    <Composition
      id="ShowtimeTicketLinkIntro"
      component={ShowtimeTicketLinkIntro}
      durationInFrames={campaign.durationInFrames}
      fps={campaign.fps}
      width={campaign.width}
      height={campaign.height}
    />
    <Composition
      id="HomepageBrowserLoadBumper"
      component={HomepageBrowserLoadBumper}
      durationInFrames={homepageBrowserLoadCampaign.durationInFrames}
      fps={homepageBrowserLoadCampaign.fps}
      width={homepageBrowserLoadCampaign.width}
      height={homepageBrowserLoadCampaign.height}
    />
  </>
);

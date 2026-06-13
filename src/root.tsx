import {Composition} from "remotion";
import {campaign} from "./campaigns/showtime-ticket-link.js";
import {homepageBrowserLoadCampaign} from "./campaigns/homepage-browser-load.js";
import {HomepageBrowserLoadBumper} from "./homepage-browser-load-bumper";
import {mottoLogoCinematicBumperCampaign} from "./campaigns/motto-logo-cinematic-bumper.js";
import {mottoToMarkRevealCampaign} from "./campaigns/motto-to-mark-reveal-bumper.js";
import {showtimeCityTicketDiscoveryCampaign} from "./campaigns/showtime-city-ticket-discovery.js";
import {
  MottoLogoCinematicBumperLandscape,
  MottoLogoCinematicBumperVertical,
} from "./motto-logo-cinematic-bumper";
import {
  MottoToMarkRevealLandscape,
  MottoToMarkRevealVertical,
} from "./motto-to-mark-reveal-bumper";
import {ShowtimeTicketLinkIntro} from "./showtime-ticket-link-intro";
import {ShowtimeCityTicketDiscovery} from "./showtime-city-ticket-discovery";

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
    <Composition
      id="ShowtimeCityTicketDiscovery"
      component={ShowtimeCityTicketDiscovery}
      durationInFrames={showtimeCityTicketDiscoveryCampaign.durationInFrames}
      fps={showtimeCityTicketDiscoveryCampaign.fps}
      width={showtimeCityTicketDiscoveryCampaign.width}
      height={showtimeCityTicketDiscoveryCampaign.height}
    />
    <Composition
      id={mottoLogoCinematicBumperCampaign.compositions.vertical.id}
      component={MottoLogoCinematicBumperVertical}
      durationInFrames={mottoLogoCinematicBumperCampaign.durationInFrames}
      fps={mottoLogoCinematicBumperCampaign.fps}
      width={mottoLogoCinematicBumperCampaign.compositions.vertical.width}
      height={mottoLogoCinematicBumperCampaign.compositions.vertical.height}
    />
    <Composition
      id={mottoLogoCinematicBumperCampaign.compositions.landscape.id}
      component={MottoLogoCinematicBumperLandscape}
      durationInFrames={mottoLogoCinematicBumperCampaign.durationInFrames}
      fps={mottoLogoCinematicBumperCampaign.fps}
      width={mottoLogoCinematicBumperCampaign.compositions.landscape.width}
      height={mottoLogoCinematicBumperCampaign.compositions.landscape.height}
    />
    <Composition
      id={mottoToMarkRevealCampaign.compositions.vertical.id}
      component={MottoToMarkRevealVertical}
      durationInFrames={mottoToMarkRevealCampaign.durationInFrames}
      fps={mottoToMarkRevealCampaign.fps}
      width={mottoToMarkRevealCampaign.compositions.vertical.width}
      height={mottoToMarkRevealCampaign.compositions.vertical.height}
    />
    <Composition
      id={mottoToMarkRevealCampaign.compositions.landscape.id}
      component={MottoToMarkRevealLandscape}
      durationInFrames={mottoToMarkRevealCampaign.durationInFrames}
      fps={mottoToMarkRevealCampaign.fps}
      width={mottoToMarkRevealCampaign.compositions.landscape.width}
      height={mottoToMarkRevealCampaign.compositions.landscape.height}
    />
  </>
);

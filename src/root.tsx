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
import {threeVideoMergeCampaign} from "./campaigns/three-video-merge.js";
import {
  HomepageBrowserLoadVertical,
  ShowtimeCityTicketDiscoveryVerticalV02,
  ThreeVideoMergeLandscape,
  ThreeVideoMergeVertical,
  ThreeVideoMergeVerticalV03,
} from "./three-video-merge";
import {movieShowtimeSocialPosterCampaign} from "./campaigns/movie-showtime-social-poster.js";
import {MovieShowtimeSocialPoster} from "./movie-showtime-social-poster";

export const Root = () => (
  <>
    <Composition
      id={movieShowtimeSocialPosterCampaign.composition.id}
      component={MovieShowtimeSocialPoster}
      durationInFrames={1}
      fps={30}
      width={movieShowtimeSocialPosterCampaign.composition.width}
      height={movieShowtimeSocialPosterCampaign.composition.height}
      defaultProps={movieShowtimeSocialPosterCampaign.defaultProps}
    />
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
    <Composition
      id="HomepageBrowserLoadVertical"
      component={HomepageBrowserLoadVertical}
      durationInFrames={threeVideoMergeCampaign.segments.homepage.durationInFrames}
      fps={threeVideoMergeCampaign.fps}
      width={1080}
      height={1920}
    />
    <Composition
      id="ShowtimeCityTicketDiscoveryVerticalV02"
      component={ShowtimeCityTicketDiscoveryVerticalV02}
      durationInFrames={threeVideoMergeCampaign.segments.showtime.durationInFrames}
      fps={threeVideoMergeCampaign.fps}
      width={1080}
      height={1920}
    />
    <Composition
      id={threeVideoMergeCampaign.compositions.landscape.id}
      component={ThreeVideoMergeLandscape}
      durationInFrames={threeVideoMergeCampaign.durationInFrames}
      fps={threeVideoMergeCampaign.fps}
      width={threeVideoMergeCampaign.compositions.landscape.width}
      height={threeVideoMergeCampaign.compositions.landscape.height}
    />
    <Composition
      id={threeVideoMergeCampaign.compositions.vertical.id}
      component={ThreeVideoMergeVertical}
      durationInFrames={threeVideoMergeCampaign.durationInFrames}
      fps={threeVideoMergeCampaign.fps}
      width={threeVideoMergeCampaign.compositions.vertical.width}
      height={threeVideoMergeCampaign.compositions.vertical.height}
    />
    <Composition
      id={threeVideoMergeCampaign.compositions.verticalV03.id}
      component={ThreeVideoMergeVerticalV03}
      durationInFrames={threeVideoMergeCampaign.durationInFrames}
      fps={threeVideoMergeCampaign.fps}
      width={threeVideoMergeCampaign.compositions.verticalV03.width}
      height={threeVideoMergeCampaign.compositions.verticalV03.height}
    />
  </>
);

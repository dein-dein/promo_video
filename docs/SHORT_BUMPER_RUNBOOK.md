# Short Bumper Runbook

Use this runbook for explicitly approved `3-6` second landscape or vertical
videos. It accelerates production after creative direction is settled; it does
not weaken accuracy, privacy, rights, source-preservation, or final-review
requirements.

Use `campaigns/2026-06-11-homepage-browser-load/` as the canonical completed
example. Its URL-typing browser treatment is optional.

## Eligibility And Required Exceptions

A campaign may use this lane when:

- One factual source screenshot or short recording can prove one clear idea.
- The audience benefit can be understood within `3-6` seconds.
- The campaign brief approves the target format, duration, source type, audio
  treatment, and ending.

Record each applicable departure from the default feature-reel contract:

- Duration below approximately `20` seconds
- Landscape or another non-default format
- Approved screenshot instead of a real screen recording
- Silent video-only output
- Product-only or CTA-free ending

Do not use the fast lane when the feature needs multiple interactions,
explanatory captions, uncertain facts, unresolved rights, or an unapproved CTA.

## Recommended Story Rhythm

Adapt the timings to the approved duration:

| Portion | Purpose | Typical Treatment |
| --- | --- | --- |
| First `20-30%` | Establish context or hook | Immediate product or destination cue |
| Middle `35-50%` | Show factual proof | Approved screenshot or short real interaction |
| Final `25-40%` | Resolve on the strongest benefit | One gentle camera move or stable hold |

Use one dominant motion idea. Ensure frame zero is intentional and the final
frame settles before the export ends.

## Campaign Setup And Source Preservation

Create the standard campaign structure from
[ASSET_MANAGEMENT.md](ASSET_MANAGEMENT.md). Place an approved screenshot under
`source/images/` or recording under `source/recordings/`.

Verify a supplied source before production:

```bash
shasum -a 256 "/path/to/original.png" campaigns/<campaign-id>/source/images/<source-name>.png
sips -g pixelWidth -g pixelHeight campaigns/<campaign-id>/source/images/<source-name>.png
```

Matching checksums confirm that the managed source is unchanged. Do not edit a
file under `source/`; create any derivative under `working/`.

Complete:

1. `brief/feature-campaign-brief.md`
2. `brief/storyboard.md` using
   [templates/STORYBOARD_SHORT_BUMPER.md](templates/STORYBOARD_SHORT_BUMPER.md)
3. `brief/caption-copy-sheet.md`
4. `brief/final-creative-review.md`

## Remotion Implementation Pattern

- Add a typed campaign configuration under `src/campaigns/`.
- Add one focused Remotion composition under `src/`.
- Register the composition additively in `src/root.tsx`.
- Add a campaign-contract test under `tests/` before production code and
  observe the expected failure.
- Add campaign-specific still and render commands without changing existing
  campaign scripts.
- Drive every animation from frames with explicit, clamped easing.
- Use `<Img>` and `staticFile()` for managed screenshots.

The contract test should lock at least:

- Composition ID, dimensions, fps, and duration
- Exact source path and approved visible URL or copy
- Audio and ending policy
- Timing landmarks and restrained camera limits
- A non-blank intentional opening frame

## Review Stills And Rendering

Render frame zero and every important story landmark before the full video:

```bash
npm run render:<campaign>:stills
```

Inspect:

- Opening frame
- Hook or typing state
- Feature-proof reveal
- Camera move
- Final hold

Then render the review video:

```bash
npm run render:<campaign>:review
```

For approved silent output, include `--muted` in the render command. This
produces a video-only file with no audio track.

Remotion launches headless Chromium. In restricted environments, a render may
fail with a browser-launch or macOS Mach port permission error. Rerun the same
render command with the required sandbox escalation; do not change the creative
implementation to work around an environment permission failure.

For the canonical completed example, the current repository commands are:

```bash
npm run render:homepage-browser-load:stills
npm run render:homepage-browser-load:review
npm run render:homepage-browser-load:approved
```

The registered example composition is `HomepageBrowserLoadBumper`. New
campaigns should add their own composition and campaign-specific commands
instead of overwriting these. The `:approved` command creates a separate render
and therefore requires review as a separate final file. To promote the exact
reviewed bytes, use the copy-and-checksum workflow below instead.

## Technical Validation

Run the full repository checks:

```bash
npm test
npx tsc --noEmit
git diff --check
```

When `ffprobe` is unavailable, validate an MP4 with the installed `mediabunny`
package:

```bash
node --input-type=module -e "import {Input,ALL_FORMATS,FilePathSource} from 'mediabunny'; const path='campaigns/<campaign-id>/working/renders/<review-file>.mp4'; const input=new Input({source:new FilePathSource(path),formats:ALL_FORMATS}); const video=await input.getPrimaryVideoTrack(); const audio=await input.getAudioTracks(); console.log(JSON.stringify({canRead:await input.canRead(),duration:await input.computeDuration(),videoCodec:video?.codec,width:video?await video.getDisplayWidth():null,height:video?await video.getDisplayHeight():null,audioTrackCount:audio.length},null,2)); input.dispose();"
```

Confirm the output matches the brief. For silent campaigns,
`audioTrackCount` must be `0`.

After the reviewed render passes, copy it unchanged to `exports/approved/` and
verify byte identity:

```bash
cp campaigns/<campaign-id>/working/renders/<review-file>.mp4 campaigns/<campaign-id>/exports/approved/<approved-file>.mp4
shasum -a 256 campaigns/<campaign-id>/working/renders/<review-file>.mp4 campaigns/<campaign-id>/exports/approved/<approved-file>.mp4
```

Record the validation evidence and every approved exception in the final
creative review.

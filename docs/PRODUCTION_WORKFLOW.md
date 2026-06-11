# Production Workflow

Follow this workflow for every Dein-Dein feature-promotion video. Each phase
ends with an approval gate. Do not silently carry unresolved facts, rights, or
creative decisions into the next phase.

## Select A Production Lane

Use the default feature-reel lane unless the campaign brief explicitly approves
the accelerated short-bumper lane.

- **Default feature reel:** Approximately `20` seconds, vertical-first, real
  screen recording, explanatory story, and a stable branded CTA frame.
- **Approved short bumper:** `3-6` seconds, landscape or vertical, one factual
  source screenshot or short recording, and the workflow in
  [SHORT_BUMPER_RUNBOOK.md](SHORT_BUMPER_RUNBOOK.md).

Shortened duration, screenshot-led proof, silent output, non-default format,
and a product-only ending are permitted only as documented creative exceptions.
Both lanes retain every approval gate below.

## 1. Intake and Brief

Create a campaign folder following [ASSET_MANAGEMENT.md](ASSET_MANAGEMENT.md)
and complete
[templates/FEATURE_CAMPAIGN_BRIEF.md](templates/FEATURE_CAMPAIGN_BRIEF.md).

Confirm:

- One feature and one primary audience benefit
- The target audience and publishing destination
- The approved headline, factual claims, URL, and primary CTA
- The trusted source for every factual detail
- Rights status for recordings, imagery, music, sound effects, fonts, and logos
- Required disclaimers or provider-confirmation language
- The selected production lane and every approved exception

**Approval gate:** The brief is complete, factual, rights-safe, and has either
one approved primary CTA or an explicitly approved product-only ending.

## 2. Source Intake

For a default feature reel, capture or validate the recording against
[SCREEN_RECORDING_GUIDE.md](SCREEN_RECORDING_GUIDE.md). For an approved short
bumper, validate the supplied screenshot or recording against
[SHORT_BUMPER_RUNBOOK.md](SHORT_BUMPER_RUNBOOK.md).

Copy the original file into the appropriate campaign `source/` directory. Do
not trim, transcode, recolor, rename destructively, or overwrite an original.
Verify supplied screenshots with a checksum and record any privacy edits or
exclusions in the campaign brief.

**Approval gate:** The source clearly proves the approved idea, contains no
private or unsafe information, remains unchanged, and is suitable for the target
format.

## 3. Storyboard

Complete
[templates/STORYBOARD_20_SECOND_REEL.md](templates/STORYBOARD_20_SECOND_REEL.md)
or
[templates/STORYBOARD_SHORT_BUMPER.md](templates/STORYBOARD_SHORT_BUMPER.md).
Build the story around:

1. A readable hook in the first two seconds
2. Enough context to understand the user's goal
3. Real feature proof
4. A concise benefit
5. A stable final frame with one CTA and `dein-dein.com`

For an approved short bumper, resolve on one strong factual proof moment. A
product-only ending is allowed only when documented in the brief.

Every proposed crop, zoom, caption, and transition must have a communication
purpose.

**Approval gate:** The storyboard can be understood without audio, fits the
duration, and does not invent or distort product behavior.

## 4. Copy Lock

Complete [templates/CAPTION_COPY_SHEET.md](templates/CAPTION_COPY_SHEET.md).
Check every visible and spoken statement against the approved brief and source
material.

Keep copy short enough to read comfortably on a phone. Remove redundant
captions and decorative text that competes with the product.

**Approval gate:** All copy, spelling, capitalization, facts, and CTA wording
are approved.

## 5. Rough Cut

Build the visual story with temporary or approved audio:

- Establish the target canvas and safe areas
- Place product footage in story order
- Crop and magnify relevant UI regions
- Add captions and restrained brand framing
- Use simple cuts and transitions before adding polish
- Hold the closing frame for at least `1.5 seconds`
- For a short bumper, ensure frame zero is intentional and the final camera move
  settles before the last frame

Review every rough cut muted. Review with audio when the campaign includes
audio.

**Approval gate:** The feature and benefit are clear, the pacing is readable,
and the product sequence is truthful.

## 6. Motion, Brand, and Audio Polish

Apply [../VIDEO_STYLE.md](../VIDEO_STYLE.md):

- Use premium navy surfaces, focused gold, and restrained plum
- Add only purposeful motion and focus effects
- Use the official logo intact
- Add rights-cleared music and restrained sound effects
- For approved silent campaigns, render video-only output with `--muted`
- Preserve readable contrast and caption safe areas

Do not use effects to hide weak product proof or incomplete source footage.

**Approval gate:** The treatment feels recognizably Dein-Dein and improves
comprehension without distracting from the feature.

## 7. Final Review and Export

Run [QUALITY_CHECKLIST.md](QUALITY_CHECKLIST.md) and complete
[templates/FINAL_CREATIVE_REVIEW.md](templates/FINAL_CREATIVE_REVIEW.md).

Review:

- The full video with audio when applicable
- The full video muted
- Frame zero, the opening hook, feature proof, and the final hold as still
  images
- Every factual screen at full resolution
- The export on the intended target display
- Technical duration, dimensions, codec, and audio-track count
- Byte identity between the reviewed render and approved export when the review
  file is promoted unchanged

Store approved exports according to [ASSET_MANAGEMENT.md](ASSET_MANAGEMENT.md).

**Approval gate:** All checklist items pass, or each exception is explicitly
documented and approved.

## Current Remotion Production

The repository uses Remotion for deterministic production. Keep campaign facts,
timing, source paths, audio policy, and ending policy in a typed campaign
configuration. Register compositions additively, write campaign-contract tests
before implementation, render key stills before the review video, and keep
draft renders separate from approved exports.

Remotion implements the approved workflow; it does not replace its approval
gates.

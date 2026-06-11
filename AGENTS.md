# Dein-Dein Promo Video Agent Guide

This repository is the source of truth for consistent Dein-Dein feature-promotion
videos. Act as a creative director first and a video implementer second.

## Required Reading

Before planning or producing an asset, read:

1. [MARKETING_BRAND_GUIDE.md](MARKETING_BRAND_GUIDE.md)
2. [VIDEO_STYLE.md](VIDEO_STYLE.md)
3. [docs/PRODUCTION_WORKFLOW.md](docs/PRODUCTION_WORKFLOW.md)
4. [docs/SCREEN_RECORDING_GUIDE.md](docs/SCREEN_RECORDING_GUIDE.md)
5. [docs/ASSET_MANAGEMENT.md](docs/ASSET_MANAGEMENT.md)
6. [docs/QUALITY_CHECKLIST.md](docs/QUALITY_CHECKLIST.md)
7. [docs/SHORT_BUMPER_RUNBOOK.md](docs/SHORT_BUMPER_RUNBOOK.md) when the
   requested asset is a `3-6` second bumper

The marketing brand guide wins if another document conflicts with it.

## Creative Director Mandate

- Promote one feature and one primary audience benefit per reel.
- Make the real product behavior the proof. Do not fabricate UI, states, data,
  availability, showtimes, links, or capabilities.
- Preserve the canonical visible brand name `Dein-Dein`. Use `dein-dein.com`
  for the URL.
- Keep the work useful, welcoming, energetic, trustworthy, premium, and
  approachable.
- Prefer clear product storytelling over effects. Motion must direct attention
  or improve comprehension.
- Treat accessibility, privacy, factual accuracy, and media rights as approval
  requirements, not optional polish.

## Default Deliverable

Unless a campaign brief explicitly says otherwise:

- Format: vertical reel, `1080x1920`, `9:16`
- Duration: approximately `20 seconds`
- Subject: one Dein-Dein feature
- Source: real, high-resolution screen recording
- Audio: rights-cleared music with restrained interaction sound effects
- Copy: burned-in captions that communicate the full story when muted
- Visual treatment: premium navy, focused gold, restrained plum
- Closing frame: official logo, one approved CTA, and `dein-dein.com`, held
  stable for at least `1.5 seconds`

## Production Lanes

Select one lane before creating campaign files:

### Default Feature Reel

Use the default deliverable above for feature demonstrations that need context,
multiple proof moments, explanatory captions, or a dedicated CTA frame.

### Approved Short Bumper

Use [docs/SHORT_BUMPER_RUNBOOK.md](docs/SHORT_BUMPER_RUNBOOK.md) only when the
campaign brief explicitly approves a `3-6` second landscape or vertical bumper.
A short bumper may use an approved screenshot as factual product proof, silent
video-only output, or a product-only ending, but each departure from the default
reel contract must be recorded as a creative exception.

The short-bumper lane reduces repeated setup and review work. It never bypasses
brief approval, factual accuracy, source preservation, privacy, rights, or final
creative review.

## Mandatory Workflow

1. Create a campaign brief from
   [docs/templates/FEATURE_CAMPAIGN_BRIEF.md](docs/templates/FEATURE_CAMPAIGN_BRIEF.md).
2. Validate the recording and all supplied assets before editing.
3. Create a timed storyboard from
   [docs/templates/STORYBOARD_20_SECOND_REEL.md](docs/templates/STORYBOARD_20_SECOND_REEL.md)
   or
   [docs/templates/STORYBOARD_SHORT_BUMPER.md](docs/templates/STORYBOARD_SHORT_BUMPER.md).
4. Lock on-screen copy with
   [docs/templates/CAPTION_COPY_SHEET.md](docs/templates/CAPTION_COPY_SHEET.md).
5. Produce the edit without altering factual product behavior.
6. Review the result against
   [docs/QUALITY_CHECKLIST.md](docs/QUALITY_CHECKLIST.md).
7. Record the decision and any exceptions in
   [docs/templates/FINAL_CREATIVE_REVIEW.md](docs/templates/FINAL_CREATIVE_REVIEW.md).

Do not begin production with unresolved facts, missing usage rights, or an
unapproved ending policy. The ending policy must name either one approved
primary CTA or an explicitly approved product-only ending.

When a plan is approved and the factual source asset is available, proceed
directly through implementation and verification. Do not reopen settled creative
choices unless the source or render reveals a conflict.

## Approval Gates

### Gate 1: Brief Approval

Confirm the audience, objective, feature, proof, approved copy, source URL,
primary CTA, and rights status.

### Gate 2: Storyboard Approval

Confirm that the first two seconds provide a readable hook, the middle shows
real feature proof, and the ending contains one clear next step.

### Gate 3: Copy and Accuracy Approval

Check every visible and spoken statement against a trusted source. Unknown
details must be omitted or explicitly marked pending.

### Gate 4: Final Creative Approval

Approve only after brand, motion, legibility, privacy, rights, audio, factual
accuracy, and export checks pass.

## Hard Guardrails

- Never redraw, recolor, crop, regenerate, or animate the internal parts of the
  official logo.
- Never use the legacy name `Event Dein`.
- Never invent testimonials, ratings, prices, urgency, popularity, or
  availability.
- Never show personal data, secrets, admin controls, browser bookmarks,
  notifications, private tabs, or unrelated applications.
- Never use third-party music, footage, movie artwork, photographs, logos, or
  fonts without confirmed rights.
- Never use rapid flashing, unreadable kinetic type, constant zooming, or
  effects that compete with the feature.
- Never use `Book Now` unless Dein-Dein directly sells the promoted tickets and
  the exact wording is explicitly approved in the campaign brief.

## Approved CTA Defaults

Choose one:

- `Discover on Dein-Dein`
- `Find showtimes`
- `Explore events`
- `View event details`
- `Visit dein-dein.com`

Other CTAs must be approved in the campaign brief and comply with the marketing
brand guide.

## Current Remotion Production Contract

This repository contains an active Remotion production system. For every new
composition:

- Keep campaign-specific facts, timing, paths, and copy in a typed campaign
  configuration separate from the composition.
- Register new compositions additively in `src/root.tsx`; do not alter existing
  campaign behavior unless requested.
- Use deterministic frame-based animation only.
- Preserve supplied recordings and screenshots unchanged under the campaign's
  `source/` directory; generated files belong under `working/` or
  `exports/approved/`.
- Write campaign-contract tests before implementation and observe the expected
  failure before adding the production module.
- Render and inspect frame zero plus key story moments before rendering the full
  review video.
- Use `--muted` for approved silent output so the final file contains no audio
  track, not merely silent audio samples.
- Validate the final duration, dimensions, codec, and audio-track count. Use the
  installed `mediabunny` package when `ffprobe` is unavailable.
- Promote a reviewed render to `exports/approved/` only after review; when the
  reviewed file is copied unchanged, verify both files are byte-identical.

Use
`campaigns/2026-06-11-homepage-browser-load/` as the canonical short-bumper
reference. Its exact URL-typing treatment is an example, not a mandatory
creative pattern.

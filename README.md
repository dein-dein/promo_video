# Dein-Dein Promo Video Studio

This repository defines how to create consistent promotional videos for
[dein-dein.com](https://dein-dein.com). It is the shared operating system for
creative direction, screen-recording intake, storytelling, brand consistency,
and final approval.

The default deliverable is a `20-second`, `1080x1920` vertical reel promoting
one real Dein-Dein feature through real product footage, rights-cleared music,
and burned-in captions.

The repository also supports explicitly approved `3-6` second landscape or
vertical bumpers. These use the accelerated workflow in
[docs/SHORT_BUMPER_RUNBOOK.md](docs/SHORT_BUMPER_RUNBOOK.md) while preserving
the same factual, privacy, rights, and review requirements.

## Start Here

1. Read [AGENTS.md](AGENTS.md) for the creative-director operating rules.
2. Read [MARKETING_BRAND_GUIDE.md](MARKETING_BRAND_GUIDE.md) for brand, copy,
   rights, and accuracy rules.
3. Read [VIDEO_STYLE.md](VIDEO_STYLE.md) for the canonical motion system.
4. Capture the feature using
   [docs/SCREEN_RECORDING_GUIDE.md](docs/SCREEN_RECORDING_GUIDE.md).
5. Complete the templates in [docs/templates](docs/templates).
6. Follow [docs/PRODUCTION_WORKFLOW.md](docs/PRODUCTION_WORKFLOW.md).
7. Approve the final result with
   [docs/QUALITY_CHECKLIST.md](docs/QUALITY_CHECKLIST.md).

For an approved short bumper, start with
[docs/SHORT_BUMPER_RUNBOOK.md](docs/SHORT_BUMPER_RUNBOOK.md) and
[docs/templates/STORYBOARD_SHORT_BUMPER.md](docs/templates/STORYBOARD_SHORT_BUMPER.md).

## Submitting a Feature Recording

Create a campaign folder using the convention in
[docs/ASSET_MANAGEMENT.md](docs/ASSET_MANAGEMENT.md), then provide:

- An untouched, high-resolution screen recording
- A completed feature campaign brief
- The exact user benefit and approved primary CTA
- Any approved source imagery, music, sound effects, or partner logos
- Usage-rights confirmation for every third-party asset

Record slowly and deliberately. Leave roughly two seconds before and after each
important interaction. The source recording can be much longer than the final
reel; pacing is created during editing.

## Creative Baseline

- Premium deep navy surfaces
- Focused gold details
- Restrained plum atmosphere
- Readable, concise captions
- Smooth crops, reveals, slides, and purposeful zooms
- One idea per scene
- One primary CTA
- Stable closing brand frame for at least `1.5 seconds`

The edit may feel modern and energetic, but it must not rely on excessive neon,
constant zooming, fake UI, or unreadable kinetic typography.

## Repository Map

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Creative-director instructions and approval gates |
| `MARKETING_BRAND_GUIDE.md` | Canonical brand, messaging, rights, and safety rules |
| `VIDEO_STYLE.md` | Canonical visual and motion language for video |
| `docs/PRODUCTION_WORKFLOW.md` | End-to-end production process |
| `docs/SCREEN_RECORDING_GUIDE.md` | Recording and privacy requirements |
| `docs/ASSET_MANAGEMENT.md` | Campaign folder and source-preservation rules |
| `docs/QUALITY_CHECKLIST.md` | Final review and release criteria |
| `docs/SHORT_BUMPER_RUNBOOK.md` | Accelerated `3-6` second bumper production |
| `docs/templates/` | Reusable brief, storyboard, copy, and review forms |
| `src/` | Remotion compositions and campaign configurations |
| `tests/` | Campaign-contract tests |
| `campaigns/` | Immutable sources, working files, review renders, and approved exports |

## Current Production System

The repository contains an active Remotion production system with additive
compositions, campaign-specific configurations, contract tests, review-still
scripts, and campaign-managed exports.

The default feature-reel workflow remains the baseline. The canonical
short-bumper example is
`campaigns/2026-06-11-homepage-browser-load/`; reuse its production pattern
without assuming every bumper needs URL typing, a browser frame, or the same
camera path.

## Reusable Movie Showtime Poster

Generate the fixed `1080x1350` Dark Focus social poster with structured inputs:

```bash
npm run poster:movie -- --category "Mollywood" --region "Germany"
npm run poster:movie -- --category "Mollywood" --region "Germany" --movie-title "Selected Movie"
```

The optional movie title switches from the category-only mode to the
selected-movie mode. The command validates required fields and title length,
then writes a deterministically named review PNG under
`campaigns/movie-showtime-social-poster/working/renders/`.

The generator always uses the intact official logo, fixed `Find showtimes`
CTA, `dein-dein.com`, and the approved movie-showtime disclaimer. It does not
use movie artwork or automatically promote review renders to
`exports/approved/`.

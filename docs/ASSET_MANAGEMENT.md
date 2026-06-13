# Asset Management

Every campaign must be reproducible and auditable. Preserve original sources,
separate working files from approved exports, and record the rights status of
every external asset.

## Campaign Folder Convention

Use a lowercase, date-prefixed campaign ID:

```text
campaigns/YYYY-MM-DD-feature-name/
```

Use this structure:

```text
campaigns/YYYY-MM-DD-feature-name/
  brief/
    feature-campaign-brief.md
    storyboard.md
    caption-copy-sheet.md
    final-creative-review.md
  source/
    recordings/
    images/
    audio/
    partner-assets/
  working/
    processed-clips/
    stills/
    audio/
    renders/
  exports/
    approved/
```

Create only the directories needed by the campaign. Do not place unapproved
drafts in `exports/approved/`.

## Source Preservation

- Treat everything under `source/` as immutable.
- Never overwrite, trim, transcode, crop, recolor, color-correct, or rename an
  original source destructively.
- Create processed versions under `working/`.
- Keep the original filename when practical; add a descriptive suffix to
  derivatives.
- Record the capture date, origin, rights owner, and approval status in the
  campaign brief.

If an original must be replaced, retain the prior file and document why the new
source supersedes it.

### Supplied Screenshots

An approved screenshot may be the factual source for an explicitly approved
short bumper. Store it unchanged under `source/images/` and verify its checksum
against the supplied original before production. Do not modify screenshot
content to improve the story; camera movement may reframe the unchanged source.

## Naming Conventions

Use lowercase kebab-case without spaces:

```text
homepage-search-complete-flow-01.mov
homepage-search-detail-crop-v02.mov
homepage-search-hook-frame-v03.png
homepage-search-vertical-review-v04.mp4
homepage-search-vertical-approved-v01.mp4
```

Use sequential version numbers. Do not use ambiguous names such as
`final-final-2.mp4`.

## Rights and Provenance

For each third-party asset, document:

- Filename and source
- Rights owner
- License or permission
- Permitted platforms and usage
- Expiration or campaign limitations
- Required attribution
- Approval status

Do not include an asset in a review render if its usage rights are unknown.

## Approved Brand Assets

- Use `dein-new-logo.png` as the official logo in this repository.
- Preserve its aspect ratio, transparent background, internal geometry, and
  subtle outer shadow.
- Keep `assets/archive/dein-new-logo-opaque-original.png` only as the
  byte-identical provenance source; do not use it in new work.
- Do not create derived, recolored, cropped, or AI-generated logo variants.
- Follow [../MARKETING_BRAND_GUIDE.md](../MARKETING_BRAND_GUIDE.md) for all logo,
  color, typography, and naming rules.

## Export Naming

Approved exports must identify the campaign, format, and version:

```text
<campaign-id>-vertical-1080x1920-approved-v01.mp4
```

When another format is approved, replace `vertical-1080x1920` with the actual
format and resolution.

When a reviewed render is promoted unchanged to `exports/approved/`, verify that
the review and approved files have matching checksums. If the approved export is
rendered or encoded separately, review it as a separate final file.

## Remotion Paths

- Keep reusable production assets at repository-managed paths available through
  the configured Remotion public directory.
- Keep campaign source recordings outside reusable component directories.
- Keep campaign data separate from reusable scene code.
- Keep rendered previews and approved exports outside source-code directories.
- Do not duplicate the official logo or create inconsistent brand-token files.

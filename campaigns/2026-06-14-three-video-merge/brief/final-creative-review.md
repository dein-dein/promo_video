# Final Creative Review

## Export

| Field | Value |
| --- | --- |
| Campaign ID | `2026-06-14-three-video-merge` |
| Approved exports | `2026-06-14-three-video-merge-landscape-1920x1080-approved-v01.mp4`; `2026-06-14-three-video-merge-vertical-1080x1920-approved-v01.mp4` |
| Resolution | `1920x1080` and `1080x1920` |
| Duration | `32.0 seconds` |
| Frame rate | `30 fps` |
| Audio | Silent; zero audio tracks required |

## Required Evidence

- [x] Source checksums match the typed campaign contract.
- [x] Frame zero, segment boundaries, portrait proof moments, and final hold pass inspection.
- [x] Both full exports pass muted review.
- [x] Showtime cuts directly at frame `630`, before the removed closing scene.
- [x] Both outputs are H.264, exactly `32.0s`, correctly sized, and contain zero audio tracks.
- [x] Review and approved exports are byte-identical.

Landscape review and approved checksum:
`6990a36d9bd5bfaf3a416435a7578359f950b975e7eb2268c340b98a341ba93c`

Vertical review and approved checksum:
`0aa88c3d2e6e153efa13f8c80f9b3bb97106186fe625b79b02897abf274a99da`

## Final Decision

- [x] Approved for publishing
- [ ] Revisions required

Approved after still-frame inspection, muted review, source/version verification,
technical validation, and byte-identity verification.

## V02 Continuity Revision

Approved revised exports:
`2026-06-14-three-video-merge-landscape-1920x1080-approved-v02.mp4`;
`2026-06-14-three-video-merge-vertical-1080x1920-approved-v02.mp4`.

- [x] Frames `119`, `120`, `150`, `156`, `224`, `225`, `240`, and `264` pass
  continuity inspection in both formats.
- [x] No blank frame, screenshot flash, duplicate zoom reset, landscape framing
  jump, or vertical hard cut is present.
- [x] The page scroll is visibly underway at frame `240` (`8.0s`).
- [x] Later showtime scenes, the frame `780` direct cut to the motto bumper, and
  the final hold remain unchanged.
- [x] Both outputs are H.264, exactly `32.0s` / `960` frames at `30 fps`,
  correctly sized, and contain zero audio tracks.
- [x] Review and approved v02 exports are byte-identical.

Landscape v02 review and approved checksum:
`cd868e526df02dc31a2a6f7fc142a463042234fd779da8550b52e477327d5529`

Vertical v02 review and approved checksum:
`793747fb0e621ada80ba2a66f8e0bd9d329b8924c66041c1093c3d4233c75b67`

V01 exports remain preserved.

## Vertical V03 Landscape Conversion

Approved export:
`2026-06-14-three-video-merge-vertical-1080x1920-approved-v03.mp4`.

- [x] Sourced directly from the checksum-locked approved landscape v02.
- [x] Frames `0`, `240`, `780`, and `930` pass uncropped vertical inspection.
- [x] The complete landscape frame remains visible inside the navy vertical
  canvas without altering timing, transitions, copy, or product behavior.
- [x] Output is H.264, `1080x1920`, exactly `32.0s` / `960` frames at `30 fps`,
  and contains zero audio tracks.
- [x] Review and approved v03 exports are byte-identical.

Vertical v03 review and approved checksum:
`d1b6e3f503e2452f22c7ec22ffec186bb9ddcdad2a623f9fb47959b75b5af1d7`

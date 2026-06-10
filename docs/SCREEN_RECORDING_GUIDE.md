# Screen Recording Guide

The screen recording is the factual source for a feature-promotion video.
Capture a clean, deliberate demonstration; pacing and emphasis will be created
during editing.

## Before Recording

- Use a test or public-safe account with no personal information.
- Close unrelated applications, private tabs, messages, downloads, and
  notifications.
- Hide bookmarks, password managers, developer tools, admin controls, API keys,
  tokens, email addresses, account identifiers, and payment information.
- Confirm every visible event, movie, city, time, venue, language, and link is
  accurate and approved for promotion.
- Confirm usage rights for all images and third-party content visible in the
  recording.
- Set the browser zoom and operating-system scaling so UI text is crisp.
- Disable cursor highlights or click effects unless they are intentionally part
  of the approved visual style.

If private information appears in a take, reject the take and record it again.
Do not rely on a later blur for secrets or sensitive personal data.

## Capture Specifications

- Record at the highest practical resolution.
- Prefer `1080x1920` vertical when the feature works naturally in a narrow
  viewport.
- For desktop features, capture at `1920x1080` or higher so important areas can
  be reframed into the vertical reel.
- Use a stable frame rate of at least `30 fps`.
- Avoid lossy re-encoding before submitting the source.
- Record system audio only when it is required and rights-safe.

Do not stretch desktop footage to fill a vertical canvas. The editor will use
clean crops, pans, and magnification.

## Performance Direction

- Begin with roughly two seconds of stillness before the first interaction.
- Move the pointer deliberately and directly.
- Pause before and after each important click, selection, reveal, or result.
- Scroll slowly enough for the interface to remain readable.
- Let loading, empty, error, and success states settle when they matter to the
  feature story.
- End with roughly two seconds of stillness.
- Record alternate takes for complex or unreliable interactions.

A `60-120` second source recording is reasonable for a `20` second finished
reel.

## Recommended Takes

Capture separate takes when possible:

1. **Clean complete flow:** the feature from starting context to useful result.
2. **Detail take:** a slower version of the most important interaction.
3. **Result take:** a stable view of the final benefit or destination.
4. **Fallback take:** a clean alternate in case the preferred take contains an
   error, notification, or unusable cursor movement.

## Recording Intake Checklist

- [ ] The recording demonstrates one clearly named feature.
- [ ] The feature behavior and visible facts are current and accurate.
- [ ] No personal data, secrets, private tabs, notifications, or admin controls
      are visible.
- [ ] The recording is high-resolution and visually crisp.
- [ ] Important interactions have pauses before and after them.
- [ ] Scrolling and pointer movement are controlled.
- [ ] Source audio, if present, is approved and rights-safe.
- [ ] Usage rights for third-party content visible in the recording are
      confirmed.
- [ ] The original file has been preserved unchanged.

## Submission

Place untouched recordings in:

```text
campaigns/<campaign-id>/source/recordings/
```

Document the recording filename, capture date, feature version, viewport, known
issues, and approved exclusions in the campaign brief.

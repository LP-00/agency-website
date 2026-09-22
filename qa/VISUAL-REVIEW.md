# Visual QA — /A, v1.0.0

Reference: `design/reference-mobile.png`, inspected before implementation. It is a board of separate mobile screens; the implementation is a continuous page, so the screen frames themselves are intentionally not copied.

## Pass 1 — first browser capture at 390 × 844

Files: `qa/pass-1/`.

Ten most important observed differences / issues:

1. **Atmospheric image visibility:** the desk appeared too low and too dark; reduced the mobile image container height, repositioned the crop and adjusted exposure through the overlay.
2. **Header proportions:** 72 px was too tall for the requested small mobile navigation; reduced to 64 px.
3. **Headline tracking:** the first H1 was too compressed; relaxed letter spacing and increased leading to 1.04.
4. **Body measure:** the hero paragraph stretched too wide; limited its measure to 305 px for a three-line editorial block.
5. **Selector density:** increased the main option rows from 74 to 78 px while retaining the compact single row for “Altro”.
6. **Section-title spacing:** relaxed headline tracking to preserve clear word separation at 34–36 px.
7. **Project tag size:** increased from 10 to 11 px, keeping the fine outlined treatment.
8. **Services hierarchy:** the longest service title did not wrap intentionally; constrained its measure and refined mobile title size.
9. **Visual noise in captures:** development badges and a fixed skip-link artifact appeared in section screenshots. Disabled the dev indicator, made the skip link hidden until focused, and used production output for the final captures.
10. **Actual portfolio photography:** placeholders cannot recreate the reference’s photographic information density. Kept the explicitly requested asset slots, labeled as such; never replaced them with invented client screenshots. This remains the principal visual limit until actual assets are provided.

## Pass 2 — second mobile comparison

Files: `qa/pass-2/`.

Checked hero material visibility, headline rhythm, the image/text/image project sequence, services row spacing, dark-on-dark pricing and footer contrast. The photographic crop now reads as a physical workspace. The following refinements were carried into pass 3 / final:

- Real responsive image variants and `srcset`, generated locally, including explicit image geometry and lazy loading below the fold.
- Darker placeholder captions after the contrast audit found ratios below 4.5:1.
- Correct dark caption surface for the second Florame focus visual.
- Decorative pricing arrows rendered with hidden SVG rather than text that leaked into accessible button names.
- Script waits for image decoding so lazy images are present in the visual evidence.

## Pass 3 — mobile, tablet and desktop comparison

Files: `qa/pass-3/`, followed by corrected production captures in `qa/final/`.

- The desktop hero was too tall (986 px at 1440). Reduced its top padding, headline to 88 px, paragraph reserve and conversion gap. Final height: 867 px, with the CTA and microcopy visible at 1440 × 900.
- At 1280 the final hero is 833 px, with the primary CTA visible within the 800 px viewport.
- Added a specific tablet composition: three-column intent controls, paired project text/secondary visuals, two-column benefits and payments.
- Preserved the base mobile design at 375, 390 and 430 px.
- Adjusted the booking H1 independently so its supplied line structure remains intact at every required width.
- Final photographic `sizes` describes the actual cover crop, preventing the browser from choosing an undersized image on a narrow screen.

## Verified result

Production build, TypeScript and lint succeeded. Five Playwright tests pass, covering all intents and widths, disabled storage, complete quote flow and validation, back navigation, focus cycling, Escape/focus restoration, FAQ, service disclosures, menu, carousel and pricing entry points. The axe WCAG 2 A/AA and 2.1 AA audit reports no violations on the landing or the three quote steps.

Final measured viewport widths: **375, 390, 430, 768, 1280, 1440 px**. No horizontal overflow and no browser runtime errors. Every intent retains the intended three H1 lines. See `qa/final/measurements.json` for exact section dimensions.

The final screenshot set uses the production export, not the development server. Images are loaded before capture; reduced motion is enabled for repeatability. `390-full.png` and `1440-full.png` show the complete page. `contact-sheet-mobile.webp` presents all sections and the funnel together; panels are scaled to fit, so use individual screenshots for pixel-level inspection.

## Limits, deliberately documented

- This is not a pixel-identical copy: the supplied reference is a board with different example content and photography. The implementation follows its art direction with the requested content and typography ranges.
- Four requested project assets are explicitly marked placeholders; service thumbnails are monochrome SVG symbols pending real imagery.
- The atmospheric workspace is generated imagery, not a photograph of the real agency.
- The quote funnel is a frontend demo until an endpoint is configured. The success screen explicitly says no request was sent.
- Browser testing was performed in Chromium, including the six requested viewport sizes. This is not a claim of physical-device testing or a full manual accessibility certification.

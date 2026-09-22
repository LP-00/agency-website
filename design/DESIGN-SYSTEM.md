# /A — design direction, v1.0.0

## Source of truth

`design/reference-mobile.png` is a 12-panel mobile design board, not a single continuous page. The first ten panels define the landing; the last two define the quote and success screens. The outer rounded phone outlines and black board gutters are presentation chrome, not page components.

## Extracted principles

- Predominantly cream and almost-black surfaces. No dominant accent.
- Modern grotesk with modest weight, tight headline tracking and generous body leading.
- Very small, spaced uppercase section labels. Primary typography carries the hierarchy.
- Dark photographic opening and closing. Visible material, natural shadow, no decorative digital effects.
- Project image → text → secondary image, never an all-in-one portfolio card.
- Thin rules, quiet pills for tags, restrained radii for imagery and controls.
- Services as compact horizontal rows; pricing as the sole repeated card section.
- Vertical timelines with fine strokes and small markers.
- FAQ as divider-separated disclosures, initially closed.
- Quote flow as an uncluttered, full-screen mobile experience.

## Implementation choices

Manrope variable is self-hosted and preloaded once. Mobile base is 390 px, 20 px side gutters, 52 px H1, 36 px section headings, 16–17 px body, 96 px section spacing. Desktop moves to an editorial two-column grid, 48 px gutters, maximum content width 1280 px, 58–64 px section headings and 72–96 px H1.

The headline is exactly “Siti web / che lavorano / per te.” on initial load and `site`. Other headlines and supporting copy are proposed intent-specific variants, declared in `data/intents.ts`, not silent substitutions of the default copy.

Project placeholders are deliberate and labeled. The service thumbnail slots use monochrome interface symbols until genuine photographic or project assets are supplied. No invented client logos, metrics, testimonials or screenshots.

## Original atmospheric image

Built-in imagegen output, used for hero and final CTA; it is not a photograph of the actual agency or a client project. Saved as `public/images/workspace.webp`, from an original 1536 × 1024 generation. Prompt:

> Use case: photorealistic-natural. Create one standalone editorial photograph for a premium Italian digital design studio website hero and footer, landscape 1536x1024. A very quiet architect's workspace: pale warm grey textured stone desk, partially open black unbranded laptop with blank dark screen at left, dark anodized metal phone face down in the lower right, brushed metal desk lamp, warm charcoal walls, a simple chair partially visible to the right. Tight slightly elevated oblique crop with physical material detail, lots of empty dark wall space in upper left for website text. Side window light grazes the stone and aluminum surfaces, deep natural shadows, restrained desaturated warm grey and black palette, subtly tactile photographic grain, real imperfect surface texture. Mood understated, intimate, professional architecture magazine still life. High quality optical photography, no CGI appearance. No text, no logos, no interface, no charts, no mockups, no flowers, no extra objects, no people, no colorful lights, no neon. This is atmospheric imagery only and must not depict a fictional client project.

Replace this image with agency-owned photography when available. The portfolio assets are independent and must be real.

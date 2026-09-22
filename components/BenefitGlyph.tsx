import type { IconName } from "./Icon";
export function BenefitGlyph({ name }: { name: IconName }) {
  return (
    <svg
      className="benefit-glyph"
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g className="glyph-registration" opacity=".26">
        <path d="M5 16V5h11m32 0h11v11M5 48v11h11m32 0h11V48" />
      </g>
      {name === "key" && (
        <>
          <circle className="glyph-draw" cx="23" cy="24" r="12" />
          <circle cx="23" cy="24" r="4" opacity=".4" />
          <path
            className="glyph-draw"
            d="m32 33 20 20 4-4-5-5 4-4-7-7-4 4-6-6"
          />
          <path d="M15 24a8 8 0 0 1 8-8" opacity=".4" />
        </>
      )}
      {name === "file" && (
        <>
          <path
            className="glyph-draw"
            d="M17 10h23l10 10v32H17V10Zm23 0v11h10M24 29h19m-19 7h13"
          />
          <path d="M12 17v40h32" opacity=".4" />
          <path className="glyph-draw" d="m30 45 5 5 10-11" />
        </>
      )}
      {name === "tag" && (
        <>
          <path
            className="glyph-draw"
            d="m13 12 25 1 18 19-24 23-20-20 1-23Z"
          />
          <circle cx="24" cy="24" r="4" />
          <path d="m17 38 16 16m1-31 13 13" opacity=".4" />
          <path className="glyph-draw" d="m28 36 5 5 10-10" />
        </>
      )}
      {name === "revision" && (
        <>
          <path
            className="glyph-draw"
            d="M49 21A21 21 0 0 0 12 32m3 12a21 21 0 0 0 37-12M49 10v12H37M15 54V42h12"
          />
          <circle cx="32" cy="32" r="14" opacity=".25" />
          <path className="glyph-draw" d="m24 32 6 6 11-12" />
        </>
      )}
    </svg>
  );
}

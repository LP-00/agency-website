// Original, resolution-independent motion graphic. Its single entrance sequence
// finishes within 3 seconds; no perpetual movement, canvas or animation library.
export function MotionSignature({
  variant = "hero",
}: {
  variant?: "hero" | "process";
}) {
  return (
    <div className={`motion-signature signature-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 360 220" fill="none" focusable="false">
        <g
          className="signature-grid"
          stroke="currentColor"
          strokeWidth=".6"
          opacity=".24"
        >
          <path d="M20 40h320M20 110h320M20 180h320M40 20v180m70-180v180m70-180v180m70-180v180m70-180v180" />
          <path d="M34 34h12m-6-6v12m274 134h12m-6-6v12" strokeWidth="1" />
        </g>
        <g className="signature-route" stroke="currentColor" strokeWidth="1.25">
          <path
            pathLength="1"
            d="M69 126h36c18 0 28-13 28-28V73c0-18 12-28 29-28h40c18 0 29 11 29 29v72c0 19 12 29 30 29h38"
          />
        </g>
        <g
          className="signature-node signature-node-one"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <rect
            x="25"
            y="91"
            width="59"
            height="69"
            rx="5"
            fill="var(--signature-fill)"
          />
          <path d="M25 107h59m-49-8h2m5 0h2m-9 20h27m-27 8h19m-19 8h23" />
        </g>
        <g
          className="signature-node signature-node-two"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            d="m166 45 24-19 24 19-24 19-24-19Z"
            fill="var(--signature-fill)"
          />
          <path d="m166 54 24 19 24-19m-48 9 24 19 24-19" />
        </g>
        <g
          className="signature-node signature-node-three"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <circle cx="303" cy="175" r="22" fill="var(--signature-fill)" />
          <path d="m294 183 17-17m-17 0h17v17" />
        </g>
        <circle
          className="signature-pulse"
          cx="0"
          cy="0"
          r="3"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

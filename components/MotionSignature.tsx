// A finite, three-stage drawing: idea, wireframe, published product.
export function MotionSignature({
  variant = "process",
}: {
  variant?: "hero" | "process";
}) {
  return (
    <div
      className={`motion-signature signature-${variant} process-story`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 156"
        fill="none"
        focusable="false"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="signature-route" opacity=".35">
          <path
            pathLength="1"
            d="M111 67h36m-5-5 6 5-6 5M264 67h36m-5-5 6 5-6 5"
          />
        </g>
        <g className="story-idea">
          <path
            d="M48 80c0-12-14-15-14-33a28 28 0 0 1 56 0c0 18-14 21-14 33v7H48v-7Z"
            fill="var(--signature-fill)"
          />
          <path d="M50 94h24m-22 6h20m-17 6h14M57 86V64l-7-8m17 30V64l7-8m-17 8h10" />
          <g className="bulb-rays">
            <path d="M62 4v5M17 44h7m76 0h7M26 14l6 6m60 0 6-6M20 78l6-5m72 0 6 5" />
          </g>
        </g>
        <g className="story-sketch">
          <rect
            x="166"
            y="24"
            width="78"
            height="84"
            rx="3"
            fill="var(--signature-fill)"
            transform="rotate(-4 205 66)"
          />
          <g className="sketch-lines" transform="rotate(-4 205 66)">
            <path
              pathLength="1"
              d="M178 37h53M179 48h40M178 56h53v24h-53zM178 80l20-18 15 12 10-7 8 13M179 91h22m9 0h21M179 98h35"
            />
          </g>
          <g className="sketch-pencil" fill="var(--signature-fill)">
            <path d="m229 93 24-42 7 4-24 42-9 7 2-11Z" />
            <path d="m251 55 7 4m-28 32 7 4" />
          </g>
        </g>
        <g className="story-ready">
          <rect
            x="313"
            y="30"
            width="94"
            height="67"
            rx="5"
            fill="var(--signature-fill)"
          />
          <path d="M313 44h94m-85-7h1m5 0h1m5 0h1M327 55h27v29h-27zM363 56h30m-30 8h23m-23 9h27M346 97v9m28-9v9m-34 0h40" />
          <circle cx="395" cy="93" r="15" fill="var(--signature-fill)" />
          <path
            className="ready-check"
            pathLength="1"
            d="m388 93 5 5 9-11"
            strokeWidth="2"
          />
        </g>
        <g
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontWeight="500"
          letterSpacing="1.8"
          textAnchor="middle"
        >
          <text x="62" y="140">
            IDEA
          </text>
          <text x="208" y="140">
            SCHIZZO
          </text>
          <text x="361" y="140">
            PRONTO
          </text>
        </g>
      </svg>
    </div>
  );
}

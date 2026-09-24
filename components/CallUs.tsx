import { ServiceArt } from "./ServiceArt";
import { QuoteButton } from "./QuoteButton";
import { WordReveal } from "./WordReveal";
export function CallUs() {
  return (
    <section
      className="call-us section"
      id="parliamone"
      aria-labelledby="call-heading"
    >
      <div className="container call-us-grid">
        <div className="call-us-copy">
          <p className="eyebrow">Il primo passo è una conversazione</p>
          <h2 id="call-heading">
            <WordReveal text="Parliamone." />
          </h2>
          <p>
            Hai un’idea, una domanda o un progetto da ripensare?{" "}
            <strong>Partiamo da qui.</strong>
          </p>
          <QuoteButton className="button-light" arrow>
            Organizziamo una call
          </QuoteButton>
          <span className="call-note">
            Raccontaci il progetto. Ci accordiamo per parlarne.
          </span>
        </div>
        <div className="call-sculpture" aria-hidden="true">
          <ServiceArt name="call" />
          <svg className="call-waves" viewBox="0 0 100 100" fill="none">
            <path
              d="M22 53a35 35 0 0 1 40-35M30 54a27 27 0 0 1 31-28M39 55a19 19 0 0 1 21-20"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="call-art-caption">
            Le idee migliori iniziano così.
          </span>
        </div>
      </div>
    </section>
  );
}

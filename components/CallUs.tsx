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
          <ServiceArt name="call-v3" />
          <span className="call-art-caption">
            Le idee migliori iniziano così.
          </span>
        </div>
      </div>
    </section>
  );
}

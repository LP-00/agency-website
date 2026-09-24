import { VERSION } from "@/lib/version";
import { QuoteButton } from "./QuoteButton";
import { Brand, Monogram } from "./Brand";
import { StartProject } from "./StartProject";
import { WordReveal } from "./WordReveal";
export function FinalCTA() {
  return (
    <section
      className="final-cta dark passo-final"
      id="preventivo"
      aria-labelledby="final-heading"
    >
      <div className="call-window-stage">
        <span className="call-backdrop" aria-hidden="true">
          <Brand />
        </span>
        <div className="call-window">
          <div className="call-avatar" aria-hidden="true">
            <Monogram />
            <span>PASSO.</span>
          </div>
          <div className="call-window-copy">
            <p className="eyebrow">Facciamo il primo passo</p>
            <h2>
              Le idee prendono forma.
              <br />
              <em>Insieme.</em>
            </h2>
            <QuoteButton className="button-light" arrow>
              Parliamone
            </QuoteButton>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="start-project">
          <div className="final-copy">
            <p className="eyebrow">Inizia un progetto</p>
            <h2 id="final-heading">
              <WordReveal text="Hai un progetto" />
              <br />
              <em className="headline-accent">in mente?</em>
            </h2>
            <p>
              Non serve un brief tecnico.{" "}
              <strong>Raccontaci cosa vuoi ottenere</strong> e partiamo da lì.
            </p>
          </div>
          <StartProject />
        </div>
        <footer className="passo-footer">
          <div className="footer-top">
            <p>
              Ogni progetto,
              <br />
              <em>un passo avanti.</em>
            </p>
            <nav aria-label="Navigazione footer">
              <a href="#lavori">Lavori</a>
              <a href="#servizi">Servizi</a>
              <a href="#faq">FAQ</a>
              <QuoteButton className="footer-quote">Preventivo</QuoteButton>
            </nav>
          </div>
          <a
            href="#inizio"
            className="footer-brand"
            aria-label="PASSO — Torna all’inizio"
          >
            <Brand />
          </a>
          <div className="footer-bottom">
            <span>Strategia. Design. Tecnologia.</span>
            <small>
              © {new Date().getFullYear()} PASSO{" "}
              <span className="version">v{VERSION}</span>
            </small>
          </div>
        </footer>
      </div>
    </section>
  );
}

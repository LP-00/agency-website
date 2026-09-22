import { VERSION } from "@/lib/version";
import { RichText } from "./RichText";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { QuoteButton } from "./QuoteButton";
export function FinalCTA() {
  return (
    <section
      className="final-cta dark"
      id="preventivo"
      aria-labelledby="final-heading"
    >
      <Image
        src={asset("/images/workspace.webp")}
        alt=""
        fill
        sizes="(min-width: 1024px) 100vw, 1200px"
        className="final-image"
      />
      <div className="container final-inner">
        <div className="final-copy">
          <h2 id="final-heading">
            Hai un progetto
            <br />
            <em className="headline-accent">in mente?</em>
          </h2>
          <p>
            <RichText text="Non serve un brief tecnico. Raccontaci cosa vuoi ottenere e partiamo da lì." />
          </p>
          <QuoteButton className="button-light" />
        </div>
        <footer>
          <nav aria-label="Navigazione footer">
            <a href="#lavori">Lavori</a>
            <a href="#servizi">Servizi</a>
            <a href="#faq">FAQ</a>
            <QuoteButton className="footer-quote">Preventivo</QuoteButton>
          </nav>
          <div className="footer-bottom">
            <a
              className="wordmark"
              href="#inizio"
              aria-label="/A — Torna all’inizio"
            >
              /A
            </a>
            <span>Design & sviluppo.</span>
            <small>
              © {new Date().getFullYear()}{" "}
              <span className="version">v{VERSION}</span>
            </small>
          </div>
        </footer>
      </div>
    </section>
  );
}

"use client";
import { RichText } from "./RichText";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { ProjectVisual } from "./ProjectVisual";
import { Icon } from "./Icon";
export function CaseStudy() {
  const [slide, setSlide] = useState(1);
  return (
    <section className="section case-study" aria-labelledby="focus-heading">
      <div className="container">
        <div className="focus-intro">
          <SectionHeading eyebrow="Focus" id="focus-heading">
            Florame.
            <br />
            Un progetto che
            <br />
            <strong>fa la differenza.</strong>
          </SectionHeading>
          <p>
            <RichText text="Abbiamo costruito una piattaforma digitale che connette fioristi, clienti e tecnologia, con e-commerce, AI e gestione completa degli ordini." />
          </p>
        </div>
        <div
          className="focus-visual"
          aria-roledescription="carosello"
          aria-label="Viste del progetto Florame"
        >
          <ProjectVisual
            key={slide}
            src={`/projects/real/florame-0${slide + 1}.webp`}
            name="Florame"
            number={`0${slide + 1}`}
            className={slide === 1 ? "secondary-visual" : ""}
          />
        </div>
        <div className="focus-bottom">
          <a
            href={slide === 0 ? "https://florame.ai" : "https://florame.ai/pages/florame-ai-landing"}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <span className="circle-arrow">
              <Icon name="arrow" />
            </span>
            Guarda il progetto<span className="sr-only"> (nuova scheda)</span>
          </a>
          <div className="carousel-controls">
            <span aria-live="polite" aria-atomic="true">
              0{slide + 1} <span className="muted">/ 02</span>
            </span>
            <button
              type="button"
              className="icon-button"
              aria-label="Immagine precedente"
              onClick={() => setSlide(slide === 0 ? 1 : 0)}
            >
              <Icon name="arrow" className="rotate-180" />
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Immagine successiva"
              onClick={() => setSlide(slide === 0 ? 1 : 0)}
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

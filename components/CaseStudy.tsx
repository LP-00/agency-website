import { RichText } from "./RichText";
import { SectionHeading } from "./SectionHeading";
import { ProjectVisual } from "./ProjectVisual";
import { HorizontalRail } from "./HorizontalRail";
import { Icon } from "./Icon";
import { projects } from "@/data/projects";
export function CaseStudy() {
  const project = projects[0];
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
        <HorizontalRail
          label="Viste del progetto Florame"
          className="project-gallery focus-gallery"
          controls={false}
        >
          {project.images.slice(1).map((image) => (
            <a
              className="project-slide focus-visual"
              key={image.src}
              href={image.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${image.label}. Visita Florame (nuova scheda)`}
            >
              <ProjectVisual
                src={image.src}
                name="Florame"
                label={image.label}
              />
            </a>
          ))}
        </HorizontalRail>
        <div className="focus-bottom">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <span className="circle-arrow">
              <Icon name="arrow" />
            </span>
            Guarda il progetto<span className="sr-only"> (nuova scheda)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

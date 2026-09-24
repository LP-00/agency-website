import Image from "next/image";
import { asset } from "@/lib/assets";
import { RichText } from "./RichText";
import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectVisual } from "./ProjectVisual";
import { HorizontalRail } from "./HorizontalRail";
import { WordReveal } from "./WordReveal";
import { Icon } from "./Icon";
export function SelectedWork() {
  return (
    <section
      id="lavori"
      className="section selected-work passo-work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <SectionHeading eyebrow="Lavori selezionati" id="work-heading">
          <WordReveal text="Cosa abbiamo già" />
          <br />
          <strong>costruito quest’anno.</strong>
        </SectionHeading>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <div className="project-copy">
                <Image
                  className="project-watermark"
                  src={asset(project.logo)}
                  alt=""
                  aria-hidden="true"
                  width={240}
                  height={160}
                  unoptimized
                />
                <span className="project-index" aria-hidden="true">
                  /{project.number}
                </span>
                <h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.name}
                    <Icon name="external" />
                    <span className="sr-only"> (nuova scheda)</span>
                  </a>
                </h3>
                <p>
                  <RichText text={project.description} />
                </p>
                <ul className="tags" aria-label="Caratteristiche">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <HorizontalRail
                label={`Galleria ${project.name}`}
                className="project-gallery"
                autoplay
                controls={false}
              >
                {project.images.map((image) => (
                  <a
                    className="project-slide"
                    key={image.src}
                    href={image.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name}, ${image.label}. Visita il progetto (nuova scheda)`}
                  >
                    <ProjectVisual
                      src={image.src}
                      name={project.name}
                      label={image.label}
                    />
                  </a>
                ))}
              </HorizontalRail>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

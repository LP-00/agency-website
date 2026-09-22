import { RichText } from "./RichText";
import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectVisual } from "./ProjectVisual";
import { Icon } from "./Icon";
export function SelectedWork() {
  return (
    <section
      id="lavori"
      className="section selected-work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <SectionHeading eyebrow="Lavori selezionati" id="work-heading">
          Qualcosa lo abbiamo
          <br />
          <strong>già costruito.</strong>
        </SectionHeading>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <a
                className="project-main-image"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — Anteprima da inserire · 01. Visita il progetto (nuova scheda)`}
              >
                <ProjectVisual
                  src={project.images[0]}
                  name={project.name}
                  number="01"
                />
              </a>
              <div className="project-copy">
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
                <p><RichText text={project.description} /></p>
                <ul className="tags" aria-label="Caratteristiche">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <a
                className="project-secondary-image"
                href={
                  "secondaryUrl" in project ? project.secondaryUrl : project.url
                }
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — Anteprima da inserire · 02. Esplora il progetto (nuova scheda)`}
              >
                <ProjectVisual
                  src={project.images[1]}
                  name={project.name}
                  number="02"
                  className="secondary-visual"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

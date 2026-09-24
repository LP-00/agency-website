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
          <WordReveal text="Qualcosa lo abbiamo" />
          <br />
          <strong>già costruito.</strong>
        </SectionHeading>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.name}>
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
              >
                {project.images.map((src, i) => (
                  <a
                    className="project-slide"
                    key={src}
                    href={
                      i === 1 && "secondaryUrl" in project
                        ? project.secondaryUrl
                        : project.url
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name}, vista ${i + 1}. Visita il progetto (nuova scheda)`}
                  >
                    <ProjectVisual
                      src={src}
                      name={project.name}
                      number={`0${i + 1}`}
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

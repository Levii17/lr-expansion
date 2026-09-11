"use client";

import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const galleryProjects = [
  {
    index: "01",
    status: "Completed",
    type: "Residential",
    detail: "Finished facade and entrance, ready for handover.",
    image: "/projects/01-facade-detail.jpg",
    className: "is-wide",
  },
  {
    index: "02",
    status: "Nearing completion",
    type: "Residential",
    detail: "Final fittings and grounds going in ahead of handover.",
    image: "/projects/02-nearing-completion.jpg",
    className: "is-tall",
  },
  {
    index: "03",
    status: "On site",
    type: "Finishes",
    detail: "Roofing and exterior finishing work in progress.",
    image: "/projects/03-finishing-work.jpg",
    className: "is-standard",
  },
  {
    index: "04",
    status: "On site",
    type: "Multi-unit build",
    detail: "Structural and exterior work underway on a residential block.",
    image: "/projects/04-structure-on-site.jpg",
    className: "is-wide",
  },
  {
    index: "05",
    status: "On site",
    type: "Site standards",
    detail: "Quality and safety, checked at every course of brick.",
    image: "/projects/05-on-site-detail.jpg",
    className: "is-standard",
  },
];

const foundedYear = 2020;
const yearsActive = new Date().getFullYear() - foundedYear;

export default function Projects() {
  useReveal();

  return (
    <section
      className="lr-section lr-projects-section"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="lr-container">
        <div className="lr-section-head lr-reveal">
          <div>
            <h2 id="projects-heading" className="lr-display">
              Built for the <span className="lr-yellow">long view.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            Developments shaped by clear thinking, disciplined delivery and a
            respect for what lasts.
          </p>
        </div>
        <div className="lr-project-gallery">
          {galleryProjects.map((project, index) => (
            <a
              className={`lr-project-tile ${project.className} lr-reveal delay-${(index % 3) + 1}`}
              href="#contact"
              aria-label={`Start a conversation about a project like this — ${project.type}`}
              key={project.index}
            >
              <div
                className="lr-project-image"
                style={{ backgroundImage: `url(${project.image})` }}
                aria-hidden="true"
              />
              <div className="lr-project-shade" aria-hidden="true" />
              <ArrowUpRight className="project-arrow" size={22} />
              <div className="project-tile-copy">
                <div className="project-card-label lr-mono">
                  <span>{project.index}</span>
                  <span>{project.status}</span>
                </div>
                <h3 className="lr-display">{project.type}</h3>
                <p>{project.detail}</p>
              </div>
            </a>
          ))}
          <div className="lr-project-index">
            <span className="lr-mono">On the ground since {foundedYear}</span>
            <strong className="lr-display">{yearsActive}</strong>
            <p>
              Years turning briefs into finished buildings — one site at a
              time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
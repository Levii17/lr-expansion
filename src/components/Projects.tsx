"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const galleryProjects = [
  {
    name: "Harbour Quarter",
    status: "01 / On site",
    type: "Construction",
    detail: "128 apartments / 2025 / Delivery underway",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=88",
    className: "is-wide",
  },
  {
    name: "Stone Gardens",
    status: "02 / Completed",
    type: "Development",
    detail: "34 homes / 2023 / Turnkey delivery",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88",
    className: "is-tall",
  },
  {
    name: "Northline House",
    status: "03 / In design",
    type: "Residential",
    detail: "12 homes / 2026 / Planning secured",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88",
    className: "is-standard",
  },
  {
    name: "Civic Exchange",
    status: "04 / Delivered",
    type: "Adaptive reuse",
    detail: "18,400 sq ft / 2022 / BREEAM Excellent",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=88",
    className: "is-wide",
  },
  {
    name: "Moorland Works",
    status: "05 / On site",
    type: "Mixed use",
    detail: "62,000 sq ft / 2025 / Delivery underway",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=88",
    className: "is-standard",
  },
];

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
              aria-label={`View ${project.name}`}
              key={project.name}
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
                  <span>{project.status}</span>
                  <span>{project.type}</span>
                </div>
                <h3 className="lr-display">{project.name}</h3>
                <p>{project.detail}</p>
              </div>
            </a>
          ))}
          <div className="lr-project-index">
            <span className="lr-mono">Project index</span>
            <strong className="lr-display">26</strong>
            <p>
              Years of construction and development expertise, applied with
              intent.
            </p>
            <button className="lr-text-action" type="button">
              All projects <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

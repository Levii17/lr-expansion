"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

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
        <div className="lr-projects-grid">
          <a
            className="lr-project-card is-tall lr-reveal"
            href="#contact"
            aria-label="View Harbour Quarter"
          >
            <div className="project-building" aria-hidden="true" />
            <ArrowUpRight className="project-arrow" size={22} />
            <div className="project-card-label lr-mono">
              <span>01 / On site</span>
              <span>Construction</span>
            </div>
            <h3 className="lr-display">Harbour Quarter</h3>
            <p>128 apartments / 2025 / Delivery underway</p>
          </a>
          <div className="lr-projects-side">
            <a
              className="lr-project-card lr-reveal delay-1"
              href="#contact"
              aria-label="View Stone Gardens"
            >
              <div
                className="project-building project-building-alt"
                aria-hidden="true"
              />
              <ArrowUpRight className="project-arrow" size={22} />
              <div className="project-card-label lr-mono">
                <span>02 / Completed</span>
                <span>Development</span>
              </div>
              <h3 className="lr-display">Stone Gardens</h3>
              <p>34 homes / 2023 / Turnkey delivery</p>
            </a>
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
      </div>
    </section>
  );
}

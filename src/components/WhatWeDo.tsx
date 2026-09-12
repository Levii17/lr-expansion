"use client";

import { useState } from "react";
import { ChevronDown, MoveUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    key: "construction",
    index: "01",
    title: "Construction delivery",
    copy: "Site delivery, refurbishment and civil works with quality, safety and programme kept under control.",
    tags: ["PROJECT DELIVERY", "CIVIL WORKS", "REFURBISHMENT"],
  },
  {
    key: "development",
    index: "02",
    title: "Development strategy",
    copy: "From site appraisal and option testing to a viable route to value, with the commercial case built in from the start.",
    tags: ["SITE APPRAISAL", "FEASIBILITY", "PLANNING"],
  },
  {
    key: "turnkey",
    index: "03",
    title: "Single-point delivery",
    copy: "One accountable route from brief to handover — aligning design, procurement and execution without the gaps.",
    tags: ["ONE TEAM", "ONE PROGRAMME", "ONE HANDOVER"],
  },
  {
    key: "transformation",
    index: "04",
    title: "Asset repositioning",
    copy: "Targeted upgrades and reconfiguration that give existing buildings new purpose, stronger performance and renewed appeal.",
    tags: ["REPOSITION", "RETROFIT", "REVALUE"],
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  useReveal();
  const current = services[active];

  return (
    <section
      className="lr-section lr-services"
      id="what-we-do"
      aria-labelledby="services-heading"
    >
      <div className="lr-container">
        <div className="lr-section-head lr-reveal">
          <div>
            <h2 id="services-heading" className="lr-display">
              One partner. <span className="lr-yellow">Every stage.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            Four capabilities, one accountable team. From first appraisal to a
            finished asset that performs on day one.
          </p>
        </div>

        {/* Desktop / tablet: tab list + detail panel */}
        <div className="lr-services-layout">
          <div
            className="lr-services-list lr-reveal delay-1"
            role="tablist"
            aria-label="Services"
          >
            {services.map((service, index) => (
              <button
                key={service.key}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={`lr-service-button ${active === index ? "is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="phase-num lr-mono">{service.index}</span>
                <span className="phase-title">{service.title}</span>
                <MoveUpRight size={18} className="phase-icon" />
              </button>
            ))}
          </div>
          <div className="lr-service-detail lr-reveal delay-2">
            <div className="lr-service-detail-top lr-mono">
              <span>LR / {current.index}</span>
              <span>CAPABILITY</span>
            </div>
            <div className="lr-service-graphic" aria-hidden="true">
              <div className="graphic-grid" />
              <div className="graphic-volume v-one" />
              <div className="graphic-volume v-two" />
              <div className="graphic-volume v-three" />
            </div>
            <p>{current.copy}</p>
            <div className="lr-tag-list lr-mono">
              {current.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="lr-services-accordion lr-reveal delay-1">
          {services.map((service, index) => {
            const isOpen = openMobile === index;
            return (
              <div
                className={`lr-service-accordion-item ${isOpen ? "is-open" : ""}`}
                key={service.key}
              >
                <button
                  type="button"
                  className="lr-service-accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.key}`}
                  onClick={() => setOpenMobile(isOpen ? null : index)}
                >
                  <span className="phase-num lr-mono">{service.index}</span>
                  <span className="phase-title">{service.title}</span>
                  <ChevronDown size={18} className="accordion-chevron" />
                </button>
                {isOpen && (
                  <div
                    className="lr-service-accordion-panel"
                    id={`service-panel-${service.key}`}
                  >
                    <p>{service.copy}</p>
                    <div className="lr-tag-list lr-mono">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
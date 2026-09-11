"use client";

import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    key: "construction",
    index: "01",
    title: "Construction",
    copy: "General building, civil works, renovations and delivery discipline.",
    tags: ["GENERAL BUILDING", "CIVIL WORKS", "RENOVATIONS"],
  },
  {
    key: "development",
    index: "02",
    title: "Property development",
    copy: "From opportunity and feasibility through to completed property.",
    tags: ["SITE APPRAISAL", "PLANNING", "DELIVERY"],
  },
  {
    key: "turnkey",
    index: "03",
    title: "Turnkey solutions",
    copy: "One accountable route from brief to handover, designed around clarity.",
    tags: ["ONE TEAM", "ONE PROGRAMME", "ONE HANDOVER"],
  },
  {
    key: "transformation",
    index: "04",
    title: "Property transformation",
    copy: "Targeted interventions that give existing assets a renewed purpose.",
    tags: ["REPOSITION", "RENEW", "REPERFORM"],
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
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
            <div className="lr-eyebrow lr-mono">02 / What we do</div>
            <h2 id="services-heading" className="lr-display">
              One partner. <span className="lr-yellow">Every stage.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            Four capabilities, one accountable team — from the first site
            appraisal to the finished, performing asset.
          </p>
        </div>
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
      </div>
    </section>
  );
}

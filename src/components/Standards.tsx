"use client";

import { Clock3, Layers3, Ruler, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const standards: [typeof ShieldCheck, string, string][] = [
  [
    ShieldCheck,
    "Safety without shortcuts",
    "Everyone goes home safe. Our systems are rigorous because the people on site are not a line item.",
  ],
  [
    Ruler,
    "Detail with purpose",
    "We sweat the junctions that make a building age well, not the details that only look good in a photograph.",
  ],
  [
    Clock3,
    "Programme you can trust",
    "Clear lookaheads, honest reporting and an early conversation when a decision needs making.",
  ],
  [
    Layers3,
    "One joined-up team",
    "Development thinking and construction know-how in the same room, from feasibility to aftercare.",
  ],
];

export default function Standards() {
  useReveal();

  return (
    <section
      className="lr-section lr-standards"
      id="standards"
      aria-labelledby="standards-heading"
    >
      <div className="lr-container">
        <div className="lr-section-head lr-reveal">
          <div>
            <h2 id="standards-heading" className="lr-display">
              Good work is <span className="lr-yellow">felt.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            In the quiet handover. In a site that runs safely. In the numbers
            landing where they should.
          </p>
        </div>
        <div className="lr-standard-grid">
          {standards.map(([Icon, title, copy], index) => (
            <article
              className={`lr-standard lr-reveal delay-${(index % 3) + 1}`}
              key={title}
            >
              <Icon size={22} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

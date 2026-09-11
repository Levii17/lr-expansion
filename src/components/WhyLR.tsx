"use client";

import { ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const principles: [string, string, string][] = [
  [
    "01",
    "Quality",
    "Rigorous standards and detail that hold their value over time.",
  ],
  [
    "02",
    "Safety",
    "A site culture built on clear systems, accountability and care.",
  ],
  [
    "03",
    "Delivery",
    "Clear decisions, realistic programmes and honest communication.",
  ],
];

export default function WhyLR() {
  useReveal();

  return (
    <section className="lr-why" id="why-lr" aria-labelledby="why-heading">
      <div className="lr-container">
        <div className="lr-why-header lr-reveal">
          <div className="lr-why-kicker lr-mono">
            Est. 1998 — working nationwide
          </div>
          <h2 id="why-heading" className="lr-display">
            The best work is
            <br />
            built <em>to last.</em>
          </h2>
        </div>

        <div className="lr-why-content">
          <div className="lr-why-copy lr-reveal delay-1">
            <p>
              We believe every project should leave more behind than it takes.
              That means decisive thinking, honest collaboration and a rigorous
              focus on the details that make places endure.
            </p>
            <a href="#contact" className="lr-text-action">
              Meet the team <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div className="lr-principles">
          {principles.map(([index, title, copy]) => (
            <div className="lr-principle lr-reveal" key={index}>
              <span className="lr-mono">{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

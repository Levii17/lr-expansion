"use client";

import { ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const principles: [string, string, string][] = [
  ["01", "Quality", "Pride in the details, from the ground up."],
  ["02", "Safety", "Care for every person and place on site."],
  ["03", "Practical delivery", "Ambition grounded in a workable plan."],
];

export default function WhyLR() {
  useReveal();

  return (
    <section className="lr-why" id="why-lr" aria-labelledby="why-heading">
      <div className="lr-container">
        <div className="lr-why-topline lr-mono lr-reveal">
          <span>04 / Why LR</span>
          <span>Est. 1998 — working nationwide</span>
        </div>
        <div className="lr-why-content">
          <h2 id="why-heading" className="lr-display lr-reveal">
            The best work is
            <br />
            built <em>to last.</em>
          </h2>
          <div className="lr-why-copy lr-reveal delay-1">
            <p>
              We believe every project should leave more behind than it
              takes. That means decisive thinking, honest collaboration, and
              an unwavering attention to the details that make places endure.
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

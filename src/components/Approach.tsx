"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ConstructionScene from "@/components/ConstructionScene";
import { useReveal } from "@/hooks/useReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const phases = [
  {
    id: "plan",
    number: "01",
    title: "Plan",
    kicker: "The first line",
    copy: "A clear brief, a workable budget and an honest view of the ground. We make the first decision the right one.",
    marker: "BRIEF / SITE / FEASIBILITY",
  },
  {
    id: "develop",
    number: "02",
    title: "Develop",
    kicker: "Make it real",
    copy: "We turn intent into a coordinated programme — resolving design, approvals and procurement before they become surprises.",
    marker: "DESIGN / COST / PROGRAMME",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    kicker: "The work, visible",
    copy: "Our site teams bring precision to the physical work. Safe, methodical and accountable from groundworks to final fix.",
    marker: "GROUNDWORKS / STRUCTURE / ENVELOPE",
  },
  {
    id: "finish",
    number: "04",
    title: "Finish",
    kicker: "The last 10%",
    copy: "The detail is the difference. We close every loop, test every system and make the handover feel considered.",
    marker: "INTERIORS / TESTING / SNAGGING",
  },
  {
    id: "deliver",
    number: "05",
    title: "Deliver",
    kicker: "Built to perform",
    copy: "A completed development is more than a finished building. It is a reliable asset ready for the people who will use it.",
    marker: "HANDOVER / AFTERCARE / IN USE",
  },
];

export default function Approach() {
  const [activePhase, setActivePhase] = useState(2);
  const phaseCopyRef = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !phaseCopyRef.current
    )
      return;
    gsap.fromTo(
      phaseCopyRef.current,
      { opacity: 0.42, y: 8 },
      { opacity: 1, y: 0, duration: 0.42, ease: "power2.out", overwrite: true },
    );
  }, [activePhase]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = ScrollTrigger.create({
      trigger: "#approach",
      start: "top 74%",
      end: "bottom 26%",
      onUpdate: (self) => {
        const nextStage = Math.min(
          phases.length - 1,
          Math.floor(self.progress * phases.length),
        );
        setActivePhase((current) => (current === nextStage ? current : nextStage));
      },
    });
    return () => trigger.kill();
  }, []);

  const phase = phases[activePhase];

  return (
    <section
      className="lr-section lr-work"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <div className="lr-container">
        <div className="lr-section-head lr-reveal">
          <div>
            <div className="lr-eyebrow lr-mono">01 / The method</div>
            <h2 id="approach-heading" className="lr-display">
              A project is a <span className="lr-yellow">sequence.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            No hand-offs into the unknown. Our team carries the intent from
            first feasibility through to the day a building earns its keep.
          </p>
        </div>
        <div className="lr-phase-layout">
          <div
            className="lr-phase-list lr-reveal delay-1"
            role="tablist"
            aria-label="Project delivery stages"
          >
            {phases.map((item, index) => (
              <button
                key={item.id}
                className={`lr-phase-button ${activePhase === index ? "is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activePhase === index}
                onClick={() => setActivePhase(index)}
              >
                <span className="phase-num lr-mono">{item.number}</span>
                <span className="phase-title">{item.title}</span>
                {activePhase === index ? (
                  <ArrowUpRight className="phase-icon" size={18} />
                ) : (
                  <Plus className="phase-icon" size={17} />
                )}
              </button>
            ))}
          </div>
          <div className="lr-phase-visual lr-reveal delay-2" aria-live="polite">
            <div className="phase-visual-copy" ref={phaseCopyRef}>
              <div className="lr-kicker lr-mono">
                <span>{phase.number}</span> / {phase.kicker}
              </div>
              <h3 className="lr-display">{phase.title}.</h3>
              <p>{phase.copy}</p>
            </div>
            <div className="phase-number-big lr-mono">LR / {phase.marker}</div>
            <ConstructionScene activeStage={activePhase} />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
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
    title: "Feasibility",
    kicker: "Reduce risk before cost",
    copy: "We establish the brief, budget and site realities early, so the project starts with evidence instead of assumptions.",
    marker: "BRIEF / SITE / FEASIBILITY",
  },
  {
    id: "develop",
    number: "02",
    title: "Design & approvals",
    kicker: "Align the decisions",
    copy: "We turn intent into a coordinated plan, resolving design, approvals and procurement before they become surprises on site.",
    marker: "DESIGN / COST / PROGRAMME",
  },
  {
    id: "build",
    number: "03",
    title: "Site delivery",
    kicker: "Build with control",
    copy: "Our teams deliver the work with discipline, safety and accountability, keeping quality, programme and budget in step.",
    marker: "GROUNDWORKS / STRUCTURE / ENVELOPE",
  },
  {
    id: "finish",
    number: "04",
    title: "Close-out",
    kicker: "Detail that performs",
    copy: "We test every system, close every detail and finish the building with care so the handover feels considered and complete.",
    marker: "INTERIORS / TESTING / SNAGGING",
  },
  {
    id: "deliver",
    number: "05",
    title: "Handover",
    kicker: "Ready for use",
    copy: "A completed development is more than a finished building. It is a reliable asset ready for the people and operations that will use it.",
    marker: "HANDOVER / AFTERCARE / IN USE",
  },
];

const stageCheckpoints = [0, 0.15, 0.36, 0.57, 0.82];
const LAST_STAGE = phases.length - 1;

export default function Approach() {
  const [activePhase, setActivePhase] = useState(0);
  const [isImmersive, setIsImmersive] = useState(false);
  const [isImmersiveExiting, setIsImmersiveExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const phaseCopyRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const hasAutoExitedRef = useRef(false);
  const immersiveExitTimeoutRef = useRef<number | null>(null);
  useReveal();

  const exitImmersive = () => {
    const trigger = scrollTriggerRef.current;
    if (!trigger || immersiveExitTimeoutRef.current !== null) return;

    const exitTarget = Math.max(
      window.scrollY,
      trigger.end - window.innerHeight * 0.75,
    );
    setIsImmersiveExiting(true);
    window.scrollTo({ top: exitTarget, behavior: "smooth" });
    immersiveExitTimeoutRef.current = window.setTimeout(() => {
      setIsImmersive(false);
      setIsImmersiveExiting(false);
      immersiveExitTimeoutRef.current = null;
    }, 420);
  };

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
    if (!journeyRef.current) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Match the trigger's start point to the sticky pin offset itself
    // (rather than firing while the section is still mostly off-screen)
    // so the fullscreen takeover engages right as the panel would pin,
    // not a beat before it.
    const pinOffset = window.matchMedia("(min-width: 901px)").matches ? 96 : 76;
    const trigger = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: `top ${pinOffset}px`,
      end: "bottom 8%",
      // Fullscreen takeover is a scroll-jack effect, so skip it entirely
      // for people who've asked for reduced motion.
      onToggle: (self) => {
        if (reducedMotion || self.isActive) {
          if (immersiveExitTimeoutRef.current !== null) {
            window.clearTimeout(immersiveExitTimeoutRef.current);
            immersiveExitTimeoutRef.current = null;
          }
          setIsImmersiveExiting(false);
          setIsImmersive(!reducedMotion && self.isActive);
          return;
        }

        setIsImmersiveExiting(true);
        immersiveExitTimeoutRef.current = window.setTimeout(() => {
          setIsImmersive(false);
          setIsImmersiveExiting(false);
          immersiveExitTimeoutRef.current = null;
        }, 420);
      },
      onUpdate: (self) => {
        setProgress(self.progress);
        const nextStage = stageCheckpoints.reduce(
          (stage, checkpoint, index) =>
            self.progress >= checkpoint ? index : stage,
          0,
        );
        setActivePhase((current) =>
          current === nextStage ? current : nextStage,
        );
      },
    });
    scrollTriggerRef.current = trigger;
    return () => {
      if (immersiveExitTimeoutRef.current !== null) {
        window.clearTimeout(immersiveExitTimeoutRef.current);
      }
      scrollTriggerRef.current = null;
      trigger.kill();
    };
  }, []);

  // Once the last stage (05/05) has been reached, automatically carry the
  // visitor out of the fullscreen scene and back into the normal page flow
  // instead of requiring them to keep scrolling through the pinned section.
  useEffect(() => {
    if (activePhase !== LAST_STAGE || !isImmersive) {
      hasAutoExitedRef.current = false;
      return;
    }
    if (hasAutoExitedRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hasAutoExitedRef.current = true;

    const timeout = window.setTimeout(() => {
      exitImmersive();
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, [activePhase, isImmersive]);

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
            <h2 id="approach-heading" className="lr-display">
              A project is a <span className="lr-yellow">sequence.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            The right sequence reduces risk. We carry the intent from first
            feasibility through to the day a building earns its keep.
          </p>
        </div>
        <div className="lr-method-journey" ref={journeyRef}>
          <div className="lr-phase-layout">
            <div className="lr-phase-stage">
              <div
                className={`lr-phase-visual lr-reveal delay-2 ${
                  isImmersive ? "is-immersive" : ""
                } ${isImmersiveExiting ? "is-exiting" : ""}`}
                aria-live="polite"
              >
                {isImmersive && (
                  <>
                    <div className="lr-immersive-progress" aria-hidden="true">
                      <div
                        className="lr-immersive-progress-bar"
                        style={{ transform: `scaleX(${progress})` }}
                      />
                    </div>
                    <button
                      type="button"
                      className="lr-immersive-exit"
                      aria-label="Exit fullscreen construction view"
                      onClick={exitImmersive}
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
                <div className="phase-visual-copy" ref={phaseCopyRef}>
                  <div className="lr-kicker lr-yellow">
                    <span>{phase.number}</span> / {phase.kicker}
                  </div>
                  <h3 className="lr-display">{phase.title}.</h3>
                  <p>{phase.copy}</p>
                </div>
                <div className="phase-number-big lr-mono">
                  LR / {phase.marker}
                </div>
                <ConstructionScene activeStage={activePhase} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

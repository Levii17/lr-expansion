"use client";

import { ArrowDownRight, MoveRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function Hero() {
  useReveal();

  return (
    <section className="lr-hero" aria-labelledby="hero-heading">
      <div className="lr-hero-inner">
        <div>
          <div className="lr-kicker lr-mono lr-reveal is-visible">
            Construction / Property Development / 1998—2024
          </div>
          <h1 id="hero-heading" className="lr-display lr-reveal delay-1 is-visible">
            Plans into <em>places.</em>
          </h1>
          <p className="lr-hero-copy lr-reveal delay-2 is-visible">
            LR is the construction partner for developments that need to work
            beautifully — on paper, on site and long after handover.
          </p>
          <div className="lr-hero-actions lr-reveal delay-3 is-visible">
            <a className="lr-button" href="#approach">
              See how we work <ArrowDownRight size={16} />
            </a>
            <a className="lr-button-ghost" href="#projects">
              View selected work <MoveRight size={16} />
            </a>
          </div>
          <div
            className="lr-hero-meta lr-reveal delay-3 is-visible"
            aria-label="LR company metrics"
          >
            <div>
              <strong>26</strong>
              <span className="lr-mono">Years in the field</span>
            </div>
            <div>
              <strong>£180m</strong>
              <span className="lr-mono">Delivered value</span>
            </div>
            <div>
              <strong>01</strong>
              <span className="lr-mono">Point of contact</span>
            </div>
          </div>
        </div>

        <div
          className="lr-scene-wrap lr-reveal delay-2 is-visible"
          aria-label="Architectural building visualization"
        >
          <div className="lr-scene-label lr-mono">LIVE VIEW / DEVELOPMENT 04</div>
          <div
            className="lr-scene"
            role="img"
            aria-label="Wireframe view of a building in construction"
          >
            <div className="scene-ground" />
            <div className="scene-crane" />
            <div className="scene-building">
              <i className="scene-window w1" />
              <i className="scene-window w2" />
              <i className="scene-window w3" />
              <i className="scene-window w4" />
              <i className="scene-window w5" />
              <i className="scene-window w6" />
            </div>
            <div className="scene-tag lr-mono">
              <span>STATUS</span> STRUCTURE / 68%
            </div>
          </div>
        </div>
      </div>
      <div className="lr-scroll-cue lr-mono" aria-hidden="true">
        <span className="lr-scroll-line" /> Scroll to move through the build
      </div>
    </section>
  );
}

"use client";

import { useReveal } from "@/hooks/useReveal";

export default function StatementStrip() {
  useReveal();

  return (
    <section className="lr-statement" aria-labelledby="statement-heading">
      {/* <div className="lr-statement-watermark" aria-hidden="true">
        L R
      </div> */}
      <div className="lr-statement-inner">
        <div className="lr-statement-grid">
          <h2 id="statement-heading" className="lr-reveal from-left">
            <span>The discipline to </span>
            <br />
            <strong>build well.</strong>
            <br />
            <span>The perspective to </span>
            <br />
            <strong>develop better.</strong>
          </h2>
          {/* <p className="lr-reveal from-right delay-1">
            Because the strongest result starts before a spade hits the ground.
            We join the dots between the commercial brief and the finished
            address.
          </p> */}
        </div>
      </div>
    </section>
  );
}

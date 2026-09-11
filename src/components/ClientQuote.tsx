"use client";

import { useReveal } from "@/hooks/useReveal";

export default function ClientQuote() {
  useReveal();

  return (
    <section className="lr-quote" aria-label="Our approach">
      <div className="lr-container lr-quote-inner">
        <figure className="lr-reveal">
          <blockquote>
            <span className="lr-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            We don&apos;t just hand over a building. We hand over something you
            can stand behind.
            <span className="lr-quote-mark" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
          <figcaption>
            That&apos;s the standard on every site, no matter the size of the
            job.
          </figcaption>
          <div className="lr-mono lr-quote-source">LR / Our word</div>
        </figure>
      </div>
    </section>
  );
}

"use client";

import { useReveal } from "@/hooks/useReveal";

export default function ClientQuote() {
  useReveal();

  return (
    <section className="lr-quote" aria-label="Client perspective">
      <div className="lr-container lr-quote-grid">
        <div className="lr-reveal">
          <div className="lr-quote-mark">&ldquo;</div>
          <div className="lr-mono lr-quote-source">Client / Northbank Developments</div>
        </div>
        <figure className="lr-reveal delay-1">
          <blockquote>
            &ldquo;LR gave us a clearer building than the one we first
            imagined.&rdquo;
          </blockquote>
          <figcaption>
            They challenged the right things early, then delivered with
            unusual calm.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

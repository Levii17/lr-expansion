"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useReveal();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    formRef.current?.reset();
  };

  return (
    <section
      className="lr-contact"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="lr-container lr-contact-grid">
        <div className="lr-reveal">
          <h2 id="contact-heading" className="lr-display">
            From development <span className="lr-yellow">to delivery.</span>
          </h2>
          <p className="lr-contact-copy">
            Tell us what you are building, where it is and what has to be true
            for the project to work. We will come back with the useful
            questions.
          </p>
          <div className="lr-contact-list">
            <a href="mailto:lrexpansion1@yahoo.com">
              <Mail size={14} /> lrexpansion1@yahoo.com
            </a>
            <a href="tel:+27712832325">
              <Phone size={14} /> +27 71 283 2325
            </a>
            <span className="lr-mono lr-contact-location">
              <MapPin size={14} /> Guateng / Free State / wherever the work is
            </span>
          </div>
        </div>
        <form
          className="lr-contact-form lr-reveal delay-1"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="lr-field">
            <input id="name" name="name" type="text" placeholder=" " required />
            <label htmlFor="name">Your name</label>
          </div>
          <div className="lr-field">
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              required
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="lr-field">
            <input id="project" name="project" type="text" placeholder=" " />
            <label htmlFor="project">Project / location</label>
          </div>
          <div className="lr-field">
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder=" "
              required
            />
            <label htmlFor="message">A few useful details</label>
          </div>
          <div className="lr-form-bottom">
            {formSent ? (
              <span className="lr-form-success" role="status">
                <Check size={15} /> Thanks — we&apos;ll be in touch shortly.
              </span>
            ) : (
              <span className="lr-form-success">
                Usually responds within one working day.
              </span>
            )}
            <button className="lr-button" type="submit">
              Start the conversation <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

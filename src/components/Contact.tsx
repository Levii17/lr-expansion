"use client";

import { type FormEvent, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const WHATSAPP_NUMBER = "27712832325";

const RESOURCES = [
  { label: "Company brochure", href: "/downloads/lr-expansion-brochure.pdf" },
  { label: "Labour cost guide", href: "/downloads/lr-expansion-labour-costs.pdf" },
];

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useReveal();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "New enquiry from the website",
      `Name: ${name}`,
      `Email: ${email}`,
      project && `Project / location: ${project}`,
      `Message: ${message}`,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    setFormSent(true);
    formRef.current?.reset();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
              <MapPin size={14} /> Gauteng / Free State / wherever the work is
            </span>
          </div>
          <div className="lr-resource-list">
            <span className="lr-mono lr-resource-label">Downloads</span>
            <div className="lr-resource-buttons">
              {RESOURCES.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  download
                  className="lr-resource-button"
                >
                  <Download size={14} /> {resource.label}
                </a>
              ))}
            </div>
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
                <Check size={15} /> Opening WhatsApp — send the message to
                reach us.
              </span>
            ) : (
              <span className="lr-form-success">
                Opens WhatsApp with your details filled in.
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
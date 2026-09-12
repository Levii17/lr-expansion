"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const galleryImages = [
  {
    src: "/projects/01-facade-detail.jpg",
    alt: "Completed building facade, angled exterior view",
  },
  {
    src: "/projects/02-nearing-completion.jpg",
    alt: "House nearing completion, garage and entrance",
  },
  {
    src: "/projects/03-finishing-work.jpg",
    alt: "Roofing and finishing work in progress",
  },
  {
    src: "/projects/04-structure-on-site.jpg",
    alt: "Multi-unit residential block under construction",
  },
  {
    src: "/projects/05-on-site-detail.jpg",
    alt: "Site safety helmet resting on fresh brickwork",
  },
  {
    src: "/projects/06-materials-delivery.jpg",
    alt: "Crane offloading building materials on site",
  },
  {
    src: "/projects/07-on-site-team.jpg",
    alt: "Site team working on a roof structure",
  },
  {
    src: "/projects/08-structure-progress.jpg",
    alt: "Double-storey brickwork taking shape",
  },
  {
    src: "/projects/09-roof-tiling.jpg",
    alt: "Roof tiles stacked and ready for installation",
  },
];

// Duplicated once so the marquee can loop seamlessly at -50%.
const loopedImages = [...galleryImages, ...galleryImages];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  useReveal();

  const closeLightbox = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(null);
      return;
    }
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveIndex(null);
      setIsClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % galleryImages.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <section
      className="lr-section lr-projects-section"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="lr-container">
        <div className="lr-section-head lr-reveal">
          <div>
            <h2 id="projects-heading" className="lr-display">
              Built for the <span className="lr-yellow">long view.</span>
            </h2>
          </div>
          <p className="lr-section-intro">
            A look at work on the ground. From first brick to final finish.
          </p>
        </div>
      </div>

      <div className="lr-gallery-track-wrap lr-reveal delay-1">
        <div className="lr-gallery-track">
          {loopedImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="lr-gallery-item"
              onClick={() => setActiveIndex(index % galleryImages.length)}
              aria-label={`Open larger view: ${image.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className={`lr-lightbox ${isClosing ? "is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={galleryImages[activeIndex].alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lr-lightbox-close"
            aria-label="Close"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="lr-lightbox-nav is-prev"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(
                (activeIndex - 1 + galleryImages.length) % galleryImages.length,
              );
            }}
          >
            <ChevronLeft size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeIndex}
            src={galleryImages[activeIndex].src}
            alt={galleryImages[activeIndex].alt}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lr-lightbox-nav is-next"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((activeIndex + 1) % galleryImages.length);
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}

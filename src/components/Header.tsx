"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS: [string, string][] = [
  ["Approach", "#approach"],
  ["What we do", "#what-we-do"],
  ["Projects", "#projects"],
  ["Why LR", "#why-lr"],
  ["Standards", "#standards"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`lr-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="lr-container lr-nav-inner">
        <a className="lr-logo" href="#top" onClick={closeMenu}>
          <span className="lr-mark" aria-hidden="true">
            LR
          </span>
          <span className="lr-logo-word">LR / DEVELOPMENTS</span>
        </a>
        <nav className="lr-nav-links" aria-label="Primary navigation">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="lr-nav-cta" href="#contact">
          Start a project <ArrowUpRight size={15} />
        </a>
        <button
          className="lr-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <div className={`lr-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        {LINKS.map(([label, href]) => (
          <a href={href} key={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}

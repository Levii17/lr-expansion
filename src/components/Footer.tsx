import { ArrowUp, Mail, Phone } from "lucide-react";

const FOOTER_LINKS: [string, string][] = [
  ["Approach", "#approach"],
  ["What we do", "#what-we-do"],
  ["Projects", "#projects"],
  ["Why LR", "#why-lr"],
  ["Standards", "#standards"],
  ["Contact", "#contact"],
];

export default function Footer() {
  return (
    <footer className="lr-footer">
      <div className="lr-footer-ticker lr-mono" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span className="lr-footer-ticker-group" key={index}>
            <span>Plan</span>
            <i />
            <span>Develop</span>
            <i />
            <span>Build</span>
            <i />
            <span>Deliver</span>
          </span>
        ))}
      </div>
      <div className="lr-container lr-footer-content">
        <div className="lr-footer-grid">
          <div className="lr-footer-heading-col">
            <h2 className="lr-footer-heading">
              Let&apos;s build
              <br />
              something <em>with</em>
              <br />
              <em>purpose.</em>
            </h2>
          </div>

          <nav className="lr-footer-links" aria-label="Footer navigation">
            <span className="lr-mono lr-footer-col-label">Menu</span>
            {FOOTER_LINKS.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="lr-footer-contact-col">
            <span className="lr-mono lr-footer-col-label">Get in touch</span>
            <a href="mailto:lrexpansion1@yahoo.com">
              <Mail size={12} /> lrexpansion1@yahoo.com
            </a>
            <a href="tel:+27712832325">
              <Phone size={12} /> +27 71 283 2325
            </a>
            <a href="tel:+27837813835">
              <Phone size={12} /> +27 83 781 3835
            </a>
          </div>

          <div className="lr-footer-social-col">
            <span className="lr-mono lr-footer-col-label">Follow</span>
            <div className="lr-footer-socials" aria-label="Social links">
              <a href="#" aria-label="LinkedIn">
                <span aria-hidden="true">in</span>
              </a>
              <a href="#" aria-label="Instagram">
                <span aria-hidden="true">ig</span>
              </a>
              <a href="#" aria-label="Facebook">
                <span aria-hidden="true">f</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lr-footer-inner">
          <span className="lr-mono-footer">
            © {new Date().getFullYear()} LR Expansion Group
          </span>
          <span className="lr-mono-footer">
            Build by{" "}
            <a
              href="https://mxolisi.is-a.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              mxolisi
            </a>
          </span>
          <a className="lr-mono-footer lr-footer-top" href="#top">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

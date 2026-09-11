import { AtSign, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="lr-footer">
      <div className="lr-footer-ticker lr-mono" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <span className="lr-footer-ticker-group" key={index}>
            <span>Plan</span>
            <i />
            <span>Develop</span>
            <i />
            <span>Build</span>
            <i />
            <span>Deliver</span>
            <i />
          </span>
        ))}
      </div>
      <div className="lr-container lr-footer-content">
        <h2 className="lr-footer-heading">
          Let&apos;s build
          <br />
          something <em>with</em>
          <br />
          <em>purpose.</em>
        </h2>
        <div className="lr-footer-inner">
          <span className="lr-mono">LR / Construction &amp; Development</span>
          <a className="lr-mono" href="mailto:projects@lrdevelopments.co.uk">
            projects@lrdevelopments.co.uk
          </a>
          <div className="lr-footer-socials" aria-label="Social links">
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <Share2 size={15} strokeWidth={1.8} />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <AtSign size={15} strokeWidth={1.8} />
            </a>
          </div>
          <span className="lr-mono">© 2026</span>
        </div>
      </div>
    </footer>
  );
}

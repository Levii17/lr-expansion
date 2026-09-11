export default function Hero() {
  return (
    <section className="lr-hero" aria-labelledby="hero-heading">
      <div className="lr-hero-image" aria-hidden="true" />
      <div className="lr-hero-inner">
        <div className="lr-hero-copy-block">
          <h1 id="hero-heading" className="lr-display">
            We don&apos;t just build.
            <br />
            <em>We develop.</em>
          </h1>
          <div className="lr-hero-services lr-mono" aria-label="Our services">
            <span>Construction</span>
            <i />
            <span>Renovation</span>
            <i />
            <span>Development</span>
          </div>
        </div>
      </div>
      <div className="lr-scroll-cue lr-mono" aria-hidden="true">
        <span className="lr-scroll-line" /> Scroll to explore
      </div>
    </section>
  );
}

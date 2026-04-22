import { SkeletonGrid } from "../../../../shared/components/SkeletonLoader";
import { Link } from "react-router-dom";
export default function LoadingPage({ selectedLanguage }) {
  return (
    <>
      <div>
        {/* ── Hero ── */}
        <section className="hero fade-up">
          <div className="hero-eyebrow">
            <span>Available for code collaboration</span>
          </div>

          <h1>
            Master {selectedLanguage || "Programming"} with <br />
            <span className="gradient-text">Absolute Precision.</span>
          </h1>

          <p>
            I provide a curated collection of{" "}
            {selectedLanguage || "programming"} algorithms, data structures, and
            technical documentation designed for high-performance engineers.
          </p>

          <div className="hero-actions">
            <Link to="/search" className="btn-primary">
              Explore Documentation <span style={{ marginLeft: "4px" }}>→</span>
            </Link>
          </div>
        </section>

        <div className="divider-accent" style={{ opacity: 0.1 }} />

        {/* ── Loading Skeleton Grid ── */}
        <section style={{ marginBottom: "80px" }}>
          <div className="section-header" style={{ marginBottom: "32px" }}>
            <span className="section-title">Latest Archives</span>
            <span className="section-label">Documentation & Scripts</span>
          </div>

          <SkeletonGrid count={6} type="doc" />
        </section>
      </div>
    </>
  );
}

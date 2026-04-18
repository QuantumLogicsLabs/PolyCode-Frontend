import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocuments, getStats, getCategories } from "../services/api";
import LazyDocCard from "../components/LazyDocCard";
import {
  getCategoryMeta,
  formatCategory,
} from "../../../shared/utils/categories";
import {
  SkeletonGrid,
  PageSkeleton,
} from "../../../shared/components/SkeletonLoader";

export default function HomePage({ selectedLanguage }) {
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [pyFiles, setPyFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const params = selectedLanguage
      ? { language: selectedLanguage, limit: 100, ungrouped: true }
      : { limit: 100, ungrouped: true };
    const metaParams = selectedLanguage ? { language: selectedLanguage } : {};

    Promise.all([
      getStats(metaParams),
      getCategories(metaParams),
      getDocuments({ ...params, fileType: "md" }),
      getDocuments({ ...params, fileType: "py" }),
    ])
      .then(([s, c, r, p]) => {
        setCategories(c.data);
        setRecent(r.data.documents);
        setPyFiles(p.data.documents);

        // Add a small delay for better UX
        setTimeout(() => {
          setLoading(false);
          setInitialLoad(false);
        }, 300);
      })
      .catch((error) => {
        console.error("Error loading home page data:", error);
        setLoading(false);
        setInitialLoad(false);
      });
  }, [selectedLanguage]);

  if (initialLoad) {
    return <PageSkeleton />;
  }

  if (loading && !initialLoad) {
    return (
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
    );
  }

  return (
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
          I provide a curated collection of {selectedLanguage || "programming"}{" "}
          algorithms, data structures, and technical documentation designed for
          high-performance engineers.
        </p>

        <div className="hero-actions">
          <Link to="/search" className="btn-primary">
            Explore Documentation <span style={{ marginLeft: "4px" }}>→</span>
          </Link>
        </div>
      </section>

      <div className="divider-accent" style={{ opacity: 0.1 }} />

      {/* ── Featured Bento Grid ── */}
      <section style={{ marginBottom: "80px" }}>
        <div className="section-header" style={{ marginBottom: "32px" }}>
          <span className="section-title">Latest Archives</span>
          <span className="section-label">Documentation & Scripts</span>
        </div>

        <div className="grid grid-bento">
          {recent.map((doc) => (
            <LazyDocCard key={doc.path} doc={doc} />
          ))}
          {pyFiles.map((doc) => (
            <LazyDocCard key={doc.path} doc={doc} />
          ))}
        </div>
      </section>

      {/* ── Secondary Sections ── */}
      <section style={{ marginBottom: "80px" }}>
        <div className="section-header">
          <span className="section-title">Technical Domains</span>
          <Link to="/search" className="view-all">
            all categories →
          </Link>
        </div>
        <div className="cat-grid">
          {categories.slice(0, 8).map((cat, i) => {
            const meta = getCategoryMeta(cat);
            return (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className={`cat-card fade-up fade-up-${(i % 4) + 1}`}
                style={{ "--cat-color": meta.color }}
              >
                <span className="cat-card-icon">{meta.icon}</span>
                <span className="cat-card-name">{formatCategory(cat)}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

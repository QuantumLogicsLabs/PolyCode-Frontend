import React, { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Layers3 } from "lucide-react";
import { COURSE_GROUPS } from "../../learn/shared/allCourses";

export default function CoursesPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const stackParam = (params.get("stack") || "").trim().toLowerCase();

  const activeGroup = useMemo(() => {
    if (!stackParam) return COURSE_GROUPS[0] || null;
    return (
      COURSE_GROUPS.find((group) => group.id === stackParam) ||
      COURSE_GROUPS[0] ||
      null
    );
  }, [stackParam]);

  const selectStack = (stackId) => {
    navigate(`/courses?stack=${encodeURIComponent(stackId)}`, { replace: true });
  };

  if (!COURSE_GROUPS.length || !activeGroup) {
    return (
      <main className="language-landing">
        <section className="language-course-section">
          <p>No courses available yet.</p>
          <Link to="/select-language">Choose a language</Link>
        </section>
      </main>
    );
  }

  return (
    <main
      className="language-landing courses-catalog-page"
      style={{ "--language-color": activeGroup.accent || "#00d4ff" }}
    >
      <section className="language-landing-hero">
        <div className="language-hero-copy">
          <span className="language-hero-kicker">
            <Layers3 size={15} />
            All PolyCode courses
          </span>
          <h1>{activeGroup.label}</h1>
          <p>
            Browse every interactive track for {activeGroup.label}. Pick a stack
            on the left, then open any course card to start learning.
          </p>
          <div className="language-hero-actions">
            <Link className="language-primary-btn" to={activeGroup.languagePath}>
              <BookOpen size={18} />
              {activeGroup.label} hub
            </Link>
            <Link className="language-secondary-btn" to="/select-language">
              All stacks
            </Link>
          </div>
        </div>
      </section>

      <section className="language-course-section courses-catalog-layout">
        <aside className="courses-catalog-stacks" aria-label="Course stacks">
          {COURSE_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              className={`courses-catalog-stack${
                group.id === activeGroup.id ? " courses-catalog-stack--active" : ""
              }`}
              style={{ "--stack-accent": group.accent }}
              onClick={() => selectStack(group.id)}
            >
              <span>{group.label}</span>
              <span className="courses-catalog-stack-count">
                {group.courses.length}
              </span>
            </button>
          ))}
        </aside>

        <div className="courses-catalog-main">
          <div className="language-section-head">
            <span>Available Courses</span>
            <h2>
              {activeGroup.courses.length} {activeGroup.label} course
              {activeGroup.courses.length === 1 ? "" : "s"}
            </h2>
          </div>
          <div className="language-course-grid">
            {activeGroup.courses.map((course) => {
              const Icon = course.icon;
              return (
                <Link
                  key={course.href}
                  to={course.href}
                  className="language-course-card"
                  style={{
                    "--course-accent": course.accent || activeGroup.accent,
                  }}
                >
                  <div className="language-course-icon">
                    {Icon ? <Icon size={22} /> : null}
                  </div>
                  <span>{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <strong>
                    Start <ArrowRight size={16} />
                  </strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

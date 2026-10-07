import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { getDueReviewCount, REVIEW_CHANGED_EVENT } from "./reviewApi";
import { REVIEW_COURSE_IDS } from "./reviewCourseIds";
import "./review.css";

/** Navbar "Review" link with the number of missed questions due today. */
export default function ReviewNavLink({ className = "" }) {
  const { token, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = () => setRefreshKey((key) => key + 1);
    window.addEventListener(REVIEW_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(REVIEW_CHANGED_EVENT, refresh);
  }, []);

  // Refetch on navigation too, so a question missed in a lesson shows up
  // once it's due without a page reload.
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setCount(0);
      return undefined;
    }
    let cancelled = false;
    getDueReviewCount(token, REVIEW_COURSE_IDS)
      .then((value) => {
        if (!cancelled) setCount(value);
      })
      .catch(() => {
        /* keep the last count */
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, token, pathname, refreshKey]);

  if (!isAuthenticated) return null;

  return (
    <Link
      to="/review"
      className={className}
      title={count ? `${count} to review` : "Review my mistakes"}
    >
      Review
      {count > 0 ? (
        <span className="navbar-review-count" aria-label={`${count} to review`}>
          {count}
        </span>
      ) : null}
    </Link>
  );
}

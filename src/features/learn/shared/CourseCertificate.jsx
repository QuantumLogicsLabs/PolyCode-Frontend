import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { networkErrorMessage } from "../../../lib/apiClient";
import CertificateDocument from "./CertificateDocument";
import {
  certificateCourseIdForPath,
  issueCertificate,
} from "./certificatesApi";

function CertificateStatus({ tone = "info", children }) {
  return (
    <div className="certificate-wrapper">
      <div
        className={`certificate-status certificate-status-${tone}`}
        role={tone === "error" ? "alert" : "status"}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Course certificate shown at the bottom of a course hub. Once the learner's
 * progress looks complete it asks the server to issue (or return) their
 * certificate; the server decides eligibility and supplies every detail shown.
 *
 * - courseId: optional; worked out from the hub route when omitted.
 * - certificate: an already-issued certificate to show as-is (profile pages).
 */
export default function CourseCertificate({
  courseId: courseIdProp,
  totalLessons,
  completedCount,
  certificate: providedCertificate,
}) {
  const { token, isAuthenticated } = useAuth();
  const location = useLocation();
  const courseId =
    courseIdProp || certificateCourseIdForPath(location.pathname);
  const isComplete = totalLessons > 0 && completedCount >= totalLessons;
  const shouldIssue =
    !providedCertificate && isComplete && isAuthenticated && Boolean(courseId);

  const [state, setState] = useState({ status: "idle" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!shouldIssue) return undefined;
    let cancelled = false;
    setState({ status: "loading" });

    issueCertificate(courseId, token)
      .then((certificate) => {
        if (!cancelled) setState({ status: "ready", certificate });
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.status === 403 && error.data?.code === "COURSE_INCOMPLETE") {
          setState({
            status: "incomplete",
            completed: error.data.completed,
            required: error.data.required,
          });
        } else {
          setState({ status: "error", message: networkErrorMessage(error) });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [shouldIssue, courseId, token, attempt]);

  if (providedCertificate) {
    return <CertificateDocument certificate={providedCertificate} />;
  }
  if (!isComplete || !isAuthenticated) return null;

  if (!courseId) {
    return (
      <CertificateStatus>
        Certificates aren't available for this course yet.
      </CertificateStatus>
    );
  }

  if (state.status === "ready") {
    return <CertificateDocument certificate={state.certificate} />;
  }

  if (state.status === "incomplete") {
    return (
      <CertificateStatus>
        <p>
          Your progress for this course isn't fully saved to your account yet
          (the server has {state.completed} of {state.required} lessons
          recorded), so a certificate can't be issued.
        </p>
        <p>If you just finished, reload the page to sync your progress.</p>
      </CertificateStatus>
    );
  }

  if (state.status === "error") {
    return (
      <CertificateStatus tone="error">
        <p>Could not load your certificate: {state.message}</p>
        <button
          type="button"
          className="download-btn"
          onClick={() => setAttempt((n) => n + 1)}
        >
          Try again
        </button>
      </CertificateStatus>
    );
  }

  return <CertificateStatus>Preparing your certificate…</CertificateStatus>;
}

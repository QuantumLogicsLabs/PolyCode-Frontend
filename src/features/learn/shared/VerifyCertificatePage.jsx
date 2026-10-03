import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { networkErrorMessage } from "../../../lib/apiClient";
import CertificateDocument from "./CertificateDocument";
import { getCertificate } from "./certificatesApi";

function VerificationMessage({ tone, title, children }) {
  return (
    <div className="verification-container">
      <div className="certificate-wrapper">
        <div
          className={`certificate-status certificate-status-${tone}`}
          role={tone === "error" ? "alert" : "status"}
        >
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Public certificate check. Only `?id=` is read; every detail shown comes from
 * the server, so edited or extra query parameters change nothing.
 */
export default function VerifyCertificatePage() {
  const [searchParams] = useSearchParams();
  const certId = (searchParams.get("id") || "").trim();
  const [state, setState] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!certId) {
      setState({ status: "not-found" });
      return undefined;
    }
    let cancelled = false;
    setState({ status: "loading" });

    getCertificate(certId)
      .then((certificate) => {
        if (!cancelled) setState({ status: "verified", certificate });
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.status === 404) setState({ status: "not-found" });
        else setState({ status: "error", message: networkErrorMessage(error) });
      });

    return () => {
      cancelled = true;
    };
  }, [certId, attempt]);

  if (state.status === "verified") {
    return (
      <div className="verification-container">
        <div
          className="verification-banner"
          style={{
            backgroundColor: "#22c55e",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
          }}
        >
          ✓ This is an officially verified PolyCode certificate.
        </div>
        <CertificateDocument certificate={state.certificate} />
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <VerificationMessage
        tone="error"
        title="This certificate could not be verified"
      >
        <p>
          No PolyCode certificate matches this link. Check that the link is
          complete, or ask the certificate holder for a new one from their
          profile.
        </p>
      </VerificationMessage>
    );
  }

  if (state.status === "error") {
    return (
      <VerificationMessage tone="error" title="Could not check this certificate">
        <p>{state.message}</p>
        <button
          type="button"
          className="download-btn"
          onClick={() => setAttempt((n) => n + 1)}
        >
          Try again
        </button>
      </VerificationMessage>
    );
  }

  return <VerificationMessage tone="info">Checking certificate…</VerificationMessage>;
}

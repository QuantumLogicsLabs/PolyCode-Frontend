import { useEffect, useRef, useState } from "react";

/** Public link that loads this certificate from the server. */
export function certificateVerifyUrl(certificateId) {
  return `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certificateId)}`;
}

function formatIssueDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Renders a server-issued certificate ({ id, recipientName, courseName,
 * issuedAt, lessonsCompleted, xp }) with its verify QR code and PDF download.
 * Only pass certificates returned by the certificates API.
 */
export default function CertificateDocument({ certificate }) {
  const certificateRef = useRef();
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const { id, recipientName, courseName, issuedAt, lessonsCompleted, xp } =
    certificate;

  useEffect(() => {
    let cancelled = false;
    setQrDataUrl(null);

    async function generateQrCode() {
      try {
        const qrcodeModule = await import("qrcode");
        const toDataURL =
          qrcodeModule.toDataURL || qrcodeModule.default?.toDataURL;
        if (!toDataURL) throw new Error("QR generator unavailable");

        const dataUrl = await toDataURL(certificateVerifyUrl(id), {
          width: 120,
          margin: 1,
          color: { dark: "#1e293b", light: "#ffffff" },
        });
        if (!cancelled) setQrDataUrl(dataUrl);
      } catch (err) {
        console.error("QR Generation Error:", err);
      }
    }

    generateQrCode();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function downloadPDF() {
    if (!certificateRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
      );
      pdf.setProperties({
        title: `${courseName} Certificate`,
        subject: `Certificate ID: ${id}`,
        author: "PolyCode",
      });
      pdf.save(`${courseName.replace(/\s+/g, "-")}-${id}.pdf`);
    } catch (err) {
      console.error("PDF error:", err.message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div id="course-certificate" className="certificate-wrapper">
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-watermark">
          <img src="/images/polycode-logo.png" alt="" />
        </div>

        <div className="certificate-header">
          <img
            src="/images/polycode-logo.png"
            alt="PolyCode"
            className="certificate-logo1"
          />
          <img
            src="/images/logo.png"
            alt="QuantumLogics"
            className="certificate-logo2"
          />
        </div>

        <div className="certificate-company">
          PolyCode powered by QuantumLogics
        </div>
        <h1 className="certificate-title">CERTIFICATE OF COMPLETION</h1>
        <div className="cert-divider">✦ ✦ ✦</div>
        <p className="certificate-awarded">
          This certificate is proudly awarded to
        </p>
        <h2 className="certificate-name">{recipientName}</h2>
        <p className="certificate-text">For successfully completing</p>
        <h3 className="certificate-course">{courseName}</h3>

        <div className="certificate-stats">
          <div>
            <strong>{lessonsCompleted}</strong>
            <span>Lessons Completed</span>
          </div>
          <div>
            <strong>{xp}</strong>
            <span>XP Earned</span>
          </div>
        </div>

        <div className="certificate-info">
          <div>
            <strong>Issued On</strong>
            <p>{formatIssueDate(issuedAt)}</p>
          </div>
          <div>
            <strong>Certificate ID</strong>
            <p style={{ fontSize: "0.7em", wordBreak: "break-all" }}>{id}</p>
          </div>
        </div>

        <div className="certificate-footer">
          <div className="signature-block">
            <img
              src="/images/aminasign.png"
              alt="Signature"
              className="signature-image"
            />
            <div className="signature-line" />
            <p className="signature-name">Amina</p>
            <p className="signature-role">Course Instructor</p>
          </div>

          <div className="certificate-footer-right">
            {qrDataUrl && (
              <div className="certificate-qr-footer">
                <img
                  src={qrDataUrl}
                  alt="Scan to verify"
                  width={80}
                  height={80}
                />
                <p>Scan to verify</p>
              </div>
            )}

            <img
              src="/images/stamp.png"
              alt="Official Stamp"
              className="official-stamp"
            />
          </div>
        </div>
      </div>

      <div className="certificate-actions">
        <button
          className="download-btn"
          onClick={downloadPDF}
          disabled={downloading}
        >
          {downloading ? "Generating PDF…" : "⬇ Download PDF"}
        </button>
      </div>
    </div>
  );
}

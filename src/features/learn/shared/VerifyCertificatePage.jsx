import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function VerifyCertificatePage() {
  const [searchParams] = useSearchParams();
  const certificateRef = useRef();
  const [downloading, setDownloading] = useState(false);

  const certId = searchParams.get("id");
  const userName = searchParams.get("name");
  const courseName = searchParams.get("course");
  const issueDate = searchParams.get("date");
  const completedCount = searchParams.get("lessons");
  const earnedXP = searchParams.get("xp");

  if (!certId || !userName || !courseName) {
    return (
      <div className="error-page">
        Invalid or missing certificate credentials.
      </div>
    );
  }

  async function downloadPDF() {
    if (!certificateRef.current) return;
    setDownloading(true);
    try {
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
      pdf.save(`${courseName.replace(/\s+/g, "-")}-${certId}.pdf`);
    } catch (err) {
      console.error("PDF error:", err.message);
    } finally {
      setDownloading(false);
    }
  }

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

      <div className="certificate-wrapper">
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
          <h2 className="certificate-name">{userName}</h2>
          <p className="certificate-text">For successfully completing</p>
          <h3 className="certificate-course">{courseName}</h3>

          <div className="certificate-stats">
            <div>
              <strong>{completedCount}</strong>
              <span>Lessons Completed</span>
            </div>
            <div>
              <strong>{earnedXP}</strong>
              <span>XP Earned</span>
            </div>
          </div>

          <div className="certificate-info">
            <div>
              <strong>Issued On</strong>
              <p>{issueDate}</p>
            </div>
            <div>
              <strong>Certificate ID</strong>
              <p style={{ fontSize: "0.7em", wordBreak: "break-all" }}>
                {certId}
              </p>
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

            <img
              src="/images/stamp.png"
              alt="Official Stamp"
              className="official-stamp"
            />
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
    </div>
  );
}

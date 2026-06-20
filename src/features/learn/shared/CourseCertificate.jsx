import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

function generateLocalCertId(userId, courseName) {
  const slug = courseName
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .slice(0, 20);
  const suffix = String(userId || "guest")
    .slice(-6)
    .toUpperCase();
  return `PC-${slug}-${suffix}-${Date.now().toString(36).toUpperCase()}`;
}

export default function CourseCertificate({
  courseName,
  totalLessons,
  completedCount,
  earnedXP,
  recipient,
}) {
  const { user } = useAuth();
  const certificateUser = recipient || user;
  const certificateRef = useRef();
  const certId = useRef(null);

  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const isComplete = completedCount >= totalLessons;

  const userName =
    certificateUser?.firstName && certificateUser?.lastName
      ? `${certificateUser.firstName} ${certificateUser.lastName}`
      : certificateUser?.name || certificateUser?.username || "Learner";

  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!isComplete) return;
    let cancelled = false;

    if (!certId.current) {
      certId.current = generateLocalCertId(
        certificateUser?._id || certificateUser?.id,
        courseName,
      );
    }

    const queryParams = new URLSearchParams({
      id: certId.current,
      name: userName,
      course: courseName,
      date: issueDate,
      lessons: totalLessons.toString(),
      xp: earnedXP.toString(),
    }).toString();

    const qrUrl = `https://poly-code-frontend-tau.vercel.app//verify-certificate?${queryParams}`;

    async function generateQrCode() {
      try {
        const qrcodeModule = await import("qrcode");
        const toDataURL =
          qrcodeModule.toDataURL || qrcodeModule.default?.toDataURL;
        if (!toDataURL) throw new Error("QR generator unavailable");

        const dataUrl = await toDataURL(qrUrl, {
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
  }, [
    isComplete,
    courseName,
    certificateUser,
    userName,
    issueDate,
    totalLessons,
    earnedXP,
  ]);

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
        subject: `Certificate ID: ${certId.current}`,
        author: "PolyCode",
      });
      pdf.save(`${courseName.replace(/\s+/g, "-")}-${certId.current}.pdf`);
    } catch (err) {
      console.error("PDF error:", err.message);
    } finally {
      setDownloading(false);
    }
  }

  if (!isComplete) return null;

  return (
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
              {certId.current}
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

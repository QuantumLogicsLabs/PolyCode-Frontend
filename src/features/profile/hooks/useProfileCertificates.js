import { useEffect, useState } from "react";
import { networkErrorMessage } from "../../../lib/apiClient";
import { listUserCertificates } from "../../learn/shared/certificatesApi";

/**
 * Certificates the server has issued to the profile's user. Only these are
 * shown on a profile; eligibility is never worked out in the browser.
 */
export default function useProfileCertificates(username = "") {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) {
      setCertificates([]);
      setLoading(false);
      setError("");
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    listUserCertificates(username)
      .then((list) => {
        if (!cancelled) setCertificates(list);
      })
      .catch((err) => {
        if (cancelled) return;
        setCertificates([]);
        setError(networkErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { certificates, loading, error };
}

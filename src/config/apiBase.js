/**
 * Resolve API base URL for local dev and hosted frontends (Vercel, custom domain).
 * CRA bakes REACT_APP_* at build time; if production build still points at localhost,
 * we fall back to the deployed backend when the app runs on a non-local hostname.
 */
const LOCAL_API = "http://localhost:5000/api";
const DEFAULT_PROD_API = "https://poly-code-backend.vercel.app/api";

function normalizeBase(url = "") { //Removes trailing slashes from the URL.
  return url.trim().replace(/\/$/, "");
}

function isLocalHostname(hostname = "") { //Checks if the app is running on your own computer. localhost or 127.0.0.1.
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/** Dev machine on LAN (e.g. http://192.168.x.x:3000 from `npm start`) */
function isPrivateLanHostname(hostname = "") {
  if (isLocalHostname(hostname)) return true;
  return /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);
}

function isLocalApiUrl(url = "") {
  return /localhost|127\.0\.0\.1/.test(url);
}

export function getApiBase() {
  const envUrl = normalizeBase(process.env.REACT_APP_API_URL || "");
  const prodOverride = normalizeBase(process.env.REACT_APP_PROD_API_URL || "");

  if (typeof window === "undefined") {
    return envUrl || LOCAL_API;
  }

  const { hostname, protocol } = window.location;

  if (isLocalHostname(hostname)) {
    return envUrl || LOCAL_API;
  }

  // `npm start` network URL — use backend on the same host, not Vercel
  if (
    process.env.NODE_ENV === "development" &&
    isPrivateLanHostname(hostname)
  ) {
    return envUrl || `${protocol}//${hostname}:5000/api`;
  }

  if (envUrl && !isLocalApiUrl(envUrl)) {
    return envUrl;
  }

  return prodOverride || DEFAULT_PROD_API;
}

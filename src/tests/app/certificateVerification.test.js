import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import VerifyCertificatePage from "../../features/learn/shared/VerifyCertificatePage";
import CourseCertificate from "../../features/learn/shared/CourseCertificate";

// Jest 27 cannot resolve react-router-dom 7 (package "exports" only), so the
// two router hooks these components use are stubbed.
let mockSearch = "";
let mockPathname = "/";
jest.mock(
  "react-router-dom",
  () => ({
    useSearchParams: () => [new URLSearchParams(mockSearch)],
    useLocation: () => ({ pathname: mockPathname }),
  }),
  { virtual: true },
);

let mockAuth = { token: null, isAuthenticated: false };
jest.mock("../../features/auth/context/AuthContext", () => ({
  useAuth: () => mockAuth,
}));

const mockToDataURL = jest.fn();
jest.mock("qrcode", () => ({
  toDataURL: (...args) => mockToDataURL(...args),
}));

const CERT_ID = "3f9c2a1e-7b4d-4c1a-9e2f-0a1b2c3d4e5f";
const SERVER_CERT = {
  id: CERT_ID,
  recipientName: "Real Learner",
  courseId: "ai-ml-py",
  courseName: "AI & ML with Python",
  issuedAt: "2026-10-01T10:00:00.000Z",
  lessonsCompleted: 45,
  xp: 700,
};

function respond(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

const requestedPaths = () =>
  global.fetch.mock.calls.map(([url]) => new URL(url).pathname);

function expectNotVerified() {
  expect(
    screen.getByText("This certificate could not be verified"),
  ).toBeInTheDocument();
  expect(screen.queryByText(/officially verified/i)).not.toBeInTheDocument();
  expect(screen.queryByAltText("Signature")).not.toBeInTheDocument();
  expect(screen.queryByText(/Download PDF/)).not.toBeInTheDocument();
}

beforeEach(() => {
  mockSearch = "";
  mockPathname = "/";
  mockAuth = { token: null, isAuthenticated: false };
  global.fetch = jest.fn();
  // CRA's resetMocks clears implementations before each test.
  mockToDataURL.mockImplementation(() =>
    Promise.resolve("data:image/png;base64,AAAA"),
  );
});

describe("VerifyCertificatePage", () => {
  it("does not verify a link with made-up details", async () => {
    mockSearch =
      "id=123&name=Any%20Name&course=Java%20Fundamentals&date=2026-09-30&lessons=40&xp=2000";
    global.fetch.mockImplementation(() =>
      respond(404, { error: "Certificate not found" }),
    );

    render(<VerifyCertificatePage />);

    await screen.findByText("This certificate could not be verified");
    expectNotVerified();
    expect(screen.queryByText("Any Name")).not.toBeInTheDocument();
    expect(requestedPaths()).toEqual(["/api/certificates/123"]);
  });

  it("does not verify a link without an id, and never calls the server", async () => {
    mockSearch = "name=Any%20Name&course=Java%20Fundamentals";

    render(<VerifyCertificatePage />);

    await screen.findByText("This certificate could not be verified");
    expectNotVerified();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows only the server's details for a real id, ignoring edited parameters", async () => {
    mockSearch = `id=${CERT_ID}&name=Fake%20Name&course=Fake%20Course&xp=99999`;
    global.fetch.mockImplementation(() =>
      respond(200, { certificate: SERVER_CERT }),
    );

    render(<VerifyCertificatePage />);

    await screen.findByText(/officially verified/i);
    await screen.findByAltText("Scan to verify");
    expect(screen.getByText("Real Learner")).toBeInTheDocument();
    expect(screen.getByText("AI & ML with Python")).toBeInTheDocument();
    expect(screen.getByText("700")).toBeInTheDocument();
    expect(screen.queryByText("Fake Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Fake Course")).not.toBeInTheDocument();
    expect(screen.queryByText("99999")).not.toBeInTheDocument();
    expect(requestedPaths()).toEqual([`/api/certificates/${CERT_ID}`]);
  });

  it("does not show a certificate when the server cannot be reached", async () => {
    mockSearch = `id=${CERT_ID}`;
    global.fetch.mockImplementation(() =>
      Promise.reject(new TypeError("Failed to fetch")),
    );

    render(<VerifyCertificatePage />);

    await screen.findByText("Could not check this certificate");
    expect(screen.queryByText(/officially verified/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Download PDF/)).not.toBeInTheDocument();
  });
});

describe("CourseCertificate", () => {
  beforeEach(() => {
    mockPathname = "/learn/ai_ml-py";
    mockAuth = { token: "test-token", isAuthenticated: true };
  });

  it("asks the server for the hub's course and puts only the id in the verify link", async () => {
    global.fetch.mockImplementation(() =>
      respond(201, { certificate: SERVER_CERT }),
    );

    render(
      <CourseCertificate
        courseName="AI & ML with Python"
        totalLessons={45}
        completedCount={45}
        earnedXP={1}
      />,
    );

    await screen.findByText("Real Learner");
    await screen.findByAltText("Scan to verify");
    const [url, options] = global.fetch.mock.calls[0];
    expect(new URL(url).pathname).toBe("/api/certificates");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({ courseId: "ai-ml-py" });
    expect(options.headers.Authorization).toBe("Bearer test-token");
    expect(screen.getByText("700")).toBeInTheDocument();
    expect(screen.getByText(CERT_ID)).toBeInTheDocument();
    expect(mockToDataURL.mock.calls[0][0]).toBe(
      `${window.location.origin}/verify-certificate?id=${CERT_ID}`,
    );
  });

  it("shows no certificate when the server says the course is incomplete", async () => {
    global.fetch.mockImplementation(() =>
      respond(403, {
        error: "Course is not complete yet",
        code: "COURSE_INCOMPLETE",
        completed: 40,
        required: 45,
      }),
    );

    render(
      <CourseCertificate
        courseName="AI & ML with Python"
        totalLessons={45}
        completedCount={45}
      />,
    );

    await screen.findByText(/40 of 45 lessons/);
    expect(screen.queryByText("CERTIFICATE OF COMPLETION")).not.toBeInTheDocument();
    expect(screen.queryByText(/Download PDF/)).not.toBeInTheDocument();
  });

  it("does not request a certificate before the course looks complete", async () => {
    const { container } = render(
      <CourseCertificate
        courseName="AI & ML with Python"
        totalLessons={45}
        completedCount={44}
      />,
    );

    await waitFor(() => expect(container).toBeEmptyDOMElement());
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows an issued certificate passed in by the profile without calling the server", async () => {
    mockPathname = "/@real/certificates/ai-ml-py";
    mockAuth = { token: null, isAuthenticated: false };

    render(<CourseCertificate certificate={SERVER_CERT} />);

    expect(screen.getByText("Real Learner")).toBeInTheDocument();
    await screen.findByAltText("Scan to verify");
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

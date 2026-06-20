import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { rememberSignedInUser } from "../../lib/authSession";
import ProfileEditSection from "./components/ProfileEditSection";
import ProfileHero from "./components/ProfileHero";
import { ALL_LESSONS, TOTAL_XP } from "../learn/oops-cpp/data/oopsCurriculum";
import useOopsProgress from "../learn/oops-cpp/hooks/useOopsProgress";
import {
  POINTER_LESSONS,
  POINTER_TOTAL_XP,
} from "../learn/pointers-cpp/data/pointersCurriculum";
import usePointersProgress from "../learn/pointers-cpp/hooks/usePointersProgress";
import {
  NUMPY_LESSONS,
  NUMPY_TOTAL_XP,
} from "../learn/numpy-py/data/numpyCurriculum";
import useNumpyProgress from "../learn/numpy-py/hooks/useNumpyProgress";
import {
  PANDAS_LESSONS,
  PANDAS_TOTAL_XP,
} from "../learn/pandas-py/data/pandasCurriculum";
import usePandasProgress from "../learn/pandas-py/hooks/usePandasProgress";
import CourseCertificate from "../learn/shared/CourseCertificate";
import {
  getFollowStatus,
  getProfileByUsername,
  setFollowStatus,
} from "./services/profileApi";

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_ACTIVITY_DAYS = 30;

function toDateKey(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function getResponsiveActivityDays(width = 0) {
  if (width < 560) return 30;
  if (width < 860) return 60;
  const columns = Math.max(9, Math.floor((width - 4) / 17));
  return Math.min(365, Math.max(MIN_ACTIVITY_DAYS, columns * 7));
}

function buildActivityDays(dayCount, ...progressMaps) {
  const counts = new Map();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = today.toISOString().slice(0, 10);
  const start = new Date(today.getTime() - (dayCount - 1) * DAY_MS);
  const startKey = start.toISOString().slice(0, 10);

  progressMaps.forEach((progress) => {
    Object.values(progress).forEach((item) => {
      let key = toDateKey(item?.at || item?.completedAt || item);
      if (!key || key < startKey || key > todayKey) {
        key = todayKey;
      }
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  });

  return Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(start.getTime() + index * DAY_MS);
    const key = date.toISOString().slice(0, 10);
    const count = counts.get(key) || 0;
    return {
      key,
      count,
      label: date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    };
  });
}

function levelForCount(count) {
  if (count >= 4) return 4;
  if (count >= 3) return 3;
  if (count >= 2) return 2;
  if (count >= 1) return 1;
  return 0;
}

function ActivityGraph({ days }) {
  const activeDays = days.filter((day) => day.count > 0).length;
  const totalCompletions = days.reduce((sum, day) => sum + day.count, 0);
  const [tooltip, setTooltip] = React.useState(null);

  const showTooltip = (event, day) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      text: `${day.label}: ${day.count} lesson${day.count === 1 ? "" : "s"} done`,
    });
  };

  return (
    <section className="profile-activity-card">
      <div className="profile-activity-head">
        <div>
          <span>Progress Graph</span>
          <h2>Learning activity</h2>
        </div>
        <strong>
          {totalCompletions} completion{totalCompletions === 1 ? "" : "s"}
        </strong>
      </div>
      <div className="profile-activity-grid" aria-label="Learning activity graph">
        {days.map((day) => (
          <span
            key={day.key}
            className="profile-activity-cell"
            data-level={levelForCount(day.count)}
            aria-label={`${day.label}: ${day.count} lesson${day.count === 1 ? "" : "s"} done`}
            tabIndex={0}
            onMouseEnter={(event) => showTooltip(event, day)}
            onMouseLeave={() => setTooltip(null)}
            onFocus={(event) => showTooltip(event, day)}
            onBlur={() => setTooltip(null)}
          />
        ))}
      </div>
      {tooltip && (
        <div
          className="profile-activity-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.text}
        </div>
      )}
      <div className="profile-activity-footer">
        <span>{activeDays} active days in the last {days.length} days</span>
        <div className="profile-activity-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} data-level={level} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}

function TrackProgressCard({
  title,
  subtitle,
  lessons,
  totalXP,
  progress,
  bookmarks,
  href,
  accent,
  streak = 0,
}) {
  const completedCount = Object.keys(progress).length;
  const pct = Math.round((completedCount / lessons.length) * 100) || 0;
  const earnedXP = lessons
    .filter((lesson) => progress[lesson.id])
    .reduce((sum, lesson) => sum + lesson.xp, 0);
  const nextLesson = lessons.find((lesson) => !progress[lesson.id]) || lessons[0];

  return (
    <section className="profile-track-card" style={{ "--profile-accent": accent }}>
      <div className="profile-track-head">
        <div>
          <span>{subtitle}</span>
          <h2>{title}</h2>
        </div>
        <strong>{pct}%</strong>
      </div>

      <div className="profile-track-meter">
        <div style={{ width: `${pct}%` }} />
      </div>

      <div className="profile-track-stats">
        <div>
          <span>Lessons</span>
          <strong>
            {completedCount}/{lessons.length}
          </strong>
        </div>
        <div>
          <span>XP</span>
          <strong>
            {earnedXP}/{totalXP}
          </strong>
        </div>
        <div>
          <span>Streak</span>
          <strong>{streak} days</strong>
        </div>
        <div>
          <span>Saved</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <div className="profile-next-row">
        <div>
          <span>Next lesson</span>
          <strong>{nextLesson.title}</strong>
        </div>
        <Link to={`${href}/lesson/${nextLesson.id}`}>Continue</Link>
      </div>
    </section>
  );
}

function getCompletedTrackCertificate(track) {
  const completedCount = Object.keys(track.progress).length;
  if (completedCount < track.lessons.length) return null;

  const earnedXP = track.lessons
    .filter((lesson) => track.progress[lesson.id])
    .reduce((sum, lesson) => sum + lesson.xp, 0);

  return {
    ...track,
    slug: track.courseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    completedCount,
    earnedXP,
  };
}

export default function ProfilePage() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading } = useAuth();
  const [editOpen, setEditOpen] = React.useState(false);
  const [publicUser, setPublicUser] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [followSaving, setFollowSaving] = React.useState(false);
  const [followError, setFollowError] = React.useState("");
  const profileRouteMatch = location.pathname.match(
    /^\/@([^/]+)(?:\/certificates\/([^/]+))?$/,
  );
  const pathUsername = profileRouteMatch?.[1];
  const certificateSlug = profileRouteMatch?.[2]?.toLowerCase();
  const routeUsername = (username || pathUsername)
    ?.replace(/^@/, "")
    .trim()
    .toLowerCase();
  const signedInUsername = user?.username?.toLowerCase();
  const isOwnProfile =
    isAuthenticated &&
    user &&
    (!routeUsername ||
      (signedInUsername && routeUsername === signedInUsername) ||
      !signedInUsername);
  const profileUser = isOwnProfile ? user : publicUser;
  const oops = useOopsProgress();
  const pointers = usePointersProgress();
  const numpy = useNumpyProgress();
  const pandas = usePandasProgress();
  const totalCompleted =
    Object.keys(oops.completedMap).length +
    Object.keys(pointers.completedMap).length +
    Object.keys(numpy.completedMap).length +
    Object.keys(pandas.completedMap).length;
  const totalLessons =
    ALL_LESSONS.length +
    POINTER_LESSONS.length +
    NUMPY_LESSONS.length +
    PANDAS_LESSONS.length;
  const totalPct = Math.round((totalCompleted / totalLessons) * 100) || 0;
  const totalStreak = oops.remoteProgress?.currentStreak || 0;
  const [activityWidth, setActivityWidth] = React.useState(0);
  const activityWrapRef = React.useRef(null);
  const activityDayCount = getResponsiveActivityDays(activityWidth);
  const activityDays = React.useMemo(
    () =>
      buildActivityDays(
        activityDayCount,
        oops.completedMap,
        pointers.completedMap,
        numpy.completedMap,
        pandas.completedMap,
      ),
    [
      activityDayCount,
      oops.completedMap,
      pointers.completedMap,
      numpy.completedMap,
      pandas.completedMap,
    ],
  );
  const completedCertificates = [
    getCompletedTrackCertificate({
      courseName: "OOPs C++",
      lessons: ALL_LESSONS,
      totalXP: TOTAL_XP,
      progress: oops.completedMap,
    }),
    getCompletedTrackCertificate({
      courseName: "Pointers C++",
      lessons: POINTER_LESSONS,
      totalXP: POINTER_TOTAL_XP,
      progress: pointers.completedMap,
    }),
    getCompletedTrackCertificate({
      courseName: "NumPy for Python",
      lessons: NUMPY_LESSONS,
      totalXP: NUMPY_TOTAL_XP,
      progress: numpy.completedMap,
    }),
    getCompletedTrackCertificate({
      courseName: "Pandas for Python",
      lessons: PANDAS_LESSONS,
      totalXP: PANDAS_TOTAL_XP,
      progress: pandas.completedMap,
    }),
  ].filter(Boolean);
  const certificateOwnerPath = `/@${routeUsername || signedInUsername || profileUser?.username}`;
  const routeCertificate = certificateSlug
    ? completedCertificates.find((certificate) => certificate.slug === certificateSlug)
    : null;

  React.useEffect(() => {
    if (!isAuthenticated || !user?.username || !routeUsername) return;
    if (routeUsername === user.username.toLowerCase()) {
      rememberSignedInUser(user);
      return;
    }

    const storedPath = localStorage.getItem("profilePath");
    if (
      storedPath &&
      storedPath.toLowerCase() === location.pathname.toLowerCase()
    ) {
      navigate(`/@${user.username}`, { replace: true });
    }
  }, [isAuthenticated, user, routeUsername, location.pathname, navigate]);

  React.useEffect(() => {
    if (!routeUsername || routeUsername === signedInUsername) {
      setPublicUser(null);
      setProfileError("");
      setIsFollowing(false);
      setFollowError("");
      return undefined;
    }

    let cancelled = false;
    setProfileLoading(true);
    setProfileError("");

    getProfileByUsername(routeUsername)
      .then((data) => {
        if (!cancelled) setPublicUser(data.user);
      })
      .catch((error) => {
        if (!cancelled) {
          setPublicUser(null);
          setProfileError(error.message || "Profile not found");
        }
      })
      .finally(() => {
        if (!cancelled) setProfileLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [routeUsername, signedInUsername]);

  React.useEffect(() => {
    if (!token || !routeUsername || routeUsername === signedInUsername) {
      setIsFollowing(false);
      return undefined;
    }

    let cancelled = false;
    getFollowStatus(token, routeUsername)
      .then((data) => {
        if (!cancelled) setIsFollowing(Boolean(data.isFollowing));
      })
      .catch(() => {
        if (!cancelled) setIsFollowing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, routeUsername, signedInUsername]);

  React.useEffect(() => {
    const node = activityWrapRef.current;
    if (!node) return undefined;

    let animationFrame = 0;
    const updateWidth = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const nextWidth = Math.round(node.getBoundingClientRect().width);
        setActivityWidth((currentWidth) =>
          currentWidth === nextWidth ? currentWidth : nextWidth,
        );
      });
    };
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  if (loading || profileLoading) {
    return (
      <main className="profile-page">
        <section className="profile-empty-state">
          <h1>Loading profile...</h1>
        </section>
      </main>
    );
  }

  if (profileError || !profileUser) {
    return (
      <main className="profile-page">
        <section className="profile-empty-state">
          <h1>Profile not found</h1>
          <p>{profileError || "This user does not exist or is not active."}</p>
          <Link to="/">Go home</Link>
        </section>
      </main>
    );
  }

  const handleToggleFollow = async () => {
    if (!token || !routeUsername || isOwnProfile || followSaving) return;

    const nextState = !isFollowing;
    setFollowSaving(true);
    setFollowError("");
    try {
      const data = await setFollowStatus(token, routeUsername, nextState);
      setIsFollowing(Boolean(data.isFollowing));
      if (data.targetUser) {
        setPublicUser(data.targetUser);
      }
    } catch (error) {
      setFollowError(error.message || "Could not update follow status");
    } finally {
      setFollowSaving(false);
    }
  };

  if (certificateSlug) {
    return (
      <main className="profile-page profile-certificate-page">
        <div className="profile-certificate-page-head">
          <div>
            <span>Certificate</span>
            <h1>
              {routeCertificate
                ? routeCertificate.courseName
                : "Certificate not found"}
            </h1>
          </div>
          <Link to={certificateOwnerPath}>Back to profile</Link>
        </div>

        {routeCertificate ? (
          <CourseCertificate
            courseName={routeCertificate.courseName}
            totalLessons={routeCertificate.lessons.length}
            completedCount={routeCertificate.completedCount}
            earnedXP={routeCertificate.earnedXP}
            totalXP={routeCertificate.totalXP}
            recipient={profileUser}
          />
        ) : (
          <section className="profile-empty-state">
            <h1>Certificate not available</h1>
            <p>
              This course certificate does not exist yet, or the course is not
              completed.
            </p>
            <Link to={certificateOwnerPath}>View completed courses</Link>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="profile-page">
      <ProfileHero
        user={profileUser}
        isAuthenticated={isAuthenticated}
        canEdit={isAuthenticated && isOwnProfile}
        totalStreak={totalStreak}
        editOpen={editOpen}
        onToggleEdit={() => setEditOpen((open) => !open)}
        isFollowing={isFollowing}
        followSaving={followSaving}
        onToggleFollow={handleToggleFollow}
      />

      {followError && (
        <section className="profile-empty-state profile-follow-error">
          <p>{followError}</p>
        </section>
      )}

      {isOwnProfile && (
        <ProfileEditSection
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}

      <section className="profile-overview-grid">
        <div>
          <span>Total Lessons</span>
          <strong>
            {totalCompleted}/{totalLessons}
          </strong>
        </div>
        <div>
          <span>OOPs Bookmarks</span>
          <strong>{oops.bookmarks.length}</strong>
        </div>
        <div>
          <span>Pointers Bookmarks</span>
          <strong>{pointers.bookmarks.length}</strong>
        </div>
        <div>
          <span>Total Progress</span>
          <strong>{totalPct}%</strong>
        </div>
      </section>

      <div ref={activityWrapRef}>
        <ActivityGraph days={activityDays} />
      </div>

      <div className="profile-track-grid">
        <TrackProgressCard
          title="OOPs C++"
          subtitle={oops.syncState === "synced" ? "Synced track" : "Learning track"}
          lessons={ALL_LESSONS}
          totalXP={TOTAL_XP}
          progress={oops.completedMap}
          bookmarks={oops.bookmarks}
          href="/learn/oops-cpp"
          accent="#ffe566"
          streak={oops.remoteProgress?.currentStreak || 0}
        />
        <TrackProgressCard
          title="Pointers C++"
          subtitle="Memory track"
          lessons={POINTER_LESSONS}
          totalXP={POINTER_TOTAL_XP}
          progress={pointers.completedMap}
          bookmarks={pointers.bookmarks}
          href="/learn/pointers-cpp"
          accent="#00d4ff"
        />
        <TrackProgressCard
          title="NumPy · py"
          subtitle="Python data track"
          lessons={NUMPY_LESSONS}
          totalXP={NUMPY_TOTAL_XP}
          progress={numpy.completedMap}
          bookmarks={numpy.bookmarks}
          href="/learn/numpy-py"
          accent="#4dabcf"
        />
        <TrackProgressCard
          title="Pandas · py"
          subtitle="Python data track"
          lessons={PANDAS_LESSONS}
          totalXP={PANDAS_TOTAL_XP}
          progress={pandas.completedMap}
          bookmarks={pandas.bookmarks}
          href="/learn/pandas-py"
          accent="#059669"
        />
      </div>

      {completedCertificates.length > 0 && (
        <section className="profile-certificates-section">
          <div className="profile-section-heading">
            <span>Certificates</span>
            <h2>Completed courses</h2>
          </div>
          <div className="profile-certificates-list">
            {completedCertificates.map((certificate) => (
              <article
                key={certificate.courseName}
                className="profile-certificate-card"
              >
                <div>
                  <span>Course completed</span>
                  <h3>{certificate.courseName}</h3>
                  <p>
                    {certificate.completedCount}/{certificate.lessons.length} lessons
                    completed · {certificate.earnedXP}/{certificate.totalXP} XP earned
                  </p>
                </div>
                <Link
                  to={`${certificateOwnerPath}/certificates/${certificate.slug}`}
                  className="profile-certificate-link"
                >
                  View certificate
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

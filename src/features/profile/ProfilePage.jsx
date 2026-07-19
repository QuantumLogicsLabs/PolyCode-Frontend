import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { rememberSignedInUser } from "../../lib/authSession";
import ProfileEditSection from "./components/ProfileEditSection";
import ProfileHero from "./components/ProfileHero";
import LearnerStatsRow from "./components/LearnerStatsRow";
import AllCoursesList from "./components/AllCoursesList";
import DailyXpProgressSection from "./components/DailyXpProgressSection";
import useDailyXpProgress from "./hooks/useDailyXpProgress";
import useLearnDashboard from "./hooks/useLearnDashboard";
import { ALL_LESSONS } from "../learn/oops-cpp/data/oopsCurriculum";
import useOopsProgress from "../learn/oops-cpp/hooks/useOopsProgress";
import { POINTER_LESSONS } from "../learn/pointers-cpp/data/pointersCurriculum";
import usePointersProgress from "../learn/pointers-cpp/hooks/usePointersProgress";
import { NUMPY_LESSONS } from "../learn/numpy-py/data/numpyCurriculum";
import useNumpyProgress from "../learn/numpy-py/hooks/useNumpyProgress";
import { PANDAS_LESSONS } from "../learn/pandas-py/data/pandasCurriculum";
import usePandasProgress from "../learn/pandas-py/hooks/usePandasProgress";
import { FASTAPI_LESSONS } from "../learn/fastapi-py/data/fastapiCurriculum";
import useFastapiProgress from "../learn/fastapi-py/hooks/useFastapiProgress";
import { PYTORCH_LESSONS } from "../learn/pytorch-py/data/pytorchCurriculum";
import usePytorchProgress from "../learn/pytorch-py/hooks/usePytorchProgress";
import CourseCertificate from "../learn/shared/CourseCertificate";
import useProfileLearnProgress from "./hooks/useProfileLearnProgress";
import {
  PROFILE_FEATURED_TRACKS,
  slugifyCourseName,
} from "./profileCourseCatalog";
import {
  getFollowStatus,
  getProfileConnections,
  getProfileByUsername,
  setFollowStatus,
} from "./services/profileApi";
import {
  ActivityBarChart,
  ActivityLineChart,
} from "./components/ActivityCharts";

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_ACTIVITY_DAYS = 30;

function getResponsiveActivityDays(width = 0) {
  if (width < 560) return 30;
  if (width < 860) return 60;
  const columns = Math.max(9, Math.floor((width - 4) / 17));
  return Math.min(365, Math.max(MIN_ACTIVITY_DAYS, columns * 7));
}

function buildActivityDaysFromDailyXp(dayCount, dailyXpDays = []) {
  const counts = new Map();
  dailyXpDays.forEach((day) => {
    if (!day?.date) return;
    const lessons = Number(day.lessonsCompleted) || 0;
    if (lessons > 0) counts.set(day.date, lessons);
  });
  return buildActivityDaysFromCounts(dayCount, counts);
}

function buildActivityDaysFromCounts(dayCount, counts = new Map()) {
  // Anchor to UTC days: the backend keys xp events by UTC date, so the
  // grid keys must be UTC too or completions never match in UTC+ timezones.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(today.getTime() - (dayCount - 1) * DAY_MS);

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
        timeZone: "UTC",
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

      <div className="profile-activity-charts">
        <ActivityLineChart days={days} />
        <ActivityBarChart days={days} />
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
  if (completedCount < track.lessons.length || track.lessons.length === 0) {
    return null;
  }

  const earnedXP = track.lessons
    .filter((lesson) => track.progress[lesson.id])
    .reduce((sum, lesson) => sum + lesson.xp, 0);

  return {
    ...track,
    slug: slugifyCourseName(track.courseName),
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
  const dailyXp = useDailyXpProgress({ enabled: isOwnProfile && Boolean(token) });
  const oops = useOopsProgress();
  const pointers = usePointersProgress();
  const numpy = useNumpyProgress();
  const pandas = usePandasProgress();
  const fastapi = useFastapiProgress();
  const pytorch = usePytorchProgress();
  const remoteLearn = useProfileLearnProgress({
    enabled: Boolean(profileUser?.username || isOwnProfile),
    isOwnProfile,
    username: routeUsername || profileUser?.username || "",
    token,
  });
  const learnDashboard = useLearnDashboard({
    enabled: Boolean(profileUser?.username || isOwnProfile),
    isOwnProfile,
    username: routeUsername || profileUser?.username || "",
    token,
  });

  const trackMaps = {
    "oops-cpp":
      remoteLearn.byCourseId["oops-cpp"]?.completedMap || oops.completedMap,
    "pointers-cpp":
      remoteLearn.byCourseId["pointers-cpp"]?.completedMap ||
      pointers.completedMap,
    "numpy-py":
      remoteLearn.byCourseId["numpy-py"]?.completedMap || numpy.completedMap,
    "pandas-py":
      remoteLearn.byCourseId["pandas-py"]?.completedMap || pandas.completedMap,
    "fastapi-py":
      remoteLearn.byCourseId["fastapi-py"]?.completedMap || fastapi.completedMap,
    "pytorch-py":
      remoteLearn.byCourseId["pytorch-py"]?.completedMap || pytorch.completedMap,
  };
  const trackBookmarks = {
    "oops-cpp":
      remoteLearn.byCourseId["oops-cpp"]?.bookmarks || oops.bookmarks,
    "pointers-cpp":
      remoteLearn.byCourseId["pointers-cpp"]?.bookmarks || pointers.bookmarks,
    "numpy-py":
      remoteLearn.byCourseId["numpy-py"]?.bookmarks || numpy.bookmarks,
    "pandas-py":
      remoteLearn.byCourseId["pandas-py"]?.bookmarks || pandas.bookmarks,
    "fastapi-py":
      remoteLearn.byCourseId["fastapi-py"]?.bookmarks || fastapi.bookmarks,
    "pytorch-py":
      remoteLearn.byCourseId["pytorch-py"]?.bookmarks || pytorch.bookmarks,
  };

  const totalCompleted = Object.values(trackMaps).reduce(
    (sum, map) => sum + Object.keys(map || {}).length,
    0,
  );
  const totalLessons =
    ALL_LESSONS.length +
    POINTER_LESSONS.length +
    NUMPY_LESSONS.length +
    PANDAS_LESSONS.length +
    FASTAPI_LESSONS.length +
    PYTORCH_LESSONS.length;
  const totalPct = Math.round((totalCompleted / totalLessons) * 100) || 0;
  const totalStreak = Math.max(
    learnDashboard.overview?.activeStreak || 0,
    learnDashboard.overview?.bestStreak || 0,
    remoteLearn.byCourseId["oops-cpp"]?.currentStreak || 0,
    oops.remoteProgress?.currentStreak || 0,
    0,
  );
  const [activityWidth, setActivityWidth] = React.useState(0);
  const activityWrapRef = React.useRef(null);
  const activityDayCount = getResponsiveActivityDays(activityWidth);
  const activityDays = React.useMemo(() => {
    if (isOwnProfile && isAuthenticated) {
      return buildActivityDaysFromDailyXp(
        activityDayCount,
        dailyXp.data?.days || [],
      );
    }
    return buildActivityDaysFromCounts(activityDayCount);
  }, [
    activityDayCount,
    dailyXp.data,
    isAuthenticated,
    isOwnProfile,
  ]);
  const completedCertificates = PROFILE_FEATURED_TRACKS.map((track) =>
    getCompletedTrackCertificate({
      courseName: track.courseName,
      lessons: track.lessons,
      totalXP: track.totalXP,
      progress: trackMaps[track.courseId] || {},
    }),
  ).filter(Boolean);
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
  }, [isOwnProfile]);

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

  const loadProfileConnections = (type) =>
    getProfileConnections(profileUser?.username || routeUsername, type);

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
        totalCompleted={totalCompleted}
        totalLessons={totalLessons}
        totalPct={totalPct}
        editOpen={editOpen}
        onToggleEdit={() => setEditOpen((open) => !open)}
        isFollowing={isFollowing}
        followSaving={followSaving}
        onToggleFollow={handleToggleFollow}
        onLoadConnections={loadProfileConnections}
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

      <LearnerStatsRow
        overview={learnDashboard.overview}
        showEngagement={isOwnProfile}
        featuredCompleted={totalCompleted}
        featuredTotal={totalLessons}
        featuredPct={totalPct}
      />

      <AllCoursesList
        courses={learnDashboard.courses}
        showEngagement={isOwnProfile}
      />

      {isOwnProfile ? (
        <DailyXpProgressSection
          data={dailyXp.data}
          loading={dailyXp.loading}
          error={dailyXp.error}
          markingDate={dailyXp.markingDate}
          onRefresh={dailyXp.refresh}
          onMarkRead={dailyXp.markRead}
        />
      ) : null}

      {isOwnProfile ? (
        <div ref={activityWrapRef}>
          <ActivityGraph days={activityDays} />
        </div>
      ) : null}

      <div className="profile-track-grid">
        {PROFILE_FEATURED_TRACKS.map((track) => (
          <TrackProgressCard
            key={track.courseId}
            title={track.hubTitle || track.courseName}
            subtitle={
              track.courseId === "oops-cpp" && oops.syncState === "synced"
                ? "Synced track"
                : track.subtitle
            }
            lessons={track.lessons}
            totalXP={track.totalXP}
            progress={trackMaps[track.courseId] || {}}
            bookmarks={trackBookmarks[track.courseId] || []}
            href={track.href}
            accent={track.accent}
            streak={
              remoteLearn.byCourseId[track.courseId]?.currentStreak ||
              (track.courseId === "oops-cpp"
                ? oops.remoteProgress?.currentStreak || 0
                : 0)
            }
          />
        ))}
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

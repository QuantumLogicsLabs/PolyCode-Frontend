import { useCallback, useEffect, useState } from "react";

const AUTO_DISMISS_MS = 3800;

export function useChallengeCelebration(challengeId) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setShowCelebration(false);
  }, [challengeId]);

  useEffect(() => {
    if (!showCelebration) return undefined;
    const timer = window.setTimeout(() => setShowCelebration(false), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [showCelebration]);

  const triggerCelebration = useCallback(() => {
    setShowCelebration(true);
  }, []);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return { showCelebration, triggerCelebration, dismissCelebration };
}

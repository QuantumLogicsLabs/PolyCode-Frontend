import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./challenge-complete.css";

export default function ChallengeCompleteCelebration({
  show,
  title = "Challenge complete!",
  message = "Go ahead!",
  onDismiss,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="challenge-complete-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onDismiss}
          role="presentation"
        >
          <motion.div
            className="challenge-complete-card"
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
            role="status"
            aria-live="polite"
          >
            <div className="challenge-complete-icon" aria-hidden="true">
              <motion.svg
                viewBox="0 0 72 72"
                className="challenge-complete-svg"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <motion.circle
                  cx="36"
                  cy="36"
                  r="32"
                  className="challenge-complete-circle"
                  fill="none"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
                <motion.path
                  d="M22 37 L32 47 L50 27"
                  className="challenge-complete-check"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                />
              </motion.svg>
              <motion.span
                className="challenge-complete-spark"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.85] }}
                transition={{ delay: 0.55, duration: 0.45 }}
              />
            </div>

            <motion.h3
              className="challenge-complete-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="challenge-complete-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.35 }}
            >
              {message}
            </motion.p>

            <motion.button
              type="button"
              className="challenge-complete-btn"
              onClick={onDismiss}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.3 }}
            >
              Go ahead
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

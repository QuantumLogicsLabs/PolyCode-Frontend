import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="landing-hero" id="top">
      <div className="landing-hero-glow" />

      <div className="landing-container landing-hero-grid">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="landing-eyebrow">
            <Sparkles size={14} aria-hidden />
            AI-Powered Learning Ecosystem
          </p>
          <h1>
            Learn Programming Faster
            <span className="landing-hero-shimmer">with AI Guidance</span>
          </h1>
          <p className="landing-hero-lead">
            Structured programming courses, interactive exercises, real-time AI
            mentoring, and built-in security analysis in one platform.
          </p>
          <div className="landing-hero-actions">
            <Link to="/login" className="landing-btn-primary">
              Get Started
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="landing-hero-image-wrap"
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="landing-hero-image" />
          <motion.div
            className="landing-hero-image"
            animate={reduceMotion ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/polycode-hero.png"
              alt="PolyCode platform — Learn, Code, Secure with PolyMentor, courses, and PolyGuard"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

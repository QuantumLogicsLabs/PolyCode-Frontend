import React, { useState, useRef, useEffect } from 'react';
import DocCard from './DocCard';

const LazyDocCard = ({ doc, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Small delay to ensure smooth loading
          setTimeout(() => setHasLoaded(true), 100);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Start loading a bit earlier
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return (
      <div ref={cardRef} className="lazy-doc-card-placeholder">
        <div className="skeleton-doc-card">
          <div className="skeleton skeleton-header" />
          <div className="skeleton skeleton-text short" />
          <div className="skeleton skeleton-text medium" />
          <div className="skeleton skeleton-tags" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      style={{
        opacity: hasLoaded ? 1 : 0,
        transform: hasLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
    >
      <DocCard doc={doc} {...props} />
    </div>
  );
};

export default LazyDocCard;

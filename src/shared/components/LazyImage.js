import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, placeholder = null, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`lazy-image-error ${className || ''}`} {...props}>
        <span style={{ fontSize: '2rem' }}>💻</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`lazy-image-wrapper ${className || ''}`} {...props}>
      {!isLoaded && (
        <div className="lazy-image-placeholder">
          {placeholder || <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;

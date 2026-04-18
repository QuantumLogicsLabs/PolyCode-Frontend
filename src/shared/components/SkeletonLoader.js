import React from 'react';
import './SkeletonLoader.css';

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-icon" />
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-text" />
  </div>
);

export const SkeletonDocCard = () => (
  <div className="skeleton-doc-card">
    <div className="skeleton skeleton-header" />
    <div className="skeleton skeleton-text short" />
    <div className="skeleton skeleton-text medium" />
    <div className="skeleton skeleton-tags" />
  </div>
);

export const SkeletonGrid = ({ count = 6, type = 'card' }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      type === 'card' ? <SkeletonCard key={i} /> : <SkeletonDocCard key={i} />
    ))}
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="skeleton-list">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-list-item">
        <div className="skeleton skeleton-icon small" />
        <div className="skeleton skeleton-text" />
      </div>
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton skeleton-hero" />
    <div className="skeleton-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonDocCard key={i} />
      ))}
    </div>
  </div>
);

export default {
  SkeletonCard,
  SkeletonDocCard,
  SkeletonGrid,
  SkeletonList,
  PageSkeleton
};

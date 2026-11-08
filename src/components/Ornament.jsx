import React from 'react';
import logoImg from '../assets/images/logo.jpg';

export const BotanicalDivider = ({ className = "" }) => (
  <div className={`ornament-divider ${className}`} aria-hidden="true">
    <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12H70" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
      <path d="M110 12H180" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
      <path d="M90 6L93.5 12L90 18L86.5 12L90 6Z" fill="currentColor" fillOpacity="0.8" />
      <path d="M78 12C81 10 83 9 86 11C83 12 81 13 78 12Z" fill="currentColor" fillOpacity="0.6" />
      <path d="M102 12C99 10 97 9 94 11C97 12 99 13 102 12Z" fill="currentColor" fillOpacity="0.6" />
      <circle cx="73" cy="12" r="1.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="107" cy="12" r="1.5" fill="currentColor" fillOpacity="0.7" />
    </svg>
  </div>
);

export const CornerFlourish = ({ position = "top-left" }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className={`corner-ornament corner-${position}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 46V12C2 6.47715 6.47715 2 12 2H46" stroke="#B39A70" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M6 46V14C6 9.58172 9.58172 6 14 6H46" stroke="#B39A70" strokeWidth="0.5" strokeOpacity="0.35" />
        <circle cx="12" cy="12" r="2.5" fill="#B39A70" fillOpacity="0.5" />
      </svg>
    </div>
  );
};

export const MonogramEmblem = ({ size = 96, className = "" }) => (
  <div className={`monogram-emblem-wrapper ${className}`} style={{ width: size, height: size }}>
    <div className="monogram-emblem-ring">
      <img
        src={logoImg}
        alt="Sahana & Kevin Monogram Logo"
        className="monogram-logo-image"
      />
    </div>
  </div>
);

export const WaxSeal = ({ onClick, label = "Click to open invitation" }) => (
  <button
    type="button"
    className="wax-seal-btn"
    onClick={onClick}
    title={label}
    aria-label="Open Invitation"
  >
    <div className="wax-seal-outer">
      <div className="wax-seal-logo-holder">
        <img
          src={logoImg}
          alt="Sahana & Kevin Wax Seal"
          className="wax-seal-image"
        />
      </div>
      <div className="wax-seal-ripple"></div>
    </div>
  </button>
);

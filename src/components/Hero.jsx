import React from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider, CornerFlourish, WaxSeal } from './Ornament';
import { ChevronDown, MailOpen } from 'lucide-react';

export default function Hero({ onOpenInvitation, isOpened }) {
  const { couple, event } = EVENT_DETAILS;

  const handleOpenClick = () => {
    if (!isOpened) {
      // Subtle, elegant gold confetti burst
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#B39A70', '#E8DFD0', '#D4AF37', '#F8F6F0'],
          ticks: 200,
          gravity: 0.8,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
      } catch {
        // safe fallback if canvas not available
      }

      if (onOpenInvitation) {
        onOpenInvitation();
      }
    } else {
      // Already opened: smoothly glide to the invitation content
      const targetElement = document.getElementById('invitation-message');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className={`hero-section ${isOpened ? 'hero-opened' : ''}`} id="hero">
      <div className="hero-card-container">
        {/* Luxury envelope / stationery card */}
        <div className="invitation-card hero-card">
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          <div className="hero-card-inner">
            {/* Top Tagline */}
            <p className="hero-subtitle tracking-widest">{event.subtitle}</p>

            <h2 className="hero-event-type">{event.type}</h2>

            <BotanicalDivider className="my-3" />

            {/* Couple Names */}
            <div className="couple-names-wrapper">
              <h1 className="couple-names font-script">{couple.names}</h1>
            </div>

            <BotanicalDivider className="my-3" />

            {/* Date and Time */}
            <div className="hero-datetime">
              <p className="hero-date">{event.fullDate}</p>
              <div className="hero-time-divider">
                <span className="dot-sep">•</span>
                <span className="hero-time">{event.time}</span>
                <span className="dot-sep">•</span>
              </div>
            </div>

            {/* Wax Seal & Open Button - Stable Container (no popping or height shift) */}
            <div className="hero-action-container">
              <div className={`wax-seal-wrapper ${isOpened ? 'seal-unlocked' : ''}`}>
                <WaxSeal onClick={handleOpenClick} label={isOpened ? "Scroll to invitation" : "Open Invitation"} />
              </div>

              <button
                type="button"
                onClick={handleOpenClick}
                className={`btn-luxury-primary open-invitation-btn ${isOpened ? 'btn-opened' : ''}`}
                aria-label={isOpened ? "View Invitation" : "Open Invitation"}
              >
                {isOpened ? (
                  <>
                    <span>VIEW INVITATION</span>
                    <ChevronDown size={17} className="btn-icon scroll-arrow-icon" />
                  </>
                ) : (
                  <>
                    <MailOpen size={17} className="btn-icon" />
                    <span>OPEN INVITATION</span>
                  </>
                )}
              </button>

              <p className="open-invitation-hint">
                {isOpened ? "Invitation opened • Scroll down or tap to view" : "Tap wax seal or button to open"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

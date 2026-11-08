import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider } from './Ornament';
import { Sparkles, Heart } from 'lucide-react';

export default function Countdown() {
  const { event, couple } = EVENT_DETAILS;

  const calculateTimeLeft = () => {
    // 6 December 2026 6:00 PM IST (UTC+05:30)
    const target = new Date(event.targetDateTimeISO).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return {
        isCelebrationTime: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      isCelebrationTime: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [event.targetDateTimeISO]);

  return (
    <section className="countdown-section section-padding" id="countdown">
      <div className="container max-w-readable">
        <div className="section-header text-center">
          <p className="section-eyebrow">COUNTING DOWN THE MOMENTS</p>
          <h2 className="section-title">Until We Celebrate</h2>
          <BotanicalDivider className="my-3" />
        </div>

        {timeLeft.isCelebrationTime ? (
          <div className="celebration-started-box">
            <Sparkles className="celebration-icon" size={32} />
            <h3 className="celebration-started-title">The Celebration Has Begun!</h3>
            <p className="celebration-started-text">
              Welcome Sahana & Kevin's guests. We are rejoicing with all of you today!
            </p>
            <div className="celebration-heart-wrapper">
              <Heart size={20} className="heart-icon-fill" />
            </div>
          </div>
        ) : (
          <div className="countdown-grid" role="timer" aria-live="polite">
            {/* Days */}
            <div className="countdown-card">
              <div className="countdown-digit-container">
                <span className="countdown-digit font-serif">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="countdown-unit">DAYS</span>
            </div>

            {/* Hours */}
            <div className="countdown-card">
              <div className="countdown-digit-container">
                <span className="countdown-digit font-serif">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="countdown-unit">HOURS</span>
            </div>

            {/* Minutes */}
            <div className="countdown-card">
              <div className="countdown-digit-container">
                <span className="countdown-digit font-serif">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="countdown-unit">MINUTES</span>
            </div>

            {/* Seconds */}
            <div className="countdown-card">
              <div className="countdown-digit-container">
                <span className="countdown-digit font-serif">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="countdown-unit">SECONDS</span>
            </div>
          </div>
        )}

        <div className="countdown-subtext text-center">
          <p>
            Sunday, 6 December 2026 • 6:00 PM IST
          </p>
        </div>
      </div>
    </section>
  );
}


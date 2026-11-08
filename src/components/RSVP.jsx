import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider } from './Ornament';
import { CheckCircle2, XCircle, Heart, User, MessageSquare, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'kevin_sahana_rsvp_response';

export default function RSVP() {
  const { rsvp } = EVENT_DETAILS;

  const [guestName, setGuestName] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(null); // 'accepted' | 'declined' | null
  const [errorMessage, setErrorMessage] = useState('');

  // Load prior response from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.status) {
          setSubmittedStatus(parsed.status);
          setGuestName(parsed.guestName || '');
          setPersonalNote(parsed.personalNote || '');
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDecision = (status) => {
    if (!guestName.trim()) {
      setErrorMessage('Please enter your name before responding.');
      return;
    }

    setErrorMessage('');
    const submissionData = {
      guestName: guestName.trim(),
      personalNote: personalNote.trim(),
      status, // 'accepted' or 'declined'
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissionData));
    } catch {
      // ignore
    }

    setSubmittedStatus(status);

    if (status === 'accepted') {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#B39A70', '#E8DFD0', '#D4AF37'],
          scalar: 0.9,
          disableForReducedMotion: true,
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSubmittedStatus(null);
    setErrorMessage('');
  };

  return (
    <section className="rsvp-section section-padding" id="rsvp">
      <div className="container max-w-readable">
        <div className="section-header text-center">
          <p className="section-eyebrow">RSVP</p>
          <h2 className="section-title">{rsvp.heading}</h2>
          <BotanicalDivider className="my-3" />
        </div>

        <div className="rsvp-card">
          {submittedStatus ? (
            /* Elegant Confirmation State */
            <div className="rsvp-confirmation-view text-center">
              {submittedStatus === 'accepted' ? (
                <div className="confirmation-content accepted-content">
                  <div className="confirmation-icon-wrapper">
                    <CheckCircle2 size={44} className="icon-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="confirmation-title">Thank You, {guestName}!</h3>
                  <p className="confirmation-subtitle">
                    We have joyfully recorded your RSVP!
                  </p>
                  <p className="confirmation-message">
                    We truly cannot wait to celebrate this special pre-wedding evening together with you.
                  </p>
                  <div className="confirmation-heart">
                    <Heart size={20} className="heart-icon-fill" />
                  </div>
                </div>
              ) : (
                <div className="confirmation-content declined-content">
                  <div className="confirmation-icon-wrapper">
                    <XCircle size={44} className="icon-soft" strokeWidth={1.5} />
                  </div>
                  <h3 className="confirmation-title">Thank You, {guestName}</h3>
                  <p className="confirmation-subtitle">
                    We are sorry you won't be able to join us in person, but your warm wishes mean the world to us.
                  </p>
                  <p className="confirmation-message">
                    You will be warmly in our hearts during the celebration!
                  </p>
                </div>
              )}

              <div className="reset-rsvp-wrapper">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-text-link"
                >
                  <RotateCcw size={14} className="btn-icon" />
                  <span>Update your response</span>
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form State */
            <form onSubmit={(e) => e.preventDefault()} className="rsvp-form" noValidate>
              <p className="rsvp-instructions text-center">
                Kindly let us know if you will be celebrating with us.
              </p>

              {errorMessage && (
                <div className="rsvp-alert-error" role="alert">
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Name */}
              <div className="form-group">
                <label htmlFor="guest-name" className="form-label">
                  <User size={15} className="label-icon" />
                  <span>Guest Name <span className="required-star">*</span></span>
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="form-input"
                />
              </div>

              {/* Optional warm message */}
              <div className="form-group">
                <label htmlFor="personal-note" className="form-label">
                  <MessageSquare size={15} className="label-icon" />
                  <span>Warm Wishes or Note <span className="label-optional">(optional)</span></span>
                </label>
                <textarea
                  id="personal-note"
                  rows="2"
                  placeholder="Leave a sweet note or message for the couple..."
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Accept or Reject Buttons */}
              <div className="rsvp-action-buttons">
                <button
                  type="button"
                  onClick={() => handleDecision('accepted')}
                  className="btn-luxury-primary btn-rsvp-accept"
                >
                  <CheckCircle2 size={17} className="btn-icon" />
                  <span>{rsvp.acceptText}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('declined')}
                  className="btn-luxury-secondary btn-rsvp-decline"
                >
                  <XCircle size={17} className="btn-icon" />
                  <span>{rsvp.declineText}</span>
                </button>
              </div>

              <p className="rsvp-footnote text-center">
                Responses are saved locally and ready for live cloud integration.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

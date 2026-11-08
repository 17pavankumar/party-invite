import React, { useState } from 'react';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import EventDetails from './components/EventDetails';
import Location from './components/Location';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import { Share2, Check } from 'lucide-react';
import './App.css';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);

    // Gently scroll to the invitation content
    setTimeout(() => {
      const targetElement = document.getElementById('invitation-message');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Sahana & Kevin — Pre-Wedding Celebration',
      text: 'You are warmly invited to join Sahana & Kevin for their intimate Pre-Wedding Celebration on Sunday, 6 December 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to copying url
        copyUrl();
      }
    } else {
      copyUrl();
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className={`app-wrapper ${isOpened ? 'invitation-unveiled' : 'invitation-sealed'}`}>
      {/* Floating subtle ambient particles */}
      <ParticlesBackground />

      {/* Floating Share Control */}
      <header className="floating-action-bar" aria-label="Quick Actions">
        <button
          type="button"
          onClick={handleShare}
          className="floating-pill-btn share-btn"
          aria-label="Share invitation"
          title="Share invitation"
        >
          {copiedShare ? (
            <>
              <Check size={14} className="text-success" />
              <span className="pill-text">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              <span className="pill-text">Share</span>
            </>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <Hero onOpenInvitation={handleOpenInvitation} isOpened={isOpened} />

      {/* Revealed Invitation Sections */}
      <main
        className={`revealed-content ${isOpened ? 'content-visible' : 'content-hidden'}`}
        aria-hidden={!isOpened}
      >
        <Invitation />
        <EventDetails />
        <Location />
        <Countdown />
        <Footer />
      </main>
    </div>
  );
}

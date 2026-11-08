import React from 'react';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider, MonogramEmblem } from './Ornament';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { footer, couple } = EVENT_DETAILS;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container max-w-readable text-center">
        <div className="footer-monogram">
          <MonogramEmblem size={90} />
        </div>

        <p className="footer-tagline">{footer.tagline}</p>

        <h2 className="footer-names font-script">{footer.names}</h2>

        <BotanicalDivider className="my-4" />

        <p className="footer-subtext">{footer.subtext}</p>

        <p className="footer-date">{footer.date}</p>

        <div className="back-to-top-wrapper">
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-back-to-top"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>

        <div className="footer-credits">
          <p>An Intimate Pre-Wedding Digital Invitation</p>
        </div>
      </div>
    </footer>
  );
}


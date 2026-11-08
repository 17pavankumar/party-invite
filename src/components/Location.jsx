import React, { useState } from 'react';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider } from './Ornament';
import { Navigation, Copy, Check, ExternalLink, MapPin } from 'lucide-react';

export default function Location() {
  const { venue } = EVENT_DETAILS;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="location-section section-padding" id="location">
      <div className="container max-w-readable">
        <div className="section-header text-center">
          <p className="section-eyebrow">LOCATION & DIRECTIONS</p>
          <h2 className="section-title">Grand Seasons Business Hotel</h2>
          <BotanicalDivider className="my-3" />
        </div>

        <div className="location-card">
          <div className="location-info">
            <div className="location-badge">
              <MapPin size={16} className="badge-icon" />
              <span>Bengaluru, Karnataka</span>
            </div>

            <p className="location-hotel-name">{venue.name}</p>

            <address className="location-full-address">
              {venue.addressLines.map((line, idx) => (
                <span key={idx} className="block-address-line">{line} </span>
              ))}
            </address>

            <div className="location-button-group">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary"
                aria-label="Get Directions to Grand Seasons Business Hotel"
              >
                <Navigation size={17} className="btn-icon" />
                <span>GET DIRECTIONS</span>
                <ExternalLink size={14} className="ml-1 opacity-70" />
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="btn-luxury-secondary copy-btn"
                aria-label="Copy Address to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={16} className="btn-icon text-success" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="btn-icon" />
                    <span>COPY ADDRESS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Embedded Google Map Frame with clean luxury styling */}
          <div className="map-frame-wrapper">
            <div className="map-frame-decor">
              <iframe
                title="Grand Seasons Business Hotel Location Map"
                src={venue.embedMapUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="google-map-iframe"
              />
            </div>
            <div className="map-footer-hint">
              <span>Interactive Google Map • Tap to explore area</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


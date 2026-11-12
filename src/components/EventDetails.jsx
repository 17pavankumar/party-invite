import React from 'react';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider } from './Ornament';
import { Calendar, Clock, MapPin, CalendarPlus, Sparkles } from 'lucide-react';

export default function EventDetails() {
  const { event, venue, calendar, dressCode } = EVENT_DETAILS;

  const downloadICS = () => {
    // Generate clean .ics file for iOS/macOS/Outlook
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sahana & Kevin//Pre-Wedding Celebration//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Pre-Wedding Celebration of Sahana & Kevin',
      'DESCRIPTION:An intimate pre-wedding celebration for close friends and family. Dress code: ' + (dressCode ? dressCode.primary : 'Semi-Formals / Formals / Indian Formals'),
      'LOCATION:' + venue.fullAddress,
      'DTSTART:20261206T123000Z', // 6:00 PM IST is 12:30 PM UTC
      'DTEND:20261206T163000Z',   // 10:00 PM IST is 4:30 PM UTC
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sahana_Kevin_PreWedding_Celebration.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="event-details-section section-padding" id="event-details">
      <div className="container max-w-readable">
        <div className="section-header text-center">
          <p className="section-eyebrow">THE DETAILS</p>
          <h2 className="section-title">{event.type}</h2>
          <BotanicalDivider className="my-3" />
        </div>

        <div className="details-cards-grid">
          {/* Card 1: Date */}
          <div className="detail-card">
            <div className="detail-icon-wrapper">
              <Calendar className="detail-icon" size={22} strokeWidth={1.5} />
            </div>
            <div className="detail-content">
              <span className="detail-label">DATE</span>
              <p className="detail-primary-text">{event.day}</p>
              <p className="detail-secondary-text">{event.date}</p>
            </div>
          </div>

          {/* Card 2: Time */}
          <div className="detail-card">
            <div className="detail-icon-wrapper">
              <Clock className="detail-icon" size={22} strokeWidth={1.5} />
            </div>
            <div className="detail-content">
              <span className="detail-label">TIME</span>
              <p className="detail-primary-text">{event.time}</p>
              <p className="detail-secondary-text">Indian Standard Time (IST)</p>
            </div>
          </div>

          {/* Card 3: Dress Code */}
          {dressCode && (
            <div className="detail-card detail-card-wide dress-code-card">
              <div className="detail-icon-wrapper">
                <Sparkles className="detail-icon" size={22} strokeWidth={1.5} />
              </div>
              <div className="detail-content">
                <span className="detail-label">{dressCode.label}</span>
                <p className="detail-primary-text dress-code-title">
                  {dressCode.primary}
                </p>
                <p className="detail-secondary-text dress-code-desc">
                  {dressCode.description}
                </p>
              </div>
            </div>
          )}

          {/* Card 4: Venue & Address */}
          <div className="detail-card detail-card-wide">
            <div className="detail-icon-wrapper">
              <MapPin className="detail-icon" size={22} strokeWidth={1.5} />
            </div>
            <div className="detail-content">
              <span className="detail-label">VENUE</span>
              <h3 className="detail-primary-text venue-name">{venue.name}</h3>
              <div className="address-container">
                <span className="detail-label-sub">ADDRESS</span>
                <address className="detail-address-text">
                  {venue.addressLines.map((line, idx) => (
                    <span key={idx} className="address-line">
                      {line}
                      {idx < venue.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Calendar helper buttons */}
        <div className="calendar-actions-wrapper">
          <a
            href={calendar.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-secondary"
          >
            <CalendarPlus size={16} className="btn-icon" />
            <span>Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={downloadICS}
            className="btn-luxury-secondary"
            title="Download iCal file for Apple Calendar or Outlook"
          >
            <Calendar size={16} className="btn-icon" />
            <span>Apple / Outlook Calendar</span>
          </button>
        </div>
      </div>
    </section>
  );
}

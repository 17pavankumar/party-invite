import React from 'react';
import { EVENT_DETAILS } from '../config/eventDetails';
import { BotanicalDivider, MonogramEmblem } from './Ornament';

export default function Invitation() {
  const { couple, invitationMessage } = EVENT_DETAILS;

  return (
    <section className="invitation-section section-padding" id="invitation-message">
      <div className="container max-w-readable">
        <div className="invitation-card-message">
          <div className="monogram-container">
            <MonogramEmblem size={110} />
          </div>

          <h3 className="invitation-families-header">
            {invitationMessage.heading}
          </h3>

          <BotanicalDivider className="my-4" />

          <p className="invitation-body-text">
            {invitationMessage.body1}
          </p>

          <p className="invitation-body-text">
            {invitationMessage.body2}
          </p>

          <div className="invitation-couple-signature">
            <span className="signature-names font-script">{couple.names}</span>
          </div>

          <BotanicalDivider className="my-4" />

          <p className="invitation-closing-text">
            {invitationMessage.closing}
          </p>
        </div>
      </div>
    </section>
  );
}


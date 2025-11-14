const EventSummary = ({ eventData }) => {
  const getEventIcon = (type) => {
    const icons = {
      Wedding: '💍',
      Birthday: '🎂',
      'Office Meet': '🏢',
      default: '🎉',
    };
    return icons[type] || icons.default;
  };

  return (
    <div className="event-summary-card">
      <div className="event-info">
        <h3 className="event-title">Your Event</h3>
        <div className="event-details">
          <div className="event-detail">
            <span className="event-label">Type:</span>
            <span className="event-value">{eventData?.type || 'Not set'}</span>
          </div>
          <div className="event-detail">
            <span className="event-label">Date:</span>
            <span className="event-value">
              {eventData?.date 
                ? new Date(eventData.date).toLocaleDateString() 
                : 'Not set'}
            </span>
          </div>
          <div className="event-detail">
            <span className="event-label">Venue:</span>
            <span className="event-value">{eventData?.venue || 'Not selected'}</span>
          </div>
        </div>
      </div>
      <div className="event-icon">
        {getEventIcon(eventData?.type)}
      </div>
    </div>
  );
};

export default EventSummary;


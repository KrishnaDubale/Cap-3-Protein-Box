const ProgressTracker = ({ progress = 0 }) => {
  return (
    <div className="progress-section">
      <div className="progress-label">
        Planning Progress • {progress}% Complete
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressTracker;


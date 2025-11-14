const PlannerContact = () => {
  const handleChatClick = () => {
    // TODO: Implement chat functionality
    alert('Chat feature coming soon!');
  };

  return (
    <div className="planner-contact">
      <div className="planner-icon">💬</div>
      <div className="planner-content">
        <h4 className="planner-title">Need help?</h4>
        <p className="planner-text">Chat with your Evara Planner</p>
      </div>
      <button className="planner-button" onClick={handleChatClick}>
        Chat
      </button>
    </div>
  );
};

export default PlannerContact;


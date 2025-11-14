const FeaturesGrid = () => {
  const features = [
    { icon: "🏛️", title: "Venues", desc: "Find perfect locations" },
    { icon: "🎨", title: "Decor", desc: "Design your theme" },
    { icon: "🍽️", title: "Catering", desc: "Plan the menu" },
    { icon: "📸", title: "Photography", desc: "Capture memories" },
    { icon: "🎵", title: "Entertainment", desc: "Music & performers" },
    { icon: "💰", title: "Budget", desc: "Track expenses" },
    { icon: "✅", title: "Checklist", desc: "Stay organized" },
    { icon: "📅", title: "Timeline", desc: "Plan your schedule" }
  ];

  const handleFeatureClick = (feature) => {
    // TODO: Navigate to feature page or open modal
    // Feature navigation will be implemented later
  };

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="feature-card"
          onClick={() => handleFeatureClick(feature)}
        >
          <div className="feature-icon">{feature.icon}</div>
          <div className="feature-content">
            <h4 className="feature-title">{feature.title}</h4>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;


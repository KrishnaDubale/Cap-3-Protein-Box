import { useState } from 'react';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'venues', icon: '🏛️', label: 'Venues' },
    { id: 'vendors', icon: '👥', label: 'Vendors' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
    // TODO: Navigate to respective page
    // Navigation will be implemented later
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleNavClick(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;


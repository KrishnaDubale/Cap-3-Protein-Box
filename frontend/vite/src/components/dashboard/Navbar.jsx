import { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Evara</div>
      <div className="navbar-profile">
        <button className="profile-button" onClick={toggleProfileDropdown}>
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </button>
        {showProfileDropdown && (
          <div className="profile-dropdown">
            <div className="profile-info">
              <div className="profile-name">{user?.name || 'User'}</div>
              <div className="profile-email">{user?.email || ''}</div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


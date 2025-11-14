import { useState } from 'react';
import { authAPI, tokenManager } from '../../services/api';

const Auth = ({ onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('signin'); // signin | signup
  const [isAnimating, setIsAnimating] = useState(false);

  // Sign In state
  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
  });
  const [signinError, setSigninError] = useState('');
  const [signinLoading, setSigninLoading] = useState(false);

  // Sign Up state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 150); // Half of transition duration
  };

  const handleSigninChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
    setSigninError('');
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
    setSignupError('');
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setSigninError('');
    setSigninLoading(true);

    try {
      const data = await authAPI.login(signinData);

      if (data.token) {
        tokenManager.setToken(data.token);
        onAuthSuccess();
      } else {
        setSigninError(data.message || 'Sign in failed');
      }
    } catch (err) {
      setSigninError(err.message || 'An error occurred during sign in');
    } finally {
      setSigninLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');

    // Validate password length
    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      return;
    }

    setSignupLoading(true);

    try {
      const data = await authAPI.signup({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      if (data.token) {
        tokenManager.setToken(data.token);
        onAuthSuccess();
      } else {
        setSignupError(data.message || 'Sign up failed');
      }
    } catch (err) {
      setSignupError(err.message || 'An error occurred during sign up');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Tab Switcher */}
      <div className="auth-tabs">
        <button
          className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('signin')}
          disabled={isAnimating}
        >
          Sign In
        </button>
        <button
          className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('signup')}
          disabled={isAnimating}
        >
          Sign Up
        </button>
        <div className={`auth-tab-indicator ${activeTab}`} />
      </div>

      {/* Forms Container */}
      <div className={`auth-forms ${isAnimating ? 'animating' : ''}`}>
        {/* Sign In Form */}
        <div className={`auth-form ${activeTab === 'signin' ? 'active' : ''}`}>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {signinError && (
            <div className="auth-error">
              {signinError}
            </div>
          )}

          <form onSubmit={handleSigninSubmit}>
            <div className="form-group">
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="Email"
                value={signinData.email}
                onChange={handleSigninChange}
                required
                disabled={signinLoading}
              />
            </div>
            <div className="form-group">
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="Password"
                value={signinData.password}
                onChange={handleSigninChange}
                required
                disabled={signinLoading}
              />
            </div>
            <button
              className="auth-button signin-button"
              type="submit"
              disabled={signinLoading}
            >
              {signinLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`auth-form ${activeTab === 'signup' ? 'active' : ''}`}>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your journey today</p>

          {signupError && (
            <div className="auth-error">
              {signupError}
            </div>
          )}

          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <input
                className="auth-input"
                name="name"
                placeholder="Full Name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
                disabled={signupLoading}
              />
            </div>
            <div className="form-group">
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
                disabled={signupLoading}
              />
            </div>
            <div className="form-group">
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
                disabled={signupLoading}
                minLength={6}
              />
            </div>
            <button
              className="auth-button signup-button"
              type="submit"
              disabled={signupLoading}
            >
              {signupLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

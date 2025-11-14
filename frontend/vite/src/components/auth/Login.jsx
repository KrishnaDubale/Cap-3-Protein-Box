import { useState } from 'react';
import { authAPI, tokenManager } from '../../services/api';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(formData);
      
      if (data.token) {
        tokenManager.setToken(data.token);
        onLoginSuccess();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">Welcome Back to Evara</h1>
      <p className="auth-subtitle">Continue planning your perfect celebration.</p>
      
      {error && (
        <div className="error-message" style={{
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          background: 'rgba(178, 58, 72, 0.1)',
          border: '1px solid rgba(178, 58, 72, 0.3)',
          borderRadius: '12px',
          color: '#B23A48',
          fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <p className="forgot-password">
          <span className="auth-link">Forgot Password?</span>
        </p>
        <button 
          className="auth-button" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="footer-link">
        Don't have an account?{' '}
        <span className="auth-link" onClick={onSwitchToSignup}>
          Create one
        </span>
      </p>
      
      <div className="trust-indicators">
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Secure login</span>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Your data stays private</span>
        </div>
      </div>
    </>
  );
};

export default Login;


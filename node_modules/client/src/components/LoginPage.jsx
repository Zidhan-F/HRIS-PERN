import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { getInitials } from '../utils/helpers';

export default function LoginPage({ loading, statusMsg, handleLoginSuccess, handleLoginError }) {
  return (
    <div className="login-page">
      <div className="login-brand-bar">
        <div className="login-brand-icon" style={{ background: 'none', boxShadow: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
            <defs>
              <linearGradient id="dayhrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#dayhrGrad)" />
            <circle cx="12" cy="9" r="3.5" fill="white" />
            <path d="M12 13C8.5 13 6 15 6 18H18C18 15 15.5 13 12 13Z" fill="white" />
            <circle cx="17" cy="7" r="1.5" fill="#facc15" />
          </svg>
        </div>
        <div className="login-brand-text">
          <span className="login-brand-name" style={{ color: '#2563eb', fontWeight: '800' }}>Day</span>
          <span className="login-brand-sub" style={{ color: '#0d9488', fontWeight: '800', fontSize: '14px', marginLeft: '1px' }}>HR</span>
        </div>
      </div>
      <div className="login-card-area">
        <div className="login-card">
          <div className="login-card-logo">
            <div className="login-card-logo-icon" style={{ background: 'none', boxShadow: 'none', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '44px', height: '44px' }}>
                <defs>
                  <linearGradient id="dayhrGradCard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#dayhrGradCard)" />
                <circle cx="12" cy="9" r="3.5" fill="white" />
                <path d="M12 13C8.5 13 6 15 6 18H18C18 15 15.5 13 12 13Z" fill="white" />
                <circle cx="17" cy="7" r="1.5" fill="#facc15" />
              </svg>
            </div>
            <div className="login-card-brand">
              <span className="login-card-brand-name">
                <span style={{ color: '#2563eb' }}>Day</span>
                <span style={{ color: '#0d9488' }}>HR</span>
              </span>
              <span className="login-card-brand-sub">Employee Portal</span>
            </div>
          </div>
          <div className="login-welcome"><h2>Welcome back!</h2><p>Please sign-in with Google Account</p></div>
          <div className="login-auth-area">
            {loading ? <div className="loading-spinner"></div> :
              <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} shape="pill" size="large" width="320" theme="outline" />}
          </div>
          {statusMsg && <div className={`status-message status-${statusMsg.type}`}>{statusMsg.text}</div>}
        </div>
      </div>
    </div>
  );
}

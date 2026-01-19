import React from 'react';
import './Header.css';
import altusLogo from '../../assets/logo/altusLogo.png';

const Header = ({ t, lang, theme, toggleLang, toggleTheme, onOpenInstructions }) => {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <div className="logo-pill">
            <img src={altusLogo} alt="Altus" className="logo-img" />
          </div>
        </div>
        
        <div className="nav-center nav-center-adjusted">
          <div className="app-title">{t.title}</div>
        </div>
        
        <div className="nav-right">
          <button className="btn small instructions-btn" onClick={onOpenInstructions}>
            <span className="info-icon">ⓘ</span> {t.instructions}
          </button>
          
          <button className="lang-toggle fixed-size-toggle" onClick={toggleLang}>
            <span className={`toggle-track ${lang === 'en' ? 'on' : ''}`}>
              <span className="toggle-thumb"></span>
            </span>
            <span className="lang-label">{t.langLabel}</span>
          </button>
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
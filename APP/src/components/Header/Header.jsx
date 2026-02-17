import React from 'react';
import { BookOpen, Globe, Sun, Moon, ArrowLeft } from 'lucide-react';
import './Header.css';
import altusLogo from '../../assets/logo/altusLogo.png';

const Header = ({ 
  t, lang, theme, toggleLang, toggleTheme, onOpenInstructions,
  showBack, onBack 
}) => {
  return (
    <header className="nav-container">
      <div className="nav-inner">
        
        {/* Lado Esquerdo */}
        <div className="nav-left">
          
          {/* BOTÃO VOLTAR (Estilo Ícone de Navegação) */}
          {showBack && (
            <button className="nav-back-icon" onClick={onBack} title="Voltar ao Dashboard">
              <ArrowLeft size={24} />
            </button>
          )}

          <div className="logo-wrapper">
            <img src={altusLogo} alt="Altus Logo" className="logo-img" />
          </div>
          
          {/* Divisor visual apenas se não tiver o botão de voltar para não poluir, 
              ou mantemos sempre se preferir a consistência do logo */}
          <div className="brand-divider" />
          
          <h1 className="app-headline">Benchmarking <span className="highlight">Pro</span></h1>
        </div>

        {/* Lado Direito */}
        <div className="nav-right">
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
          <button className="nav-action-btn" onClick={onOpenInstructions} title={t.instructions}>
            <BookOpen size={20} />
            <span className="btn-label">{t.guide?.title ? 'Guia' : 'Guide'}</span>
          </button>

          <div className="vertical-divider" />

          <div className="lang-selector-container">
            <button className="nav-icon-btn" onClick={() => toggleLang()}>
              <Globe size={20} />
              <span className="lang-text">{lang.toUpperCase()}</span>
            </button>
          </div>

          <button className="nav-icon-btn theme-switcher" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="brand-divider" />

          <button 
            className="nav-icon-btn" 
            onClick={onRequestNotification} 
            title={notificationStatus === 'granted' ? t.notificationsTitle : 'Ativar notificações'}
          >
            {notificationStatus === 'granted' ? (
              <Bell size={20} />
            ) : (
              <BellOff size={20} className="icon-disabled" />
            )}
          </button>

          <button 
            className="nav-icon-btn" 
            onClick={onToggleSound} 
            title={soundEnabled ? 'Mudar para mudo' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} className="icon-disabled" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
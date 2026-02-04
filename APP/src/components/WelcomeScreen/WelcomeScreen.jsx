import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('intro'); 
  const [name, setName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('input');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (name.trim().length > 0) {
      setStage('exiting');
      setTimeout(() => {
        onComplete(name);
      }, 800); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <div className={`welcome-container ${stage === 'exiting' ? 'fade-out-screen' : ''}`}>
      
      <div className="tech-blue-bg">
        <div className="grid-overlay"></div>
      </div>
      
      <div className="content-wrapper">
        
        <div className={`header-section ${stage !== 'intro' ? 'move-up' : ''}`}>
          <div className="logo-anim-box">
            <Sparkles size={56} className="intro-icon" />
          </div>
          <h1 className="intro-title">Altus Benchmarking<span className="text-highlight">Pro</span></h1>
          <p className="intro-subtitle">Decisões de compra baseadas em dados.</p>
        </div>

        <div className={`input-section ${stage !== 'intro' ? 'visible' : ''}`}>
          <p className="question-text">Como podemos te chamar?</p>
          
          <div className="blue-input-wrapper">
            <input 
              type="text" 
              placeholder="Digite seu nome..." 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="tech-input"
            />
            <button 
              className={`tech-next-btn ${name.length > 0 ? 'active' : ''}`}
              onClick={handleNext}
              disabled={name.length === 0}
            >
              <ArrowRight size={24} />
            </button>
          </div>

          <div className="footer-note">
            <p>Pressione <strong>Enter</strong> para entrar</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;
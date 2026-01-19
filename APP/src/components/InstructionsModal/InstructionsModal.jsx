import React from 'react';
import './InstructionsModal.css';

const InstructionsModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  const { guide } = t;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.instructions}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <h3 className="guide-title">{guide.title}</h3>
          <p className="guide-intro">{guide.intro}</p>
          
          <hr className="guide-divider" />

          <div className="guide-step">
            <h4>{guide.step1.title}</h4>
            <p>{guide.step1.text}</p>
            <ol>
              <li>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="guide-link"
                >
                  {guide.step1.list[0]}
                </a>
              </li>
              <li>{guide.step1.list[1]}</li>
              <li>{guide.step1.list[2]}</li>
              <li>{guide.step1.list[3]}</li>
            </ol>
          </div>

          <div className="guide-step">
            <h4>{guide.step2.title}</h4>
            <p>{guide.step2.text}</p>
          </div>

          <div className="guide-step">
            <h4>{guide.step3.title}</h4>
            <p>{guide.step3.text}</p>
            <ul>
              {guide.step3.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
        
        <div className="modal-footer">
          <button className="btn small primary-btn" onClick={onClose}>
            {t.closeInstructions}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
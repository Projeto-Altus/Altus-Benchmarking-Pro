import React from 'react';
import './InstructionsModal.css';

const InstructionsModal = ({ isOpen, onClose, content, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="btn small close-modal" onClick={onClose}>✖</button>
        <h3>{t.instructions}</h3>
        <div className="instructions-text">{content}</div>
        <p className="muted" style={{textAlign:'right'}}>{t.closeInstructions}</p>
      </div>
    </div>
  );
};

export default InstructionsModal;
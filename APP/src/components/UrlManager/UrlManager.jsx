import React, { useState } from 'react';
import '../../App.css';

const UrlManager = ({ urls, setUrls, loading, t }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addUrl = () => {
    if (!input.trim()) return;
    setUrls([...urls, input.trim()]);
    setInput('');
    setIsOpen(true);
  };

  const removeUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const clearUrls = () => setUrls([]);

  return (
    <div className="section">
      <label className="label">{t.urlsLabel}</label>
      <div className="input-row">
        <input 
          className="input-field" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          disabled={loading} 
          placeholder="Ex: https://produto-altus.com"
          onKeyDown={(e) => e.key === 'Enter' && addUrl()}
        />
        <button className="btn small primary-btn" onClick={addUrl} disabled={loading}>+</button>
      </div>

      <div className={`toggle-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {isOpen ? 'Ocultar Lista' : 'Ver URLs Adicionadas'}
          <span className="item-count">{urls.length}</span>
        </span>
        <span className="toggle-icon">▼</span>
      </div>

      {isOpen && urls.length > 0 && (
        <ul className="list-items">
          {urls.map((u, i) => (
            <li className="list-item" key={i}>
              <span className="url-name" title={u}>{u}</span>
              <button className="btn small remove-btn" onClick={() => removeUrl(i)} disabled={loading}>✖</button>
            </li>
          ))}
        </ul>
      )}
      
      {isOpen && urls.length > 0 && (
        <div className="section-controls">
          <button className="btn small clear" onClick={clearUrls} disabled={loading}>{t.clearUrls}</button>
        </div>
      )}
    </div>
  );
};

export default UrlManager;
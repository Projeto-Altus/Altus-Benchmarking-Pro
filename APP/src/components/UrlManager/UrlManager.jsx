import React, { useState } from 'react';

const UrlManager = ({ urls, setUrls, loading, t }) => {
  const [input, setInput] = useState('');

  const isValidUrl = (url) => {
    try { new URL(url); return true; } 
    catch { return false; }
  };

  const addUrl = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (!isValidUrl(trimmed)) {
      alert('URL inválida!');
      return;
    }
    setUrls([...urls, trimmed]);
    setInput('');
  };

  const removeUrl = (index) => setUrls(urls.filter((_, i) => i !== index));
  const clearUrls = () => setUrls([]);

  const escapeHtml = (text) => String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);

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
      <div className="muted">{urls.length} {t.urlsCount}</div>
      <ul className="list-items">
        {urls.map((u, i) => (
          <li className="list-item" key={i}>
            <span title={u} className="url-name">{escapeHtml(u)}</span>
            <button className="btn small remove-btn" onClick={() => removeUrl(i)} disabled={loading}>✖</button>
          </li>
        ))}
      </ul>
      <div className="section-controls">
        <button className="btn small clear" onClick={clearUrls} disabled={loading}>{t.clearUrls}</button>
      </div>
    </div>
  );
};

export default UrlManager;
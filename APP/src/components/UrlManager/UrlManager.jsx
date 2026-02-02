import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon, Trash2, AlertCircle, Link2Off } from 'lucide-react';
import './UrlManager.css';

const UrlManager = ({ urls, setUrls, loading, t }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (string) => {
    try { new URL(string); return true; } 
    catch (_) { return false; }
  };

  const addUrl = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (!isValidUrl(trimmedInput)) {
      setError('URL inválida. Inclua http:// ou https://');
      return;
    }
    if (urls.includes(trimmedInput)) {
      setError('Esta URL já está na lista.');
      return;
    }

    setUrls([...urls, trimmedInput]);
    setInput('');
    setError('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  const removeUrl = (index) => setUrls(urls.filter((_, i) => i !== index));
  const clearUrls = () => setUrls([]);

  return (
    <div className="url-section">
      <label className="manager-label">
        <LinkIcon size={14} className="label-icon" />
        {t.urlsLabel}
      </label>
      
      <div className="manager-input-group">
        <input 
          className={`manager-input ${error ? 'error' : ''}`}
          value={input} 
          onChange={handleInputChange} 
          disabled={loading} 
          placeholder="Cole o link do produto aqui..."
          onKeyDown={(e) => e.key === 'Enter' && addUrl()}
        />
        <button className="btn-add" onClick={addUrl} disabled={loading || !input.trim()}>
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>

      {error && (
        <div className="input-error-msg">
          <AlertCircle size={12} /> {error}
        </div>
      )}

      {/* Header Fixo da Lista */}
      <div className="list-header-row">
        <div className="header-title">
          <span>Lista de Produtos</span>
          {urls.length > 0 && <span className="count-badge">{urls.length}</span>}
        </div>
        {urls.length > 0 && (
          <button className="btn-clear-mini" onClick={clearUrls} disabled={loading}>
            <Trash2 size={12} /> {t.clearUrls}
          </button>
        )}
      </div>

      {/* Lista ou Placeholder */}
      {urls.length > 0 ? (
        <ul className="manager-list">
          {urls.map((u, i) => (
            <li className="url-item-card" key={i}>
              <span className="url-text-content" title={u}>{u}</span>
              <button className="btn-remove-item" onClick={() => removeUrl(i)} disabled={loading}>
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-list-placeholder">
          <Link2Off size={24} />
          <span>Nenhuma URL adicionada</span>
        </div>
      )}
    </div>
  );
};

export default UrlManager;
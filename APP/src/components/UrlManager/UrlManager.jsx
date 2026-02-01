import React, { useState } from 'react';
import '../../App.css';

const UrlManager = ({ urls, setUrls, loading, t }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(''); // 1. Estado para o erro

  // 2. Função auxiliar para validar URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const addUrl = () => {
    const trimmedInput = input.trim();
    
    if (!trimmedInput) return;

    // 3. Validação antes de adicionar
    if (!isValidUrl(trimmedInput)) {
      setError('URL inválida. Certifique-se de incluir http:// ou https://');
      return;
    }

    // Opcional: Evitar duplicatas
    if (urls.includes(trimmedInput)) {
      setError('Esta URL já foi adicionada à lista.');
      return;
    }

    setUrls([...urls, trimmedInput]);
    setInput('');
    setError(''); // Limpa o erro em caso de sucesso
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) setError(''); // Limpa o erro enquanto o usuário digita
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
          onChange={handleInputChange} 
          disabled={loading} 
          placeholder="Ex: https://produto-altus.com"
          style={error ? { borderColor: '#ff6e6e' } : {}} /* Borda vermelha se der erro */
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Evita comportamento padrão de form
              addUrl();
            }
          }}
        />
        <button className="btn small primary-btn" onClick={(e) => {
            e.preventDefault();
            addUrl();
        }} disabled={loading}>+</button>
      </div>

      {/* 4. Exibição da mensagem de erro */}
      {error && (
        <div style={{ color: '#ff6e6e', fontSize: '12px', marginTop: '4px', marginLeft: '2px' }}>
          ⚠️ {error}
        </div>
      )}

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
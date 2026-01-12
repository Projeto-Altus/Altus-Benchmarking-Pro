import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, loading, statusMessage, error, downloadLink, t, attributes }) => {
  
  const sortedResults = results ? [...results].sort((a, b) => {
    const scoreA = parseFloat(a.pontuacao_final) || 0;
    const scoreB = parseFloat(b.pontuacao_final) || 0;
    return scoreB - scoreA;
  }) : [];

  const escapeHtml = (text) => {
    if (text === null || text === undefined) return '';
    return String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  };
  
  const truncateUrl = (url, maxLength = 60) => {
      if (!url) return '';
      if (url.length <= maxLength) return url;
      return url.slice(0, maxLength) + '...';
  };

  return (
    <aside className="card right-card">
      <h2 className="results-title">{t.results}</h2>
      
      <div className="results-body">
        {loading && <div className="spinner"></div>}
        
        {!loading && error && (
            <div className="result-error-box">
                <strong>{t.error || 'Erro'}:</strong> {error}
            </div>
        )}

        {!loading && !error && sortedResults && sortedResults.length > 0 && (
          <div className="results-content">
            {downloadLink && (
               <div className="download-container">
                  <a href={downloadLink} className="btn small primary-btn" target="_blank" rel="noopener noreferrer">
                    {t.download || 'Baixar Relatório'}
                  </a>
               </div>
            )}

            {sortedResults.map((r, i) => (
              <div className="result-item" key={i}>
                <div className="result-header">
                    <div className="score-badge" title="Pontuação (0-100)">
                        {r.pontuacao_final !== undefined ? r.pontuacao_final : '-'}
                    </div>
                    <div className="result-info">
                        <div className="result-name">{escapeHtml(r.nome_produto || 'Produto sem nome')}</div>
                        <a href={r.url_origem} target="_blank" rel="noopener noreferrer" className="result-url" title={r.url_origem}>
                            {escapeHtml(truncateUrl(r.url_origem))} 🔗
                        </a>
                    </div>
                </div>
                
                {r.motivo_escolha && (
                    <div className="result-reason">
                        <strong>IA:</strong> {escapeHtml(r.motivo_escolha)}
                    </div>
                )}

                <ul className="result-list">
                  {attributes && attributes.map((attr, j) => {
                    const val = r[attr.name] || 'N/A';
                    return (
                        <li key={j} className="result-attr">
                            <strong>{escapeHtml(attr.name)}:</strong>
                            <span>{escapeHtml(val)}</span>
                        </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (!results || results.length === 0) && (
          <p className="no-data">{t.noResultsYet}</p>
        )}
      </div>
      
      <p className="results-sub">{statusMessage}</p>
    </aside>
  );
};

export default ResultsDisplay;
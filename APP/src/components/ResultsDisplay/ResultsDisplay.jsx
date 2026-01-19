import React, { useState } from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, loading, statusMessage, error, downloadLink, t, attributes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedResults = results ? [...results].sort((a, b) => {
    const scoreA = parseFloat(a.pontuacao_final) || 0;
    const scoreB = parseFloat(b.pontuacao_final) || 0;
    return scoreB - scoreA;
  }) : [];

  const escapeHtml = (text) => text ? String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]) : '';
  
  const truncateUrl = (url, maxLength = 45) => {
    if (!url) return '';
    if (url.length <= maxLength) return url;
    return url.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <aside className="card right-card">
        <h2 className="results-title">{t.results}</h2>
        <div className="results-body">
          <div className="spinner"></div>
        </div>
        <p className="results-sub">{statusMessage}</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="card right-card">
        <h2 className="results-title">{t.results}</h2>
        <div className="results-body">
          <div className="result-error-box"><strong>{t.error}:</strong> {error}</div>
        </div>
      </aside>
    );
  }

  if (!results || results.length === 0) {
    return (
      <aside className="card right-card">
        <h2 className="results-title">{t.results}</h2>
        <div className="results-body">
          <p className="no-data">{t.noResultsYet}</p>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside className="card right-card">
        <h2 className="results-title">{t.results}</h2>
        <div className="results-body">
          
          <div className="success-view">
            <div className="check-icon-circle">
              <svg className="check-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="success-title">{t.analysisReady}</h3>

            <div className="action-buttons">
              <button className="btn btn-view-results" onClick={() => setIsModalOpen(true)}>
                {t.viewResults}
              </button>

              {downloadLink && (
                 <a href={downloadLink} className="btn btn-download-results" target="_blank" rel="noopener noreferrer">
                   {t.download}
                 </a>
              )}
            </div>
          </div>

        </div>
        <p className="results-sub">{statusMessage}</p>
      </aside>

      {isModalOpen && (
        <div className="results-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="results-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="rm-header">
              <span className="rm-title">{t.results} ({sortedResults.length})</span>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <div className="rm-body">
              <div className="results-grid">
                {sortedResults.map((r, i) => (
                  <div className="result-card-detail" key={i}>
                    
                    <div className="rc-header">
                      <div className="rc-title-group">
                        <div className="rc-title">{escapeHtml(r.nome_produto || 'Produto Sem Nome')}</div>
                        <a href={r.url_origem} target="_blank" rel="noopener noreferrer" className="rc-link">
                          {escapeHtml(truncateUrl(r.url_origem))} 🔗
                        </a>
                      </div>
                      <div className="badge-score" title="Pontuação 0-100">
                        {r.pontuacao_final || '-'}
                      </div>
                    </div>

                    <div className="rc-content">
                      {r.motivo_escolha && (
                        <div className="rc-reason">
                          <strong>IA:</strong> {escapeHtml(r.motivo_escolha)}
                        </div>
                      )}

                      <ul className="attr-list">
                        {attributes && attributes.map((attr, j) => (
                          <li key={j}>
                              <strong>{escapeHtml(attr.name)}</strong>
                              <span>{escapeHtml(r[attr.name] || 'N/A')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ResultsDisplay;
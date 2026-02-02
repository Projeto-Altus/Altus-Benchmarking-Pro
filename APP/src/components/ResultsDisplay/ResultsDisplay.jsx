import React, { useState } from 'react';
import { 
  Trophy, 
  AlertTriangle, 
  Check, 
  Download, 
  ExternalLink, 
  BarChart2, 
  Search 
} from 'lucide-react';
import ResultCard from '../ResultsCard/ResultCard'; // Assumindo que este componente existe
import './ResultsDisplay.css';

const ResultsDisplay = ({ 
  results, loading, statusMessage, error, downloadLink, t, attributes 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedResults = results ? [...results].sort((a, b) => {
    const scoreA = parseFloat(a.pontuacao_final) || 0;
    const scoreB = parseFloat(b.pontuacao_final) || 0;
    return scoreB - scoreA;
  }) : [];

  // Função auxiliar para renderizar o conteúdo do corpo
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner-modern"></div>
          <span className="loading-text">{statusMessage || t.analyzing}</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <AlertTriangle size={24} />
          <span className="error-text"><strong>{t.error}:</strong> {error}</span>
        </div>
      );
    }

    if (!results || results.length === 0) {
      return (
        <div className="no-data-state">
          <Search size={48} strokeWidth={1} />
          <p className="no-data-text">{t.noResultsYet}</p>
        </div>
      );
    }

    // Sucesso - Análise Pronta
    return (
      <div className="success-view">
        <div className="check-circle-modern">
          <Check size={40} strokeWidth={3} />
        </div>
        
        <h3 className="success-title">{t.analysisReady}</h3>
        
        <div className="success-actions">
          <button className="btn-result-action btn-view" onClick={() => setIsModalOpen(true)}>
            <BarChart2 size={18} />
            {t.viewResults}
          </button>
          
          {downloadLink && (
            <a 
              href={downloadLink} 
              className="btn-result-action btn-download" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Download size={18} />
              {t.download}
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className="card right-card">
        {/* Header Consistente */}
        <div className="results-header">
          <h2 className="results-title-header">
            <Trophy size={18} /> {t.results}
          </h2>
        </div>

        {/* Corpo Flexível */}
        <div className="results-body-content">
          {renderContent()}
        </div>
      </aside>

      {/* Modal de Detalhes */}
      {isModalOpen && (
        <div className="results-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="results-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="rm-header">
              <span className="rm-title">
                <BarChart2 size={20} className="text-primary" /> 
                {t.results} ({sortedResults.length})
              </span>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <div className="rm-body">
              <div className="results-grid">
                {sortedResults.map((r, i) => (
                  <ResultCard 
                    key={i} 
                    product={r} 
                    attributes={attributes} 
                    isWinner={i === 0}
                  />
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
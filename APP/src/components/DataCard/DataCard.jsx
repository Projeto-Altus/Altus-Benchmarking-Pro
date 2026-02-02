import React from 'react';
import { Download, Upload, Play, Database } from 'lucide-react';
import UrlManager from '../UrlManager/UrlManager';
import AttributeManager from '../AttributeManager/AttributeManager';
import './DataCard.css';

const DataCard = ({ 
  t, loading, lang, urlList, setUrlList, 
  attrWithImportance, setAttrWithImportance, 
  onImport, onExport, onGenerate, apiKey 
}) => {
  const isGenerateDisabled = loading || urlList.length === 0 || attrWithImportance.length === 0 || !apiKey;

  return (
    <section className="card data-card">
      <div className="data-inner">
        
        {/* Header */}
        <div className="data-header">
          <h3 className="data-title">
             <Database size={18} /> Dados do Benchmark
          </h3>
          <div className="data-actions">
            <button className="action-icon-btn" onClick={onImport} disabled={loading} title={t.import}>
              <Upload size={14} /> {t.import}
            </button>
            <div className="divider-vertical"></div>
            <button className="action-icon-btn" onClick={onExport} disabled={loading} title={t.export}>
              <Download size={14} /> {t.export}
            </button>
          </div>
        </div>

        {/* Conteúdo Dividido 50/50 com Scrolls Independentes */}
        <div className="data-content">
          
          <div className="manager-wrapper">
            <UrlManager 
              urls={urlList} 
              setUrls={setUrlList} 
              loading={loading} 
              t={t} 
            />
          </div>

          <div className="section-divider"></div>

          <div className="manager-wrapper">
            <AttributeManager 
              attributes={attrWithImportance} 
              setAttributes={setAttrWithImportance} 
              loading={loading} 
              t={t} 
            />
          </div>
        </div>

        {/* Footer Fixo */}
        <div className="data-footer">
          <button className="btn-generate-hero" onClick={onGenerate} disabled={isGenerateDisabled}>
            {loading ? (lang === 'pt' ? 'Processando...' : 'Processing...') : (
              <> <Play size={16} fill="currentColor" /> {t.generate} </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

export default DataCard;
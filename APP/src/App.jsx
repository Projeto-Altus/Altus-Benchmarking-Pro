import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import UrlManager from './components/UrlManager/UrlManager';
import AttributeManager from './components/AttributeManager/AttributeManager';
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay';
import InstructionsModal from './components/InstructionsModal/InstructionsModal';
import PasswordModal from './components/PasswordModal/PasswordModal';
import { translations } from './constants/translations';
import { useBenchmarking } from './hooks/useBenchmarking';
import { exportConfig, importConfig } from './utils/fileHandler';
import { hasStoredApiKey, saveApiKey, loadApiKey, removeStoredApiKey } from './utils/cryptoUtils';

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'pt');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [showInstructions, setShowInstructions] = useState(false);
  const t = translations[lang];

  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState(localStorage.getItem('provider') || 'google');
  const [urlList, setUrlList] = useState([]);
  const [attrWithImportance, setAttrWithImportance] = useState([]);
  
  // Estados para criptografia de API Key
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState(null); // 'save' ou 'load'
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showApiKeyPassword, setShowApiKeyPassword] = useState(false);

  const { 
    generateBenchmark, 
    results, 
    loading, 
    error, 
    statusMessage, 
    downloadLink 
  } = useBenchmarking();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('provider', provider);
  }, [provider]);

  // Verificar se existe API Key salva ao montar o componente
  useEffect(() => {
    const stored = hasStoredApiKey();
    setHasStoredKey(stored);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // ========== HANDLERS PARA API KEY SEGURA ==========

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      alert('Digite uma API Key antes de salvar');
      return;
    }
    // Abrir modal de senha para salvar
    setPasswordModalMode('save');
    setShowPasswordModal(true);
  };

  const handleLoadApiKey = () => {
    // Abrir modal de senha para carregar
    setPasswordModalMode('load');
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = async (password) => {
    setPasswordLoading(true);
    try {
      if (passwordModalMode === 'save') {
        // Salvar API Key criptografada
        await saveApiKey(apiKey, password);
        setHasStoredKey(true);
      } else if (passwordModalMode === 'load') {
        // Carregar e descriptografar API Key
        const decryptedKey = await loadApiKey(password);
        setApiKey(decryptedKey);
      }
      setShowPasswordModal(false);
    } catch (error) {
      // Erro silencioso - não revelar detalhes
      alert('Operação falhou. Verifique a senha e tente novamente.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRemoveApiKey = () => {
    if (window.confirm('Tem certeza que quer remover a API Key salva?')) {
      removeStoredApiKey();
      setHasStoredKey(false);
      setApiKey('');
      alert('API Key removida');
    }
  };

  // ========== HANDLERS PARA EXPORT/IMPORT ==========

  const handleExport = () => {
    if (urlList.length === 0 || attrWithImportance.length === 0) {
      alert(t.errorMessage || 'Configure URLs e atributos antes de exportar');
      return;
    }
    exportConfig(urlList, attrWithImportance);
  };

  const handleImport = async () => {
    try {
      const config = await importConfig();
      setUrlList(config.urls);
      setAttrWithImportance(config.attributes);
    } catch (error) {
      alert(`Erro ao importar: ${error.message}`);
    }
  };

  const handleGenerate = () => {
    generateBenchmark({
      apiKey,
      urls: urlList,
      attributes: attrWithImportance,
      provider,
      t 
    });
  };

  return (
    <div className="app-root">
      <Header 
        t={t} 
        lang={lang} 
        theme={theme} 
        toggleLang={toggleLang} 
        toggleTheme={toggleTheme}
        onOpenInstructions={() => setShowInstructions(true)}
      />

      <main className="main-grid">
        <section className="card left-card">
          <div className="left-inner">
            <div className="top-row">
              <div className="api-key-input-wrapper">
                <input 
                  className="input-field" 
                  placeholder={t.apiKey} 
                  disabled={loading} 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  type={showApiKeyPassword ? 'text' : 'password'}
                />
                <button
                  className="btn-toggle-password"
                  onClick={() => setShowApiKeyPassword(!showApiKeyPassword)}
                  disabled={loading}
                  type="button"
                  title={showApiKeyPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showApiKeyPassword ? '◉' : '○'}
                </button>
              </div>
              <select 
                className="input-field" 
                value={provider} 
                onChange={(e) => setProvider(e.target.value)}
                disabled={loading}
                style={{ width: '120px', marginLeft: '8px' }}
              >
                <option value="openai">OpenAI</option>
                <option value="deepseek">DeepSeek</option>
                <option value="google">Gemini</option>
              </select>
            </div>

            {/* Botões para salvar e carregar API Key */}
            <div className="api-key-buttons">
              <button 
                className="btn small primary-btn"
                onClick={handleSaveApiKey}
                disabled={loading || !apiKey.trim()}
                title="Criptografa e salva a API Key"
              >
                Salvar
              </button>
              
              <button 
                className="btn small primary-btn"
                onClick={handleLoadApiKey}
                disabled={loading || !hasStoredKey}
                title="Descriptografa e carrega a API Key salva"
              >
                Carregar
              </button>
            </div>

            <div className="import-export">
              <button 
                className="btn small import" 
                disabled={loading} 
                onClick={handleImport}
              >
                {t.import}
              </button>
              <button 
                className="btn small export" 
                disabled={loading} 
                onClick={handleExport}
              >
                {t.export}
              </button>
            </div>

            <UrlManager 
              urls={urlList} 
              setUrls={setUrlList} 
              loading={loading} 
              t={t} 
            />

            <AttributeManager 
              attributes={attrWithImportance} 
              setAttributes={setAttrWithImportance} 
              loading={loading} 
              t={t} 
            />
          </div>

          <div className="left-footer">
            <button 
              className="btn generate" 
              onClick={handleGenerate} 
              disabled={loading || urlList.length === 0 || attrWithImportance.length === 0 || !apiKey}
            >
              {loading ? (lang === 'pt' ? 'Gerando...' : 'Generating...') : t.generate}
            </button>
          </div>
        </section>

        <ResultsDisplay 
          results={results} 
          loading={loading} 
          statusMessage={statusMessage} 
          error={error}
          downloadLink={downloadLink}
          t={t}
          attributes={attrWithImportance}
        />
      </main>

      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)} 
        t={t}
      />

      {/* Modal de senha para criptografia de API Key */}
      <PasswordModal 
        isOpen={showPasswordModal}
        onConfirm={handlePasswordConfirm}
        onCancel={() => setShowPasswordModal(false)}
        title={passwordModalMode === 'save' ? 'Salvar API Key' : 'Carregar API Key'}
        loading={passwordLoading}
      />
    </div>
  );
}

export default App;
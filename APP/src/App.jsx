import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay';
import InstructionsModal from './components/InstructionsModal/InstructionsModal';
import PasswordModal from './components/PasswordModal/PasswordModal';
import ConfigCard from './components/ConfigCard/ConfigCard'; 
// Importação do novo DataCard
import DataCard from './components/DataCard/DataCard'; 

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
  
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showApiKeyPassword, setShowApiKeyPassword] = useState(false);

  const { generateBenchmark, results, loading, error, statusMessage, downloadLink } = useBenchmarking();

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('provider', provider); }, [provider]);
  useEffect(() => { setHasStoredKey(hasStoredApiKey()); }, []);

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) { alert('Digite uma API Key'); return; }
    setPasswordModalMode('save'); setShowPasswordModal(true);
  };
  const handleLoadApiKey = () => { setPasswordModalMode('load'); setShowPasswordModal(true); };
  
  const handlePasswordConfirm = async (password) => {
    setPasswordLoading(true);
    try {
      if (passwordModalMode === 'save') { await saveApiKey(apiKey, password); setHasStoredKey(true); }
      else if (passwordModalMode === 'load') { const decryptedKey = await loadApiKey(password); setApiKey(decryptedKey); }
      setShowPasswordModal(false);
    } catch (error) { alert('Erro na senha.'); } finally { setPasswordLoading(false); }
  };

  const handleExport = () => {
    if (urlList.length === 0) return alert('Configure antes de exportar');
    exportConfig(urlList, attrWithImportance);
  };
  
  const handleImport = async () => {
    try { const config = await importConfig(); setUrlList(config.urls); setAttrWithImportance(config.attributes); } 
    catch (error) { alert(error.message); }
  };

  const handleGenerate = () => {
    generateBenchmark({ apiKey, urls: urlList, attributes: attrWithImportance, provider, t });
  };

  return (
    <div className="app-root">
      <Header t={t} lang={lang} theme={theme} toggleLang={toggleLang} toggleTheme={toggleTheme} onOpenInstructions={() => setShowInstructions(true)} />

      <main className="main-grid">
        
        {/* CARD 1: CONFIGURAÇÃO */}
        <ConfigCard 
          t={t}
          loading={loading}
          provider={provider}
          setProvider={setProvider}
          apiKey={apiKey}
          setApiKey={setApiKey}
          showApiKeyPassword={showApiKeyPassword}
          setShowApiKeyPassword={setShowApiKeyPassword}
          hasStoredKey={hasStoredKey}
          onSaveKey={handleSaveApiKey}
          onLoadKey={handleLoadApiKey}
        />

        {/* CARD 2: DADOS (NOVO COMPONENTE) */}
        <DataCard 
          t={t}
          loading={loading}
          lang={lang}
          urlList={urlList}
          setUrlList={setUrlList}
          attrWithImportance={attrWithImportance}
          setAttrWithImportance={setAttrWithImportance}
          onImport={handleImport}
          onExport={handleExport}
          onGenerate={handleGenerate}
          apiKey={apiKey}
        />

        <ResultsDisplay results={results} loading={loading} statusMessage={statusMessage} error={error} downloadLink={downloadLink} t={t} attributes={attrWithImportance} />
      
      </main>

      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} t={t} />
      <PasswordModal isOpen={showPasswordModal} onConfirm={handlePasswordConfirm} onCancel={() => setShowPasswordModal(false)} title={passwordModalMode === 'save' ? 'Salvar API Key' : 'Carregar API Key'} loading={passwordLoading} />
    </div>
  );
}

export default App;
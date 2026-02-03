import React, { useEffect, useState } from 'react';
import { 
  Plus, Clock, Award, Star, 
  ArrowRight, Search, Zap, TrendingUp, Box, Timer
} from 'lucide-react';
import { getHistory, getRealStats, toggleFavorite } from '../../utils/historyHandler';
import './Dashboard.css';

const Dashboard = ({ onNewAnalysis, onLoad }) => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // Estado inicial ajustado para %
  const [stats, setStats] = useState({ 
    totalBenchmarks: 0, totalProducts: 0, hoursSaved: 0, avgSavings: '0%' 
  });
  const [userName] = useState("Gestor");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getHistory();
    setHistory(data);
    setFavorites(data.filter(item => item.isFavorite));
    setStats(getRealStats());
  };

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
    loadData();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="dashboard-container">
      
      <header className="dash-header">
        <div className="dash-welcome">
          <h1 className="welcome-title">{getGreeting()}, {userName}.</h1>
          <p className="welcome-subtitle">Visão geral da sua performance de compras.</p>
        </div>
        <button className="btn-primary-large" onClick={onNewAnalysis}>
          <Plus size={20} /> Nova Análise
        </button>
      </header>

      <div className="dashboard-grid">
        
        {/* --- MAIN COLUMN --- */}
        <div className="main-column">
          
          <section className="section-block">
            <div className="section-header">
              <h2 className="section-title"><Star size={18} className="icon-gold" /> Análises Fixadas</h2>
            </div>
            
            {favorites.length === 0 ? (
              <div className="empty-favorites-card">
                <div className="empty-icon"><Star size={24} /></div>
                <div className="empty-content">
                   <h3>Seus favoritos aparecem aqui</h3>
                   <p>Marque análises importantes com a estrela para acesso rápido.</p>
                </div>
              </div>
            ) : (
              <div className="favorites-grid-cards">
                {favorites.slice(0, 4).map((item) => (
                  <div key={item.id} className="fav-card-big" onClick={() => onLoad(item)}>
                    <div className="fav-top">
                      <span className="fav-date">{new Date(item.date).toLocaleDateString()}</span>
                      <button className="btn-star active" onClick={(e) => handleToggleFavorite(e, item.id)}>
                        <Star size={18} fill="#FFD700" stroke="none" />
                      </button>
                    </div>
                    <h3 className="fav-big-title">{item.title}</h3>
                    
                    <div className="fav-winner-box">
                      <div className="winner-label">Melhor Escolha</div>
                      <div className="winner-value">
                        <Award size={14} /> {item.winner?.substring(0, 20)}...
                      </div>
                    </div>
                    
                    <div className="fav-score-bar">
                      <div className="fs-track">
                        <div className="fs-fill" style={{width: `${item.winnerScore}%`}}></div>
                      </div>
                      <span className="fs-val">{Math.round(item.winnerScore)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2 className="section-title"><Clock size={18} /> Histórico Recente</h2>
            </div>

            <div className="history-table-container">
              {history.length === 0 ? (
                <div className="empty-state-list">
                  <Search size={40} />
                  <p>Nenhuma análise encontrada. Comece agora!</p>
                </div>
              ) : (
                <div className="history-list-compact">
                  {history.map((item) => (
                    <div key={item.id} className="history-item-row" onClick={() => onLoad(item)}>
                      <button 
                        className={`star-btn-small ${item.isFavorite ? 'active' : ''}`}
                        onClick={(e) => handleToggleFavorite(e, item.id)}
                      >
                        <Star size={16} fill={item.isFavorite ? "#FFD700" : "none"} />
                      </button>
                      
                      <div className="row-main-info">
                        <span className="row-title">{item.title}</span>
                        <span className="row-meta">{item.itemCount} opções • {new Date(item.date).toLocaleDateString()}</span>
                      </div>

                      <div className="row-winner-pill">
                        <Award size={12} /> {item.winner?.substring(0, 15)}...
                      </div>

                      <div className={`row-score ${item.winnerScore >= 80 ? 'high' : 'med'}`}>
                        {Math.round(item.winnerScore)}
                      </div>

                      <ArrowRight size={16} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* --- SIDEBAR (KPIs ATUALIZADOS) --- */}
        <div className="sidebar-column">
          
          {/* KPI 1: TEMPO (Agora Azul Altus) */}
          <div className="sidebar-card kpi-highlight blue-gradient">
            <div className="kpi-icon-round"><Timer size={24} /></div>
            <div>
              <span className="kpi-label-light">Tempo Economizado</span>
              <div className="kpi-value-huge">{stats.hoursSaved}h</div>
              <p className="kpi-desc">Horas de trabalho poupadas pela IA.</p>
            </div>
          </div>

          {/* KPI 2: EFICIÊNCIA % (Agora Verde) */}
          <div className="sidebar-card kpi-highlight green-gradient">
            <div className="kpi-icon-round"><TrendingUp size={24} /></div>
            <div>
              <span className="kpi-label-light">Ganho de Eficiência</span>
              <div className="kpi-value-huge">{stats.avgSavings}</div>
              <p className="kpi-desc">Média de economia vs. opção mais cara.</p>
            </div>
          </div>

          {/* KPI 3: VOLUME */}
          <div className="sidebar-card kpi-simple">
            <div className="kpi-header-simple">
              <Box size={20} className="text-blue" />
              <span>Produtos Analisados</span>
            </div>
            <div className="kpi-num-simple">{stats.totalProducts}</div>
          </div>

          <div className="sidebar-card pro-tip">
            <div className="tip-icon"><Zap size={20} /></div>
            <div className="tip-content">
              <h4>Dica do Sistema</h4>
              <p>Adicione links de lojas diferentes para aumentar a chance de encontrar o melhor preço.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
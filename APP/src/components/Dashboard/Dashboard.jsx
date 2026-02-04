import React, { useEffect, useState, useRef } from 'react';
import { 
  Plus, Clock, Award, Star, 
  ArrowRight, Search, Info, TrendingUp, Box, Timer
} from 'lucide-react';
import { getHistory, getRealStats, toggleFavorite } from '../../utils/historyHandler';
import './Dashboard.css';

const Dashboard = ({ onNewAnalysis, onLoad, userName, t }) => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [stats, setStats] = useState({ 
    totalBenchmarks: 0, totalProducts: 0, hoursSaved: 0, avgSavings: '0%' 
  });
  
  const scrollRef = useRef(null);

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    const data = getHistory();
    setHistory(data);
    setFavorites(data.filter(item => item.isFavorite));
    setStats(getRealStats());
  };

  const handleToggleFavorite = (e, id) => { e.stopPropagation(); toggleFavorite(id); loadData(); };

  const handleScrollWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="dashboard-container">
      
      <header className="dash-header">
        <div className="header-text-area">
          <h1 className="welcome-title">
            {t.dashWelcome}, <span className="highlight-name-script">{userName || 'Analista'}</span>
          </h1>
        </div>

        <div className="header-action-area">
          <button className="btn-hero-brand full-width" onClick={onNewAnalysis}>
            <div className="icon-box">
              <Plus size={24} strokeWidth={3} />
            </div>
            <div className="text-box">
              <span className="action-title">{t.dashNewAnalysis}</span>
              <span className="action-desc">{t.dashNewAnalysisDesc}</span>
            </div>
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        
        <div className="main-column">
          
          <section className="section-block">
            <div className="section-header">
              <h2 className="section-title"><Star size={18} className="icon-gold" /> {t.dashPinned}</h2>
            </div>
            {favorites.length === 0 ? (
              <div className="empty-favorites-card">
                <div className="empty-icon"><Star size={24} /></div>
                <div className="empty-content"><h3>{t.dashEmptyFavTitle}</h3><p>{t.dashEmptyFavDesc}</p></div>
              </div>
            ) : (
              <div 
                className="favorites-grid-cards" 
                ref={scrollRef}
                onWheel={handleScrollWheel}
              >
                {favorites.slice(0, 10).map((item) => (
                  <div key={item.id} className="fav-card-big" onClick={() => onLoad(item)}>
                    <div className="fav-top">
                      <span className="fav-date">{new Date(item.date).toLocaleDateString()}</span>
                      <button className="btn-star active" onClick={(e) => handleToggleFavorite(e, item.id)}><Star size={18} fill="#FFD700" stroke="none" /></button>
                    </div>
                    <h3 className="fav-big-title">{item.title}</h3>
                    <div className="fav-winner-box"><div className="winner-label">{t.dashBestChoice}</div><div className="winner-value"><Award size={14} /> {item.winner?.substring(0, 20)}...</div></div>
                    <div className="fav-score-bar"><div className="fs-track"><div className="fs-fill" style={{width: `${item.winnerScore}%`}}></div></div><span className="fs-val">{Math.round(item.winnerScore)}</span></div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="section-block">
            <div className="section-header"><h2 className="section-title"><Clock size={18} /> {t.dashHistory}</h2></div>
            <div className="history-table-container">
              {history.length === 0 ? (
                <div className="empty-state-list"><Search size={40} /><p>{t.dashEmptyHistTitle}</p></div>
              ) : (
                <div className="history-list-compact">
                  {history.map((item) => (
                    <div key={item.id} className="history-item-row" onClick={() => onLoad(item)}>
                      <button className={`star-btn-small ${item.isFavorite ? 'active' : ''}`} onClick={(e) => handleToggleFavorite(e, item.id)}><Star size={16} fill={item.isFavorite ? "#FFD700" : "none"} /></button>
                      <div className="row-main-info"><span className="row-title">{item.title}</span><span className="row-meta">{item.itemCount} opções • {new Date(item.date).toLocaleDateString()}</span></div>
                      <div className="row-winner-pill"><Award size={12} /> {item.winner?.substring(0, 15)}...</div>
                      <div className={`row-score ${item.winnerScore >= 80 ? 'high' : 'med'}`}>{Math.round(item.winnerScore)}</div>
                      <ArrowRight size={16} className="row-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="sidebar-column">
          
          <div className="sidebar-card kpi-highlight blue-gradient">
            <div className="kpi-icon-round"><Timer size={24} /></div>
            <div>
              <span className="kpi-label-light">{t.dashTimeSaved}</span>
              <div className="kpi-value-huge">{stats.hoursSaved}h</div>
              <p className="kpi-desc">{t.dashTimeDesc}</p>
            </div>
          </div>

          <div className="sidebar-card kpi-highlight green-gradient">
            <div className="kpi-icon-round"><TrendingUp size={24} /></div>
            <div>
              <span className="kpi-label-light">{t.dashEfficiency}</span>
              <div className="kpi-value-huge">{stats.avgSavings}</div>
              <p className="kpi-desc">{t.dashEfficiencyDesc}</p>
            </div>
          </div>

          <div className="sidebar-card kpi-simple">
            <div className="kpi-header-simple">
              <Box size={20} className="text-blue" />
              <span>{t.dashProductsAnalyzed}</span>
            </div>
            <div className="kpi-num-simple">{stats.totalProducts}</div>
          </div>

          <div className="sidebar-card pro-tip">
            <div className="tip-icon">
              <Info size={20} />
            </div>
            <div className="tip-content">
              <h4>{t.dashSystemNotice}</h4>
              <p>{t.dashNoticeText}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
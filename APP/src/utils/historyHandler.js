const HISTORY_KEY = 'altus_benchmark_history';

export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveBenchmarkToHistory = (benchmark) => {
  const history = getHistory();
  const newEntry = { 
    ...benchmark, 
    id: Date.now(), 
    date: new Date().toISOString(),
    isFavorite: false 
  };
  const updatedHistory = [newEntry, ...history].slice(0, 50); 
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const toggleFavorite = (id) => {
  const history = getHistory();
  const updatedHistory = history.map(item => 
    item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
  );
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
};

export const getRealStats = () => {
  const history = getHistory();
  
  let totalProducts = 0;
  let totalSavingsPct = 0;
  let validBenchmarks = 0; 
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    if (typeof priceStr === 'number') return priceStr;
    try {
      const clean = priceStr.toString().replace(/[^\d,]/g, '');
      return parseFloat(clean.replace(',', '.')) || 0;
    } catch (e) { return 0; }
  };

  history.forEach(item => {
    const count = item.itemCount || 0;
    totalProducts += count;

    if (item.fullData && item.fullData.results) {
      const results = item.fullData.results;
      
      let winnerObj = results.find(r => r.nome_produto === item.winner);
      if (!winnerObj && results.length > 0) winnerObj = results[0]; 
      
      const winnerPrice = parsePrice(winnerObj?.preco);
      
      let maxPrice = 0;
      results.forEach(r => {
        const p = parsePrice(r.preco);
        if (p > maxPrice) maxPrice = p;
      });

      if (maxPrice > 0 && winnerPrice > 0 && maxPrice >= winnerPrice) {
        const savingPct = ((maxPrice - winnerPrice) / maxPrice) * 100;
        totalSavingsPct += savingPct;
        validBenchmarks++;
      }
    }
  });

  const avgSavings = validBenchmarks > 0 ? Math.round(totalSavingsPct / validBenchmarks) : 0;

  const hoursSaved = ((totalProducts * 15) / 60).toFixed(1).replace('.0', '');

  return {
    totalBenchmarks: history.length,
    totalProducts,
    hoursSaved,
    avgSavings: `${avgSavings}%` 
  };
};
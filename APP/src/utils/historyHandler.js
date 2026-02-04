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

  const isDuplicate = history.some(item => 
    item.winner === benchmark.winner &&
    parseFloat(item.winnerScore).toFixed(2) === parseFloat(benchmark.winnerScore).toFixed(2) &&
    item.itemCount === benchmark.itemCount
  );

  if (isDuplicate) {
    return; 
  }

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

  const parsePrice = (priceValue) => {
    if (!priceValue) return 0;
    if (typeof priceValue === 'number') return priceValue;
    try {
      const str = priceValue.toString();
      const clean = str.replace(/[^\d,]/g, '');
      const val = parseFloat(clean.replace(',', '.'));
      return isNaN(val) ? 0 : val;
    } catch (e) { return 0; }
  };

  const findPriceInObject = (obj) => {
    if (!obj) return 0;
    const keys = ['preco', 'Preço', 'Preco', 'price', 'Price', 'valor', 'Valor'];
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null) {
        const val = parsePrice(obj[key]);
        if (val > 0) return val;
      }
    }
    return 0;
  };

  history.forEach(item => {
    const count = item.itemCount || 0;
    totalProducts += count;

    if (item.fullData && item.fullData.results && item.fullData.results.length > 0) {
      const results = item.fullData.results;
      
      let winnerObj = results.find(r => r.nome_produto === item.winner);
      
      if (!winnerObj) {
         winnerObj = results.reduce((prev, curr) => 
           (parseFloat(curr.pontuacao_final) > parseFloat(prev.pontuacao_final)) ? curr : prev
         , results[0]);
      }
      
      const winnerPrice = findPriceInObject(winnerObj);
      
      let maxPrice = 0;
      results.forEach(r => {
        const p = findPriceInObject(r);
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
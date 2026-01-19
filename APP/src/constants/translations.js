export const translations = {
  pt: {
    title: 'Ferramenta de Benchmarking',
    apiKey: 'Chave API',
    import: 'Importar Dados',
    export: 'Exportar Dados',
    urlsLabel: 'URLS dos produtos',
    urlsCount: 'x URLS adicionadas',
    clearUrls: 'Limpar URLS',
    attrsLabel: 'Atributos e Importância', 
    attrsCount: 'x atributos definidos',
    clearAttrs: 'Limpar atributos',
    generate: 'Gerar Benchmark',
    results: 'Resultados',
    viewResults: 'Visualizar Pesquisa',
    analysisReady: 'Análise Pronta!',
    analyzing: 'Analisando URLS e atributos definidos...',
    finished: 'Análise concluída ✅',
    noUrls: '(nenhuma URL)',
    noAttrs: '(nenhum atributo)',
    langLabel: 'PT',
    instructions: 'Instruções',
    closeInstructions: 'Fechar',
    noResultsYet: 'Nenhum resultado gerado.',
    error: 'Erro',
    download: 'Baixar Relatório',
    guide: {
      title: '🚀 Guia Rápido: Altus Benchmarking',
      intro: 'Esta ferramenta combina web scraping e Inteligência Artificial para ler páginas de produtos, extrair especificações técnicas e calcular a melhor opção de compra baseada nas suas prioridades.',
      step1: {
        title: '🔑 1. Obter sua Chave de API (Gratuita)',
        text: 'A análise é feita pelo Google Gemini. Para utilizá-lo, é necessária uma chave de acesso:',
        list: [
          'Acesse o Google AI Studio.',
          'Faça login com sua conta Google.',
          'Clique no botão azul "Get API key" ou "Create API key".',
          'Copie o código gerado e cole no campo "Chave API" aqui na ferramenta.'
        ]
      },
      step2: {
        title: '🔗 2. URLs dos Produtos',
        text: 'Cole o link direto da página de venda (Amazon, Magalu, Site Oficial, etc.) e clique no botão +. Adicione até 5 produtos para comparar.'
      },
      step3: {
        title: '⚖️ 3. Atributos e Importância',
        text: 'Defina o que você quer comparar (ex: "Preço", "Bateria", "Câmera").',
        list: [
          'Defina o Peso (1 a 10): Ao lado de cada atributo, escolha a importância dele.',
          'Como funciona a Nota: A IA atribuirá uma nota de 0 a 100 baseada estritamente nesses pesos. Se "Preço" tiver peso 10, um produto barato ganhará muito mais pontos do que um produto caro, mesmo que este tenha outros atributos bons.'
        ]
      }
    }
  },
  en: {
    title: 'Benchmarking Tool',
    apiKey: 'API Key',
    import: 'Import Data',
    export: 'Export Data',
    urlsLabel: 'Product URLs',
    urlsCount: 'x URLs added',
    clearUrls: 'Clear URLs',
    attrsLabel: 'Attributes and Importance',
    attrsCount: 'x attributes defined',
    clearAttrs: 'Clear attributes',
    generate: 'Generate Benchmark',
    results: 'Results',
    viewResults: 'View Research',
    analysisReady: 'Analysis Ready!',
    analyzing: 'Analyzing URLs and defined attributes...',
    finished: 'Analysis completed ✅',
    noUrls: '(no URLs)',
    noAttrs: '(no attributes)',
    langLabel: 'EN',
    instructions: 'Instructions',
    closeInstructions: 'Close',
    noResultsYet: 'No results generated yet.',
    error: 'Error',
    download: 'Download Report',
    guide: {
      title: '🚀 Quick Guide: Altus Benchmarking',
      intro: 'This tool leverages web scraping and AI agents to read product pages, extract technical specs, and calculate the best purchasing option customized to your needs.',
      step1: {
        title: '🔑 1. Get your API Key (Free)',
        text: 'The analysis engine is Google Gemini. To use it, you need an access key:',
        list: [
          'Go to Google AI Studio.',
          'Log in with your Google account.',
          'Click the blue "Get API key" or "Create API key" button.',
          'Copy the generated code and paste it into the "API Key" field here.'
        ]
      },
      step2: {
        title: '🔗 2. Product URLs',
        text: 'Paste the direct link to the sales page (Amazon, BestBuy, Official Site, etc.) and click the + button. Add up to 5 products to compare.'
      },
      step3: {
        title: '⚖️ 3. Attributes and Importance',
        text: 'Define what you want to compare (e.g., "Price", "Battery", "Camera").',
        list: [
          'Define Weight (1 to 10): Next to each attribute, set its importance.',
          'How Scoring Works: The AI gives a score from 0 to 100 based strictly on these weights. If "Price" has weight 10, a cheap product will score significantly higher than an expensive one.'
        ]
      }
    }
  }
};
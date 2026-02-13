#  Altus Benchmarking Pro:

### Parceria : Altus 
Este ecossistema representa uma solução de ponta para a automação de inteligência de mercado. O sistema combina **Agentes de Web Scraping** e **Modelos de Linguagem de Grande Escala (LLM)** para eliminar o trabalho manual de coleta de especificações técnicas, permitindo uma tomada de decisão baseada em dados reais e critérios ponderados.

---

## 1. Arquitetura da Solução
A solução foi desenhada seguindo princípios de separação de responsabilidades (SoC) e processamento assíncrono para garantir escalabilidade.

* **APP (Frontend Orquestrador)**: Interface reativa desenvolvida em **React 19** e **Vite**. Atua como o orquestrador de estado, gerenciando desde a configuração de critérios de peso até a visualização de gráficos comparativos e geração de relatórios executivos.
* **API (Motor de Extração & Inteligência)**: Microserviço em **Python (Flask)** especializado em tarefas de alta latência. Gerencia o pool de navegadores **Playwright** para scraping e a lógica de orquestração de prompts para os motores de IA.

---

## 2. Stack Tecnológica Corporativa

| Componente | Tecnologia | Papel no Ecossistema |
| :--- | :--- | :--- |
| **Interface** | React 19 / Vite | Renderização de alta performance e SPA. |
| **Estilização** | CSS Modules | Design system proprietário focado em produtividade. |
| **Backend** | Flask | Orquestração de rotas e integração de microserviços. |
| **Scraping** | Playwright (Async) | Extração de conteúdo de SPAs e sites dinâmicos. |
| **IA** | Gemini / GPT / DeepSeek | Processamento de linguagem natural e scoring técnico. |

---

## 3. Segurança e Privacidade de Dados
Como uma ferramenta corporativa, a proteção de credenciais é uma prioridade central:

* **Criptografia At-Rest**: As chaves de API dos provedores de IA são criptografadas antes de serem salvas no navegador. Utilizamos a **Web Crypto API** (AES-GCM 256-bit) com chaves derivadas por senha via **PBKDF2**.
* **Decodificação Just-in-Time**: A chave é descriptografada em memória apenas no momento da requisição para a API de análise. Ela nunca é persistida de forma vulnerável no `localStorage`.
* **Bypass de CORS**: A API atua como um proxy seguro, permitindo que o frontend acesse dados de múltiplos domínios sem as restrições de segurança de navegador que bloqueiam o scraping direto.

---

## 4. O Algoritmo de Inteligência (Scoring)
A análise técnica utiliza uma lógica de **Ponderação Técnica Pura**:

* **Importância Relativa**: Cada atributo (Preço, Desempenho, etc.) recebe um peso de 1 a 10 definido pelo usuário.
* **Reliability Penalty**: Se a extração de dados for parcial ou estimada pela IA (marcada como `medium` ou `low`), o sistema aplica penalidades automáticas (10% a 30%) na pontuação final para garantir a integridade do benchmark.
* **Auditoria de IA**: Todas as informações estimadas são marcadas visualmente com a tag `(est.)`, permitindo que o analista humano valide a integridade do dado.

---

## 5. Estrutura do Monorepo
```text
.
├── API/              # Backend Python (Lógica de Negócio e IA)
│   ├── routes/       # Endpoints REST
│   ├── services/     # Motor de Scrapping e Integração LLM
│   └── requirements.txt
├── APP/              # Frontend React (Dashboard e UI)
│   ├── src/          # Componentes, Hooks e Utilitários
│   └── package.json  
└── README.md         # Documentação Master
```

---

## 6. Guia de Início Rápido

### **Pré-requisitos**
* Python 3.12+
* Node.js 18+
* Playwright Browsers (`playwright install chromium`)

### **Execução Local**
1.  **Backend**:
    ```bash
    cd API && pip install -r requirements.txt
    python app.py
    ```
2.  **Frontend**:
    ```bash
    cd APP && npm install
    npm run dev
    ```

---
*Documentação gerada para o projeto Altus Benchmarking Pro.*

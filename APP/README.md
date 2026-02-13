# Altus Benchmarking Pro: Frontend App

### **Interface Executiva e Orquestração de Dados**
Este módulo é o ponto de interação do ecossistema Altus Benchmarking. Desenvolvido com **React 19**, o foco da aplicação é entregar uma experiência de Single Page Application (SPA) fluida, segura e de alto desempenho para a tomada de decisão corporativa.

---

## Stack Tecnológica

* **Core**: React 19 (Hooks, Context API)
* **Build Tool**: Vite (Performance otimizada)
* **Comunicação**: Axios (Integração com a API de Scrapping)
* **Segurança**: Web Crypto API (AES-GCM 256-bit)
* **Icons**: Lucide React

---

## Funcionalidades e Views

A aplicação é organizada em um fluxo de visualizações dinâmicas gerenciadas por estado:

1.  **Welcome Screen**: Tela de onboarding para captura do perfil do consultor.
2.  **Intelligence Dashboard**: Central de controle com KPIs (Tempo economizado, ganho de eficiência) e histórico de análises recentes.
3.  **Análise Técnica**: Interface para inserção de URLs e definição de pesos (1 a 10) para os atributos de comparação.
4.  **Relatório Executivo**: View otimizada para apresentação de resultados, destacando a "Melhor Escolha" com base no algoritmo de IA.

---

## Segurança de Credenciais (Web Crypto API)

Para garantir a privacidade das operações da Altus, o app implementa um sistema de proteção de Chaves de API:
* **Criptografia Local**: As chaves são criptografadas com uma senha definida pelo usuário antes de serem persistidas no navegador.
* **Proteção PBKDF2**: Utilizamos derivação de chave robusta para garantir que a senha do usuário não seja armazenada, apenas o hash necessário para decriptação em tempo de execução (JIT).

---

## Internacionalização (i18n)

O sistema possui suporte nativo e troca a quente (hot-swap) para dois idiomas:
* **Português (PT-BR)**
* **Inglês (EN)**

---

## Estrutura de Pastas

```text
/src
├── components/     # Componentes de UI (Cards, Modais, Header)
├── constants/      # Arquivos de tradução e configurações fixas
├── hooks/          # Lógica de negócio e integração (useBenchmarking)
├── utils/          # Criptografia, manipulação de arquivos e histórico
└── App.jsx         # Orquestrador central da aplicação
```

---

## Como Rodar

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Certifique-se de que o módulo **API** está rodando na porta 5000 para que as análises funcionem.

---
*Módulo desenvolvido para o projeto Altus Benchmarking Pro.*

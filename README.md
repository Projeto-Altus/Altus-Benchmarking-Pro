## Unisinos São Leopoldo

# <img src="assets/app.ico" width="32" height="32"> Altus Benchmarking Pro

**A solução definitiva para automação de inteligência de mercado e comparação técnica de produtos.**

O **Altus Benchmarking Pro** representa uma solução de ponta para a automação de inteligência de mercado. O sistema combina **Agentes de Web Scraping** e **Modelos de Linguagem de Grande Escala (LLM)** para eliminar o trabalho manual de coleta de especificações técnicas, permitindo uma tomada de decisão baseada em dados reais e critérios ponderados.

---

## 📥 Como Baixar e Usar (Guia do Usuário Final)

Para utilizar a ferramenta no seu computador Windows, siga estes passos simples:

1.  **Acesse as Versões Oficiais**: No menu lateral direito deste repositório, clique na seção [**Releases**](https://github.com/Projeto-Altus/Benchmarking-Tool/releases).
2.  **Escolha a Versão**: Localize a versão mais recente (ex: `v1.0.1`).
3.  **Baixe o Instalador**: Dentro da aba **Assets**, clique no arquivo executável, geralmente nomeado como `Altus.Benchmarking.Pro.Setup.1.0.1.exe`.
4.  **Instalação**: Execute o arquivo baixado e siga as instruções na tela. O aplicativo será instalado e um atalho será criado na sua Área de Trabalho.
  * ⚠️ **Aviso do Windows SmartScreen**: Por ser um software independente e recém-lançado, o Windows pode exibir o alerta *"O Windows protegeu o seu PC"*. Caso isso ocorra, clique em **"Mais informações"** e, em seguida, no botão **"Executar assim mesmo"** para prosseguir com a instalação automática.
6.  **Uso Inicial**: 
    * Abra o App e insira sua **Chave de API** (OpenAI, Gemini ou DeepSeek) nas configurações. Suas chaves são criptografadas localmente para sua segurança.
    * Cole as URLs dos produtos que deseja comparar e defina os pesos para cada atributo.
    * Clique em **Analisar** e aguarde o processamento em tempo real.

---

## 🎓 Entrega Final - Materiais Obrigatórios

Acesse abaixo a documentação completa exigida para a banca (Prazo: 20/02/2026):

* 📁 [Apresentação Parcial (11/11/2025)](./FINAL_SUBMISSION/Apresentação-Parcial.pdf) 
* 📄 [Especificação de Requisitos e UML](./FINAL_SUBMISSION/Especificação-de-Requisitos-Altus-Benchmarking-Pro.pdf) 
* 🎥 [Vídeo Demonstrativo (Funcionalidades)](./FINAL_SUBMISSION/Demo-Altus-Benchmarking-Pro.mp4) 
* 📊 [Apresentação Final](./FINAL_SUBMISSION/Apresentação-Final-Altus-Benchmarking-Pro.pdf) 

## 🛠️ Arquitetura da Solução (Informações Técnicas)

A solução foi desenhada seguindo princípios de separação de responsabilidades (SoC) e processamento assíncrono para garantir escalabilidade.

### 1. Componentes do Ecossistema
* **APP (Interface Orquestradora)**: Desenvolvida em **React 19** e **Vite**, encapsulada pelo **Electron**. Atua como o orquestrador de estado, gerenciando desde a configuração de critérios até a geração de relatórios.
* **API (Motor de Inteligência)**: Microserviço em **Python (Flask)** especializado em tarefas de alta latência. Gerencia o pool de navegadores **Playwright** e a lógica de orquestração de prompts.
* **Navegador Embutido**: O sistema utiliza uma instância dedicada do Chromium (aprox. 900MB) armazenada na pasta de recursos para garantir que o scraping funcione independente do navegador instalado no PC do usuário.

### 2. Stack Tecnológica Corporativa
| Componente | Tecnologia | Papel |
| :--- | :--- | :--- |
| **Shell Desktop** | Electron 34 | Distribuição nativa Windows. |
| **Interface** | React 19 / Vite | Renderização de alta performance. |
| **Backend** | Flask | Orquestração de rotas e microserviços. |
| **Scraping** | Playwright (Async) | Extração de conteúdo de sites dinâmicos. |
| **IA** | Gemini / GPT / DeepSeek | Processamento de linguagem natural e scoring técnico. |

### 3. Segurança e Privacidade
* **Criptografia At-Rest**: As chaves de API são criptografadas via **Web Crypto API** (AES-GCM 256-bit) com chaves derivadas via **PBKDF2**.
* **Proxy de Segurança**: A API atua como um proxy, permitindo o acesso a dados de múltiplos domínios sem as restrições de CORS que bloqueiam o scraping direto no navegador.

### 4. O Algoritmo de Scoring (Ponderação Técnica)
* **Importância Relativa**: Atributos recebem pesos de 1 a 10 definidos pelo usuário.
* **Reliability Penalty**: Se a extração for parcial ou marcada como baixa confiabilidade pela IA, aplicam-se penalidades automáticas (10% a 30%) na pontuação final.
* **Auditoria**: Informações estimadas são marcadas visualmente com a tag `(est.)`.

---

## 📂 Estrutura do Monorepo

```text
.
├── API/              # Backend Python (Lógica de Negócio e IA)
│   ├── routes/       # Endpoints REST
│   └── services/     # Motor de Scrapping e Integração LLM
├── APP/              # Frontend React & Electron
│   ├── resources/    # Binários da API e Playwright Browsers
│   └── src/          # Componentes da Interface
└── assets/           # Identidade visual do projeto
```

---

*Documentação gerada para o projeto Altus Benchmarking Pro.*

**Desenvolvido por:<br>**
*Alice Silveira da Rocha Eibel<br>*
*Arthur Rafael da Costa Palma<br>*
*Isadora Luiza Kampff<br>*
*Ivan Santos Vieira Junior<br>*
*Maiara Adriana Oliveira*

# 🧠 Benchmarking Tool API

Este é o **backend da Ferramenta de Benchmarking**, desenvolvido com o microframework **Flask** e utilizando **Pydantic** para validação de dados.

---

## 🚀 Como Começar

Siga os passos abaixo para configurar e executar a API localmente.

---

### 🧩 Pré-requisitos

- Python **3.8+**
- `pip` instalado
- Recomendado: uso de ambiente virtual (`venv`)

---

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Projeto-Altus/Benchmarking-Tool
cd Benchmarking-Tool
```

---

### 2️⃣ Instalar Dependências

Todas as dependências necessárias estão listadas no arquivo **requirements.txt**.

```bash
cd .\API\
pip install -r requirements.txt
```

---

### 3️⃣ Executar a Aplicação

Para garantir que o Python reconheça a estrutura de pacotes (como `routes`, `services`, `dtos`), o projeto deve ser executado como um **módulo**.

A partir do diretório raiz (`Benchmarking-Tool`):

```bash
python -m API.app
```

Se tudo estiver configurado corretamente, a API será iniciada no modo de desenvolvimento, geralmente acessível em:

**http://127.0.0.1:5000/**

---

## 🗺️ Endpoints Implementados até o momento

| Método | URL              | Descrição                                                                 |
|:-------:|------------------|--------------------------------------------------------------------------|
| `GET`  | `/`              | Retorna o status da API (`"Benchmarking Tool API is running."`).         |
| `POST` | `/api/scrape`    | Inicia a tarefa de scraping. Requer `links` (lista de URLs) e `attributes` (lista de strings) no corpo JSON. |
| `GET`  | `/api/export`    | Endpoint para exportar dados (XLSX, etc.).  (FUTURAMENTE)                              |


## 🧑‍💻 Tecnologias Principais

- **Flask** — microframework web
- **Pydantic** — validação e tipagem de dados



# Gerador de Currículo Profissional PDF 🚀

Uma solução full-stack moderna para criação de currículos profissionais, focada em design premium, acessibilidade e facilidade de uso.

## ✨ Funcionalidades

- **Formulário Multi-etapas**: Interface fluida dividida em 5 categorias (Pessoal, Objetivo, Formação, Experiência, Habilidades).
- **Acessibilidade (WCAG)**: Totalmente navegável via teclado, com suporte a leitores de tela e link de "pular para conteúdo".
- **Design de PDF Premium**: Layout de duas colunas com cabeçalho moderno e foto de perfil.
- **Upload de Foto**: Suporte para foto de perfil com processamento local (Base64).
- **Seleção Inteligente de Localização**: Integração em tempo real com a API do IBGE para escolha de Estado e Cidade.
- **i18n Ready**: Arquitetura preparada para múltiplos idiomas (atualmente em Português).
- **SEO & GEO**: Otimizado para motores de busca e IAs (Schema.org JSON-LD).

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React (Vite)**
- **Tailwind CSS v4**
- **Context API** (Gerenciamento de Estado)

### Backend
- **Node.js + Express**
- **Puppeteer** (Renderização de PDF de alta fidelidade)

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v18+)
- NPM ou Yarn

### 1. Configurar o Backend
```bash
cd backend
npm install
node server.js
```
O servidor rodará em `http://localhost:3001`.

### 2. Configurar o Frontend
```bash
cd frontend
npm install
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`.

## 📁 Estrutura do Projeto

```text
/
├── backend/
│   ├── routes/          # Rotas da API
│   ├── services/        # Lógica de geração de PDF (Puppeteer)
│   ├── templates/       # Template HTML/CSS do currículo
│   └── server.js        # Ponto de entrada Express
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes das etapas do formulário
│   │   ├── context/     # Gerenciamento de estado global
│   │   ├── i18n/        # Centralização de textos/traduções
│   │   └── App.jsx      # Componente principal
│   └── index.html       # Entrada com metadados SEO/GEO
└── README.md
```

## 📄 Licença
Este projeto foi desenvolvido como uma demonstração técnica de uma aplicação full-stack moderna.

---

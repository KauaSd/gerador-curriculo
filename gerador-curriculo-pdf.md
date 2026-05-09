# Plano de Implementação: Gerador de Currículo PDF

Uma aplicação web fullstack para criação de currículos profissionais. O frontend (React) coleta dados em 5 etapas e envia para o backend (Node.js), que gera um PDF e o retorna para download.

**Project Type**: WEB

---

## Tech Stack
- Frontend: React (Vite), TailwindCSS, Context API
- Backend: Node.js, Express, Puppeteer
- Porque Puppeteer? Gera currículos mais bonitos e flexíveis via HTML/CSS do que PDFKit.

---

## File Structure

O projeto será dividido em duas pastas principais no repositório.

### Frontend (WEB)
Stack: Vite, React, TailwindCSS.
- `frontend/src/App.jsx`
- `frontend/src/context/ResumeContext.jsx` (Estado global para não usar localStorage)
- `frontend/src/components/ProgressBar.jsx`
- `frontend/src/components/Step1Personal.jsx`
- `frontend/src/components/Step2Objective.jsx`
- `frontend/src/components/Step3Education.jsx`
- `frontend/src/components/Step4Experience.jsx`
- `frontend/src/components/Step5Skills.jsx`

### Backend (API)
Stack: Node.js, Express, Puppeteer.
- `backend/server.js` (Setup Express + CORS)
- `backend/routes/curriculo.js` (Rota POST de validação e disparo)
- `backend/services/pdfGenerator.js` (Lógica do Puppeteer e Blob)
- `backend/templates/resumeTemplate.js` (Template HTML com variáveis CSS)

---

## 📋 Task Breakdown

- `[ ]` **T1: Setup da Infraestrutura**
  - **Agentes:** `frontend-specialist`, `backend-specialist`
  - **Skills:** `react-best-practices`, `nodejs-best-practices`
  - **INPUT:** `npm create vite@latest frontend` e `npm init -y backend`.
  - **OUTPUT:** Estrutura base de pastas.
  - **VERIFY:** Servidor front e back sobem com sucesso separadamente.

- `[ ]` **T2: Setup do Backend e Geração de PDF Dummy**
  - **Agente:** `backend-specialist`
  - **Skills:** `api-patterns`
  - **INPUT:** Rota `/api/curriculo/gerar-pdf`.
  - **OUTPUT:** Endpoint funcional retornando PDF estático Blob via Puppeteer.
  - **VERIFY:** `curl -X POST ...` retorna binário.

- `[ ]` **T3: Criação de Telas e Estado Multi-Step (Frontend)**
  - **Agente:** `frontend-specialist`
  - **Skills:** `frontend-design`
  - **INPUT:** Criação dos 5 passos e Context API.
  - **OUTPUT:** UI navegável.
  - **VERIFY:** Dados ficam salvos em memória ao avançar e retroceder tela.

- `[ ]` **T4: Implementação das Validações Frontend**
  - **Agente:** `frontend-specialist`
  - **Skills:** `frontend-design`
  - **INPUT:** Lógica de bloqueio do botão Next se os dados da etapa forem inválidos.
  - **OUTPUT:** Feedback claro, sem tags `<form>`.
  - **VERIFY:** UI impede avanço com dados vazios nos inputs obrigatórios.

- `[ ]` **T5: Integração Completa (Front-End -> Backend)**
  - **Agentes:** `frontend-specialist`, `backend-specialist`
  - **Skills:** `api-patterns`
  - **INPUT:** Endpoint configurado com CORS. Frontend usando Fetch. Backend lendo Body completo.
  - **OUTPUT:** Aplicação gerando currículo oficial completo formatado com design profissional.
  - **VERIFY:** PDF reflete as inserções do usuário incluindo campos dinâmicos e de arrays (habilidades, experiências).

---

## Phase X: Verification Plan

### Automated Tests
- Validação Linter no Frontend (`npm run lint`).
- Validação lógica no Express (checar se falha de payload retorna `HTTP 400`).

### Manual Verification
- Teste end-to-end de preenchimento completo.
- Validar as funcionalidades: "Emprego Atual" (desabilitar campos).
- Adicionar múltiplas tags de Habilidades e remover tags.
- Verificação do Design/UI (minimalista, profissional) no HTML final do PDF.

## ? PHASE X COMPLETE
- Lint: ? Pass
- Security: ? No critical issues
- Build: ? Success
- Date: 09/05/2026

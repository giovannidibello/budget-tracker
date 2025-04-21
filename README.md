# 💰 Budget Tracker - WebApp con React & Express

Applicazione full-stack per monitorare le **entrate** e le **uscite** mensili, con **grafico riepilogativo** e interfaccia user-friendly.  
Frontend sviluppato in React + Bootstrap, backend Node.js con Express e MySQL.

## 🖥️ Tecnologie utilizzate

**Frontend - [webapp-react](https://github.com/giovannidibello/budget-tracker/tree/main/frontend):**

- React
- React Router
- React-Bootstrap
- Chart.js (per il grafico a barre)
- Date-fns

**Backend - [webapp-express](https://github.com/giovannidibello/budget-tracker/tree/main/backend):**

- Node.js
- Express
- MySQL
- CORS
- Dotenv

## 📸 Preview

![Anteprima GIF](.frontend/public/BudgetTrackerPreview.gif)  
> Demo dell’interfaccia con visualizzazione delle funzioni.

## 📁 Struttura del Progetto

budget-tracker/ ├── webapp-react/ │ ├── public/ │ │ ├── gif.gif # Demo animata del progetto │ │ └── ... │ ├── src/ │ │ ├── components/ # AddTransactionForm, MonthlyBarChart, ecc. │ │ ├── context/ # GlobalContext.jsx │ │ ├── layouts/ # DefaultLayout.jsx │ │ ├── pages/ # HomePage, IncomePage, ExpensePage │ │ ├── App.jsx │ │ └── index.js │ ├── .env │ └── README.md │ ├── webapp-express/ │ ├── controllers/ # BudgetController.js │ ├── data/ # db.js │ ├── middlewares/ # error handler, not found, etc. │ ├── routers/ # budgetRouter.js │ ├── public/ │ ├── .env │ └── server.js

## 🚀 Avvio del progetto

### 1. Backend (Express)

```bash
cd webapp-express
npm install
cp .env.example .env
# Modifica il file .env con le credenziali DB
npm start

cd webapp-react
npm install
npm run dev

## 🎯 Funzionalità

- ✅ Visualizzazione mensile di **entrate**, **uscite** e **cash flow**
- ✅ Navigazione tra mesi e pagine dettagliate
- ✅ Aggiunta di nuove transazioni tramite form modale
- ✅ Eliminazione delle transazioni
- ✅ **Grafico a barre** per il riepilogo visivo mensile
- ✅ Interfaccia responsive e moderna con **React-Bootstrap**
- ✅ Connessione al database MySQL tramite backend Express
- ✅ Codice organizzato in componenti riutilizzabili

## 🧠 Obiettivi didattici

- 📌 Applicare **React Context API** per la gestione dello stato globale
- 📌 Utilizzare **React Router** per la navigazione SPA
- 📌 Creare un backend RESTful con **Express**
- 📌 Effettuare chiamate asincrone con `fetch` per interagire con le API
- 📌 Progettare e gestire un database relazionale in **MySQL**
- 📌 Separare logicamente frontend e backend in due repository

## 👨‍💻 Autore

- Giovanni Di Bello  
- [GitHub](https://github.com/giovannidibello)

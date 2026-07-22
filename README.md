# TradeSense

TradeSense is a full-stack stock market analytics platform that provides real-time market data, portfolio management, watchlist tracking, and AI-powered market insights. The application is built using FastAPI and React with a modular architecture designed for scalability, maintainability, and production deployment.

The project integrates multiple financial data providers and presents actionable insights through an interactive dashboard.

---

# Features

- Real-time Market Overview
- Stock Search and Analysis
- Portfolio Management
- Watchlist Management
- Interactive Price Charts
- Top Gainers and Top Losers
- Global Market Indices
- Cryptocurrency Tracking
- AI-powered Market Insights
- JWT Authentication
- RESTful API Architecture
- Docker Support

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Redis
- JWT Authentication

## External APIs

- Yahoo Finance
- Finnhub
- Alpha Vantage
- Gemini AI

---

# Project Structure

```
TradeSense
│
├── backend
│   ├── api
│   │   ├── clients
│   │   ├── routers
│   │   ├── services
│   │   ├── models
│   │   ├── schemas
│   │   ├── middleware
│   │   └── main.py
│   │
│   ├── database
│   ├── config
│   ├── utils
│   └── tests
│
├── frontend-v2
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── services
│   │   ├── layouts
│   │   ├── context
│   │   └── assets
│   │
│   └── public
│
├── docker
├── config
├── scripts
├── docs
│
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── README.md
```

---

# System Architecture

```
                    User
                     │
                     ▼
              React Frontend
                     │
         REST API Requests (Axios)
                     │
                     ▼
             FastAPI Backend
                     │
     ┌───────────────┼────────────────┐
     │               │                │
     ▼               ▼                ▼
 Authentication   Business Logic   Market Services
     │               │                │
     └───────────────┼────────────────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 PostgreSQL       Redis Cache    External APIs
                                    │
         ┌──────────┼──────────────┐
         ▼          ▼              ▼
   Yahoo Finance  Finnhub     Alpha Vantage
                                    │
                                    ▼
                               Gemini AI
```

---

# Request Flow

```
User

↓

React Application

↓

Axios HTTP Request

↓

FastAPI Router

↓

Service Layer

↓

External APIs / Database

↓

Data Processing

↓

JSON Response

↓

React Components

↓

Dashboard Rendering
```

---

# Application Workflow

1. The user interacts with the React frontend.
2. The frontend sends REST API requests to the FastAPI backend.
3. FastAPI validates authentication and request parameters.
4. Business services fetch data from databases or external financial APIs.
5. Market data is processed and standardized.
6. AI services generate additional insights where applicable.
7. The backend returns structured JSON responses.
8. React updates the UI with charts, tables, and analytics.

---

# Installation

## Clone Repository

```bash
git clone https://github.com/kuldeepbana200/TradeSense.git

cd TradeSense
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn api.main:app --reload
```

---

## Frontend

```bash
cd frontend-v2

npm install

npm run dev
```

---

## Docker

```bash
docker compose up --build
```

---

# Future Improvements

- AI-based Buy/Sell Recommendations
- Technical Indicator Dashboard
- News Sentiment Analysis
- Portfolio Performance Analytics
- Paper Trading
- Real-time WebSocket Streaming
- Mobile Responsive Dashboard
- Notification System

---

# License

This project is licensed under the MIT License.

---

# Author

Kuldeep Singh Rajput

GitHub: https://github.com/kuldeepbana200

LinkedIn: *(Add your LinkedIn URL)*

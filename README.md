# 🌍 WorldWise — Travel Journal

A single-page application that lets you track every city you've ever visited on an interactive world map. Click anywhere on the map, fill in a quick note and date, and your trip is saved.

## 🚀 Live Demo

👉 [https://worldwise-karma.netlify.app/](https://worldwise-karma.netlify.app)

---

## ✨ Features

- **Interactive world map** powered by Leaflet — click any location to start logging a visit
- **Add cities** with a custom date picker and personal notes
- **Remove cities** from your list with a single click
- **Cities & Countries tabs** — browse your travel history two ways
- **Geolocation** — a "Use my location" button auto-centers the map on where you are right now
- **URL-driven state** — city details are stored in the URL, so views are shareable and bookmarkable
- **Fake authentication** — protected routes with a mock login flow
- **Lazy loading** — route-level code splitting for faster initial loads

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| State management | Context API + `useReducer` |
| Map | Leaflet + React-Leaflet |
| Date picker | react-datepicker |
| Mock backend | json-server |
| Build tool | Vite |
| Linting | ESLint |
| Deployment | Vercel |

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16
- npm

### Installation
```bash
git clone https://github.com/karmartir/11-worldwise.git
cd 11-worldwise
npm install
```

### Running the app

You need to run both the Vite dev server and the json-server mock API at the same time. The easiest way:
```bash
npm run dev:all
```

Or run them separately in two terminals:
```bash
# Terminal 1 — Vite dev server
npm run dev

# Terminal 2 — json-server mock API (port 9000)
npm run server
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure
```
src/
├── components/       # Reusable UI components (Map, CityList, Form, etc.)
├── contexts/         # CitiesContext and AuthContext (Context API + useReducer)
├── hooks/            # Custom hooks (useGeolocation, useUrlPosition, etc.)
├── pages/            # Route-level page components
└── main.jsx          # App entry point
data/
└── cities.json       # Mock database consumed by json-server
```

---

## 🔑 Fake Login Credentials

The app uses a mock authentication system — no real backend required.

| Field | Value |
|---|---|
| Email | `jack@example.com` |
| Password | `qwerty` |

---

## 📚 What I Practised

- React Router v6: nested routes, `useParams`, `useSearchParams`, `useNavigate`
- Storing UI state in the URL as search params
- Context API with `useReducer` as a lightweight global state solution
- Protected routes and a fake auth flow
- Lazy loading with `React.lazy` and `Suspense`
- Geolocation API integration
- Custom hooks for reusable logic
- Running a mock REST API with json-server alongside Vite

---

## 🙏 Credits

Project built from scratch following the course material by [Jonas Schmedtmann](https://github.com/jonasschmedtmann).

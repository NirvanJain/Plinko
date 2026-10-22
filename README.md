# Plinko

A small full-stack Plinko simulation and game built with React, Vite, and Express. The project has a browser-based visual simulator, a playable game flow, and a backend endpoint that generates random Plinko outcomes with multipliers.

## Overview

This app lets you:

- view an animated Plinko board on the home page
- simulate a large number of ball drops and track landing counts
- play a "drop ball" mini-game where each drop gets a server-generated outcome
- inspect the probability distribution and multiplier mapping used by the game

## Tech stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Visualization: HTML canvas animation

## Project structure

- [backend](backend): Express API and game logic
- [frontend](frontend): React application and Plinko UI
- [version-1](version-1): earlier static prototype

## Game logic

The backend exposes a POST endpoint at `/game`:

- generates a random left/right path pattern over 16 drops
- counts how many times the ball falls to the right
- maps that outcome to a multiplier
- returns a result point and the pattern for rendering

The frontend uses the returned payload to animate a ball landing in a sink, then displays the recent results and multiplier values.

## Getting started

### 1. Install backend dependencies

```bash
cd backend
npm install
npm run build
```

### 2. Start the backend

```bash
cd backend
npm run start
```

This starts the API on http://localhost:3000.

### 3. Install frontend dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 4. Configure the frontend API URL

Create a `.env` file in the frontend folder if needed:

```env
VITE_API_URL=http://localhost:3000
```

If you skip this, the app uses the default value `http://localhost:3000`.

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

- http://localhost:5173

## Routes

The frontend includes three pages:

- `/` — landing page with the Plinko board and quote section
- `/simulation` — drop balls and track counts by sink
- `/game` — interactive game mode that calls the backend for each ball

## Backend endpoint

### POST /game

Request body:

```json
{ "data": 1 }
```

Response shape:

```json
{
  "point": 4,
  "multiplier": 1.4,
  "pattern": ["L", "R", "R", "L", "R", "R", "L", "L", "R", "R", "L", "R", "L", "R", "L", "R"]
}
```

Where:

- `point` is the sink index/landing point
- `multiplier` is the payout multiplier associated with that sink
- `pattern` is the path of left/right decisions from the backend

## Notes

- The backend is intentionally lightweight and does not persist game data.
- The frontend expects the backend to be running before using the playable game route.
- The app is designed as a front-end prototype/demo rather than a production gambling system.

## Useful scripts

### Backend

```bash
cd backend
npm run build
npm run start
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## License

This project is currently unlicensed unless otherwise specified in the repository.

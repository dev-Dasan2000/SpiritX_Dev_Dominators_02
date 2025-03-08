# SpiritX_Dev_Dominators_02
  A secure and user-friendly cricket player selection to create a team for cricket tournment

## Table of Contents
- [Overview](#overview)
- [Instructions to Run the Project](#instructions-to-run-the-project)
- [Database Setup and Configuration](#database-setup-and-configuration)
- [Assumptions](#assumptions)
- [Usage](#usage)
- [Additional Features](#additional-features)
- [Guidelines for Stage 2](#guidelines-for-stage-2)
- [Contribution](#contribution)

## Overview
The **Ultimate Inter-University Fantasy Cricket Game** is a cutting-edge fantasy sports platform where users can create and manage cricket teams, competing on a real-time leaderboard. The system comprises three core modules:

- **Admin Panel**: Manage players, statistics, and the overall game logic.
- **User Interface**: Allow users to build teams, track their budget, and monitor the leaderboard.
- **AI Chatbot (Spiriter)**: Assist users with player insights and team selection.

## 1.Key Features
- **Admin Panel**: Player CRUD operations, real-time updates, and tournament summaries.
- **User Interface**: Team selection, budget tracking, and dynamic leaderboard.
- **AI Chatbot (Spiriter)**: Provides player insights and team-building suggestions.

## 2.Tech Stack
- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL

---

## Instructions to Run the Project

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 18.x.x)
- PostgreSQL (>= 15.x.x)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fantasy-cricket-game
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/fantasy_cricket
NEXT_PUBLIC_API_URL=http://localhost:3001
ADMIN_SECRET=<your-admin-secret>
JWT_SECRET=<your-jwt-secret>
```

### 3. Install Dependencies
```bash
npm install
```

##  Development Server

Open two terminals and follow these steps:

1. **Frontend (Next.js)**

```bash
cd frontend
npm run dev
```
2. **Backend (Node.js)**

```bash
cd backend
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Admin Panel

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Authentication: Use `ADMIN_SECRET`.

Admin Capabilities:
1. CRUD operations for players.
2. Real-time player statistics updates.
3. Tournament summary (runs, wickets, top players).

---

## Database Setup and Configuration
Ensure PostgreSQL is running, then:

1. Create the `fantasy_cricket` database:

```sql
CREATE DATABASE fantasy_cricket;
```

2. Run database migrations:
```bash
npm run migrate
```

3. Seed initial data:
```bash
npm run seed
```

Alternatively, import the provided database dump:
```bash
psql -U <user> -d fantasy_cricket -f database_dump.sql
```

---

## User Interface

### Key Views:
1. **Players**: List of all available players (without point details).
2. **Select Team**: Pick 11 players under a budget of Rs.9,000,000.
3. **Your Team**: View your selected team and points.
4. **Budget Tracker**: Monitor your spending in real time.
5. **Leaderboard**: Displays user rankings, highlighting the current user.

### Authentication:
Users must register and log in using a username and password.

---

##  AI Chatbot (Spiriter)
- Provides player insights and statistics.
- Suggests optimal team configurations.
- Handles unknown queries with a fallback message.

Access the chatbot via the "Spiriter" button.

---

## Assumptions
1. Users can only select players from the provided dataset.
2. Team selection must stay within the Rs.9,000,000 budget.
3. Admin operations require secure token-based access.
4. Real-time updates apply to both admin and user views.
5. Users cannot view player points before selection.
6. The leaderboard highlights the logged-in user's position.
7. AI chatbot cannot reveal player points under any circumstance.

---

## Additional Features
- Fully responsive UI for all devices.
- Dynamic point calculation and automatic value updates.
- Real-time leaderboard with auto-refresh.
- AI-assisted team selection.
- Automatic team completeness tracker (e.g., "7/11 players selected").

---

## Guidelines for Stage 2
1. Ensure real-time updates reflect across all components without page refresh.
2. Implement advanced chatbot capabilities for improved team suggestions.
3. Maintain robust authentication for admin and user operations.
4. Ensure accurate tracking of player stats and budget during team selection.
5. Provide clear error messages for invalid actions.
6. Ensure the leaderboard updates dynamically with real-time points.
7. Document any new features or changes in this README.

---

## Contribution
## Authors

- [iamindunil](https://www.github.com/imaindunil)
- [dev-Dasan2000](https://www.github.com/dev-Dasan2000)
- [Dilesh99](https://www.github.com/Dilesh99)
- [RWSandaru8](https://www.github.com/RWsandaru8)
- [NaveenSandaru](https://www.github.com/NaveenSandaru)

---







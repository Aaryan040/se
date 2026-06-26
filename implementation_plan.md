# MERN Stack Membership Dashboard - Implementation Plan

This plan outlines the architecture, design, and step-by-step creation of the **Membership Dashboard** take-home assignment.

We will build a high-performance, visually gorgeous web application using the **MERN** stack:
- **MongoDB Atlas**: Cloud database for member records and baseline statistics.
- **Express.js & Node.js**: Backend REST API.
- **React.js (Vite) & Tailwind CSS v3**: Premium frontend using Tailwind CSS utility classes, class-based dark mode, and smooth transitions.

---

## User Review Required

> [!IMPORTANT]
> - **MongoDB Atlas**: We will configure the backend to use MongoDB Atlas. The connection string will be loaded from a backend `.env` file (e.g., `MONGO_URI=mongodb+srv://...`). We will fall back gracefully or show a clear warning on startup if the URI is not configured.
> - **Real-time Stats Baseline**: To meet the precise UI requirements (Active: 1243, Revenue: $18,700, Signups Today: 23) while keeping database storage small, we will implement a dynamic stats calculator. When a user adds an Active member, the counts will instantly increment from this baseline (e.g., Active: 1244, Revenue: $18,715).
> - **Theme System**: We will implement a dark/light mode toggle utilizing Tailwind CSS's class-based dark mode (`dark:` modifier). The default view will be a modern, rich dark theme (glassmorphic cards, indigo-to-violet gradients, and smooth active transitions).

---

## Proposed Changes

We will create a clean mono-repo structure in the workspace root:
- `backend/`: Express server, mongoose connection, API routes, controller logic, and seed scripts.
- `frontend/`: Vite React application configured with Tailwind CSS v3 for a responsive utility-first design.

### Backend Component

We will create a Node/Express backend that manages database persistence.

#### [NEW] [package.json](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/backend/package.json)
Contains backend script definitions and dependencies: `express`, `mongoose`, `cors`, `dotenv`, and `nodemon` (for dev mode).

#### [NEW] [db.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/backend/config/db.js)
Database connection helper using Mongoose.

#### [NEW] [Member.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/backend/models/Member.js)
Mongoose schema for `Member`. Fields:
- `name`: String, required, validated.
- `email`: String, required, unique, lowercased, validated.
- `membershipType`: String, enum: `['Free', 'Premium', 'VIP']`.
- `status`: String, enum: `['Active', 'Pending', 'Inactive']`.
- `createdAt`: Date, default `Date.now`.

#### [NEW] [seed.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/backend/seed.js)
A seed script to clear the DB and insert 10 initial members representing different membership tiers and statuses. This ensures the table is populated when the app runs for the first time.

#### [NEW] [server.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/backend/server.js)
Express server entrypoint defining CORS configurations, middlewares, routes, and error handling.
Routes:
- `GET /api/members`: Fetches members with optional query parameters `search` (name or email), `type`, `status`, `sortBy`, and `sortOrder`.
- `POST /api/members`: Creates a new member with validation.
- `DELETE /api/members/:id`: Deletes a member.
- `GET /api/stats`: Dynamic dashboard aggregates (base active members count = 1240, base revenue = $18,600, base signups = 20, plus dynamic calculations from DB data).

---

### Frontend Component

We will create a Vite React frontend in the `frontend/` directory.

#### [NEW] [tailwind.config.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/tailwind.config.js)
Tailwind CSS configuration file defining custom fonts (Inter), custom colors, transition utilities, and the class-based dark mode selector.

#### [NEW] [postcss.config.js](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/postcss.config.js)
PostCSS configuration for compiling Tailwind utility classes.

#### [NEW] [index.css](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/src/index.css)
Global entrypoint containing Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) along with custom glassmorphism styles and fonts.

#### [NEW] [App.jsx](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/src/App.jsx)
Main entry component holding the dashboard layout. Manages the active members data, filters, stats state, theme toggles, and modal states.

#### [NEW] [StatsGrid.jsx](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/src/components/StatsGrid.jsx)
A grid of stats cards showing:
- Active Members
- Total Revenue
- New Signups Today
Each card has micro-animations, premium gradient borders, and visual icons.

#### [NEW] [MemberForm.jsx](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/src/components/MemberForm.jsx)
Form component for adding new members with robust validation (email validation, name length validation, fields selection).

#### [NEW] [MemberList.jsx](file:///c:/Users/PREETI%20KUMARI/OneDrive%20-%20nsut.ac.in/Desktop/se/frontend/src/components/MemberList.jsx)
The list/table displaying members with dynamic search, filters (Type, Status), and sorting (Name, Join Date).

---

## Verification Plan

### Automated Tests
- Run `npm run test` or check backend APIs using cURL/Postman commands.
- We will write a small API test script in `backend/test.js` using standard node assert libraries to verify GET and POST endpoints without external testing frameworks to keep things lightweight.

### Manual Verification
1. Open the app in browser.
2. Verify visual appearance in dark mode and light mode.
3. Test search filter (typing "John" or "john@example.com").
4. Test filtering by Membership Type ("VIP", "Premium") and Status ("Active", "Pending").
5. Test sorting members list by "Name A-Z" and "Date Joined".
6. Add a new member (e.g. "Jane Doe", "jane@example.com", VIP, Active).
   - Ensure the new member is added instantly to the table list.
   - Verify that "Active Members", "Total Revenue", and "New Signups Today" increment automatically.
7. Test deleting a member and checking that stats adjust accordingly.

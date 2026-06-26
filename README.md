# Membership Dashboard - Take-Home Assignment

A premium, responsive, MERN-stack membership management portal built using **Vite + React**, **Express.js**, **Mongoose**, **MongoDB Atlas**, and **Tailwind CSS v3**.

The application is styled with a gorgeous, high-end dark theme (and an optional light mode toggle), custom glassmorphic cards, transition animations, input validation, and a custom deletion confirmation modal.

---

## Technical Stack & Architecture

- **Frontend**: Vite + React, Tailwind CSS v3 (Utility classes and `dark:` theme variants), Lucide Icons for high-fidelity UI styling.
- **Backend**: Express.js REST API with CORS headers, dotenv environment loadings, and JSON request parsers.
- **Database**: MongoDB Atlas / local MongoDB (automatic fallback connection) modeled with Mongoose schemas.
- **State Management & Fetching**: React Hooks (`useState`, `useEffect`) with dynamic endpoint construction and query parameters.

### Folder Structure
```text
workspace/
├── backend/
│   ├── config/db.js          # Mongoose Atlas/local db connection
│   ├── models/Member.js      # Member model & schema validations
│   ├── seed.js               # Database population script
│   ├── server.js             # Express.js REST server & stats engine
│   ├── test.js               # Integration CRUD assertions script
│   ├── .env                  # Environment configuration
│   └── package.json          # Dependencies & execution scripts
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── StatsGrid.jsx # Cards showing Active, Revenue, Signups
    │   │   ├── MemberForm.jsx# Form panel with inputs & validation
    │   │   ├── MemberList.jsx# Table grid, filters, sorting & search
    │   │   └── ConfirmModal.jsx# Glassmorphic delete confirmation popup
    │   ├── App.jsx           # Main application state and navbar layout
    │   ├── index.css         # Tailwind entrypoint & animations
    │   └── main.jsx          # React renderer root
    ├── tailwind.config.js    # Tailwind classes & themes configuration
    ├── postcss.config.js     # PostCSS compile rules
    └── package.json          # Frontend packages
```

---

## Key Features

1. **Premium Analytics Cards**: Shows Active Members, Monthly Revenue, and Signups Today with trend badges.
2. **Dynamic Aggregate Calculations**: Starts at the precise baseline requirements (Active: 1243, Revenue: $18,700, Signups: 23). When new members are added/deleted, the stats automatically increment/decrement dynamically (e.g. VIP adds $50/mo, Premium adds $20/mo, Free adds $0/mo).
3. **Advanced Filtering & Search**: Includes real-time query search for Name/Email, membership type filtering (Free, Premium, VIP), status filtering (Active, Pending, Inactive), and sorting (Newest, Oldest, A-Z, Z-A).
4. **Form Field Validation**: Full validations for name length, email syntax rules, and error feedbacks in the registration form.
5. **Glassmorphic Theme System**: Smooth toggling between dark (default zinc deep theme) and light mode.
6. **Custom Delete Confirmation Modal**: Custom scale-up animated modal replacing basic browser-native `confirm()` popups.

---

## How to Run the Project

### Prerequisites
- **Node.js**: v18.18+ (tested on v18.18.0)
- **npm**: v9.8.1+
- **MongoDB**: A running local instance on port 27017 or a MongoDB Atlas URI.

### 1. Run the Backend Server
```bash
cd backend
npm install

# (Optional) Add your MongoDB Atlas Connection URI to backend/.env
# If left empty/as placeholder, it automatically falls back to your local MongoDB instance.
# MONGO_URI=mongodb+srv://...

# Seed the database with 10 initial records
npm run seed

# Run the integration tests
node test.js

# Start backend server (runs on http://localhost:5000)
npm run dev
```

### 2. Run the Frontend Client
```bash
cd ../frontend
npm install

# Start Vite React client (runs on http://localhost:5173)
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## Tools Used

1. **Antigravity AI (Google DeepMind)**: Assisted in scaffolding directories, writing Tailwind utilities, generating components, and code refactoring.
2. **lucide-react**: Open-source, high-quality outline icon set matching our dark-theme accents.
3. **Browser Automation Subagents**: End-to-end user emulation testing to verify styling, API endpoints, registration forms, search filters, and delete modal loops.
4. **Mongoose & MongoDB Compass**: Database query inspection.

---

## Challenges Encountered & Solutions

### 1. MongoDB Atlas vs Local Connection Fallback
**Challenge**: When setting up the project to use MongoDB Atlas, if a user tries to run the project locally without copy-pasting their credentials first, the server immediately crashes on startup with DNS ENOTFOUND errors.
**Solution**: Programmed an intelligent fallback mechanism in `backend/config/db.js` and `seed.js`. If `MONGO_URI` is not set or contains the `'xxxxx'` placeholder, it falls back to connection on `mongodb://127.0.0.1:27017/membership_db`. This guarantees a smooth, out-of-the-box local developer experience.

### 2. Browser Testing with Native Dialogs (`window.confirm`)
**Challenge**: Automated browser testing subagents cannot easily accept/dismiss browser-native `window.confirm` dialogs, failing deletion verification.
**Solution**: Designed and built a premium glassmorphic `<ConfirmModal>` React component. This not only resolved the test automation issue but drastically elevated the UI/UX compared to ugly native popups, maintaining a high-fidelity visual aesthetic.

---

## Future Improvements (With One More Day)

If given an additional day, the following enhancements would be made:
1. **User Authentication**: Implement JWT-based sessions and role-based permissions (e.g. Admin, Editor, Viewer).
2. **Paginated Endpoints**: Implement backend cursor-based pagination for the table list to support scaling up to millions of records.
3. **Interactive Charts**: Render Recharts area/line diagrams inside stats cards to visually plot membership signups and revenue trends over time.
4. **Unit testing coverage**: Add Vitest/Jest tests for front-end React components, and supertest hooks for the Express server routes.

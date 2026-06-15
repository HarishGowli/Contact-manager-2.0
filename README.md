# Contact Manager

Welcome to Contact Manager! 📇
A sleek, modern contact app that brings fast CRUD capabilities and a responsive UI together in one polished package.

✨ What makes it special

- Responsive React interface built with Vite and modern JavaScript
- Clean contact creation, editing, and deletion workflows
- Backend powered by Express and MongoDB for reliable persistence
- Real-time contact list updates after each operation

🚀 Key Highlights

- Dynamic contact management with React state and Axios API calls
- Simple form-driven design for adding and updating contacts
- Full REST API support for backend operations
- Local MongoDB storage via Mongoose for fast development

🛠️ Tech Stack

Frontend
- React
- Vite
- Axios
- HTML5, CSS3, JavaScript (ES6+)

Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS

📁 Project Structure

- `backend/`
  - `server.js` — Express API endpoints for contacts
  - `Contact.js` — MongoDB contact schema and model
  - `config/db.js` — database connection setup
  - `package.json` — backend scripts and dependencies
- `client/`
  - `src/` — React application source code
  - `src/api.js` — Axios client configured for backend requests
  - `src/App.jsx` — main application logic and state management
  - `src/ContactForm.jsx` — contact add/edit form UI
  - `src/ContactList.jsx` — contact list display and actions

⚡ Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### Backend Setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. Backend API available at `http://localhost:5000`

### Frontend Setup

1. Open a terminal in `client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend app:
   ```bash
   npm run dev
   ```
4. Visit the local Vite URL shown in your terminal (usually `http://localhost:5173`)

🔌 API Endpoints

- `POST /api/contacts` — create a new contact
- `GET /api/contacts` — retrieve all contacts
- `PUT /api/contacts/:id` — update a contact by ID
- `DELETE /api/contacts/:id` — remove a contact by ID

💡 Notes

- The backend connects to MongoDB using `mongodb://127.0.0.1:27017/Contact-Manager`
- Frontend API requests are routed through `http://localhost:5000/api/contacts`
- If needed, update `backend/config/db.js` with a custom MongoDB connection string

Enjoy managing your contacts with speed and simplicity! 🌟

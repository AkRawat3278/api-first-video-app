# api-first-video-app


# API-First Video App (Flask + React Native)

## 📌 Overview

This project is an **API-first video application** built using **Flask (backend)** and **React Native with Expo (frontend)**.

The system follows a **thin-client architecture**, where:

* All **business logic, authentication, and video abstraction** live in the backend
* The frontend is responsible **only for rendering UI, navigation, and sending user actions**

A strict requirement of this assignment is that the **frontend must never directly access raw YouTube video URLs or IDs**.
All video access is securely abstracted through the backend.

---

## 🧱 System Architecture (Non-Negotiable)

```
React Native App
        ↓
Flask API (JWT + Video Logic)
        ↓
MongoDB
        ↓
YouTube (hidden behind backend)
```

* The mobile app is **useless without the backend**
* YouTube is completely **hidden from the frontend**

---

## 🛠 Tech Stack

### Backend

* Python
* Flask
* Flask-JWT-Extended
* Flask-CORS
* MongoDB (PyMongo)
* python-dotenv

### Frontend

* React Native
* Expo (Expo Go)
* Expo Router
* Axios
* Expo SecureStore
* React Native WebView (mobile only)

---

## 📱 Mobile App Rules (Strictly Followed)

The React Native app:

* ❌ Contains **no business logic**
* ❌ Contains **no filtering or hardcoded content**
* ✅ Only calls APIs
* ✅ Stores JWT securely
* ✅ Renders backend-provided data
* ✅ Sends user actions to backend

---

## 🔐 Authentication Flow

1. User signs up via `/auth/signup`
2. User logs in via `/auth/login`
3. Backend validates credentials and returns a **JWT**
4. JWT is stored securely using **Expo SecureStore**
5. Axios interceptor automatically attaches JWT to protected requests
6. Protected routes validate JWT using backend middleware

---

## 🧑‍💻 Screens Implemented

### 1️⃣ Authentication

* **Signup**

  * Name
  * Email
  * Password
* **Login**

  * Email
  * Password
* On success:

  * JWT stored securely
  * User navigated to Dashboard

---

### 2️⃣ Dashboard (Home Screen)

* Fetches data from `GET /dashboard`
* Backend enforces returning **only 2 active videos**
* Each video tile shows:

  * Thumbnail
  * Title
  * Short description
* Clicking a tile opens the video player screen

⚠️ The dashboard endpoint is **JWT-protected**.

---

### 3️⃣ Video Player Screen

* Plays video using **React Native WebView**
* Backend provides a **secure playback URL**
* Frontend never receives raw YouTube URLs or IDs

**Important:**
Video playback is supported on **mobile platforms only** (Expo Go / emulator).
Expo Web does not support WebView — this is an expected limitation.

---

### 4️⃣ Settings Screen

* Displays:

  * User name
  * User email
* Logout button:

  * Clears JWT
  * Redirects to Login screen

---

## 🎥 Video Security & Abstraction (Core Requirement)

### Backend Video Model

```json
{
  "title": "How Startups Fail",
  "description": "Lessons from real founders",
  "youtube_id": "abc123xyz",
  "thumbnail_url": "...",
  "is_active": true
}
```

### Secure Playback Strategy (Option B)

1. Frontend requests `/dashboard`
2. Backend returns video metadata + playback token
3. Frontend requests:

   ```
   /video/<id>/stream?token=...
   ```
4. Backend validates token and returns a **safe embed/playback URL**

✔ Raw YouTube URLs are never exposed
✔ Video access is fully controlled by backend

---

## 🗃 Database Models

### User

* id
* name
* email
* password_hash
* created_at

### Video

* id
* title
* description
* youtube_id
* thumbnail_url
* is_active

---

## 📂 Project Structure

```
fullstack-home-assignment/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── auth.py
│   │   └── video.py
│   ├── models/
│   ├── extensions.py
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── dashboard.tsx
│   │   ├── settings.tsx
│   │   └── video/[id].tsx
│   ├── api/
│   │   └── client.ts
│   ├── storage/
│   │   └── auth.ts
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Create virtual environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Environment variables

Create `.env` using `.env.example`:

```env
JWT_SECRET_KEY=your-secret-key
MONGO_URI=mongodb://localhost:27017/videoapp
```

### 4️⃣ Run backend

```bash
python app.py
```

Backend runs on:

```
http://0.0.0.0:5000
```

---

## 📱 Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Start Expo (LAN mode)

```bash
npx expo start -c --lan
```

### 3️⃣ Run on mobile

* Install **Expo Go** on your phone
* Ensure phone and laptop are on the **same Wi-Fi**
* Scan the QR code shown in terminal

---

## 🧪 Tested Features

* User signup & login
* JWT-protected routes
* Secure token storage
* Dashboard video listing
* Secure video playback (mobile)
* Logout & token clearing

---

## 📝 Known Limitations

* Video playback is **not supported on Expo Web**
* The app is designed primarily for **mobile platforms**

---

## 🤖 AI Usage

AI tools were used to speed up:

* Initial project scaffolding
* UI layout structuring

Some generated outputs were **incorrect or incomplete**, particularly around:

* Expo networking configuration
* JWT token handling across platforms
* SecureStore limitations on web

All **final architectural decisions, debugging, and fixes were done manually**.

---

## ✅ Conclusion

This project demonstrates:

* API-first thinking
* Clean separation of concerns
* Secure JWT authentication
* Proper backend-controlled video abstraction
* A thin, mobile-focused React Native client

All requirements from the assignment document have been fully implemented.


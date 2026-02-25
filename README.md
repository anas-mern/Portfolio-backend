# 🔐 Portfolio API (with Authentication)

This is the **backend** for my Portfolio website project. It includes a full **REST API** built with **Node.js**, **Express**, **MongoDB**, and features **JWT-based authentication**. Users can see my projects, know more about me and contact me.

---

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- CORS
- Morgan

---

## 📁 Project Structure

```
Backend/
│
├── connections/       # DB connection and env setup
├── controllers/       # Logic for auth and project operations
├── models/            # Admin & Task mongoose models
├── routes/            # Express route handlers
├── middlewares/       # Auth middleware (protect routes)
├── .env               # Environment variables
├── app.js             # Express app config and Entry Point
└── README.md          # You're here!
```

---

## ⚙️ Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. **Run the server**

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

## 🔐 Authentication Endpoints

| Method | Endpoint             | Description                     |
| ------ | ------------------   | -------------------             |
| GET    | /api/admin/          | Get the only admin info         |
| PATCH  | /api/admin/edit/:id  | Edit the only admin info        |
| POST   | /api/auadminth/login | Login as an admin and get token |

---


---

## 👤 Author

- [Anas Mostafa](https://github.com/anas-mern)

---


## ✅ Notes Endpoints (Protected)

All routes below require a **valid JWT token** in the `Authorization` header as `Bearer <token>`.

| Method | Endpoint          | Description          |
| ------ | -------------     | -----------------    |
| GET    | /api/project      | Get projects         |
| POST   | /api/project      | Create new project   |
| GET    | /api/project/:id  | Get project by ID    |
| PUT    | /api/project/:id  | Update project by ID |
| DELETE | /api/project/:id  | Delete project by ID |

---

## 🧪 Example Project Object

```json
{
  "title": "Inkly",
  "image": "<IMAGE_LINK>",
  "url": "http://example.com",
  "description":"<A Description>",
  "skills":["Node.js","Express","MongoDB","React"],
  "order":110
}
```

---

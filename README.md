# K N Singh Inter College — Full-Stack Web Application

A complete, production-ready MERN stack website for **K N Singh Inter College**, Masuriyapur, Azamgarh, Uttar Pradesh.

---

## 🗂️ Project Structure

```
knsingh/
├── backend/          # Node.js + Express + MongoDB API
└── frontend/         # React (Vite) + Tailwind CSS
```

---

## ⚙️ Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend    | Node.js, Express.js                       |
| Database   | MongoDB + Mongoose                        |
| Auth       | JWT + bcryptjs                            |
| File Upload| Cloudinary + Multer                       |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (free tier works)

---

### 1. Clone / Extract the Project

```bash
cd knsingh
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/knsingh_college
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=admin@knsingh.edu.in
ADMIN_PASSWORD=Admin@123
```

Start the backend:

```bash
# Development
npm run dev

# Production
npm start
```

The server runs on **http://localhost:5000**

On first run, the seeder automatically creates:
- Default admin account
- Sample courses
- Sample notices
- Default About content

---

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
# Development
npm run dev

# Build for production
npm run build
```

The frontend runs on **http://localhost:5173**

---

## 🔐 Default Admin Credentials

| Field    | Value                    |
|----------|--------------------------|
| Email    | admin@knsingh.edu.in     |
| Password | Admin@123                |

> **Change these immediately after first login** via the Admin Panel.

---

## 🌐 Public Website Pages

| Page         | Route         |
|--------------|---------------|
| Home         | `/`           |
| About Us     | `/about`      |
| Courses      | `/courses`    |
| Faculty      | `/faculty`    |
| Facilities   | `/facilities` |
| Gallery      | `/gallery`    |
| Notices      | `/notices`    |
| Contact      | `/contact`    |

---

## 🛠️ Admin Panel

Access: **http://localhost:5173/admin/login**

| Section   | Route                 |
|-----------|-----------------------|
| Dashboard | `/admin/dashboard`    |
| Notices   | `/admin/notices`      |
| Faculty   | `/admin/faculty`      |
| Courses   | `/admin/courses`      |
| Gallery   | `/admin/gallery`      |
| Messages  | `/admin/messages`     |
| About     | `/admin/about`        |

---

## 📡 REST API Endpoints

### Auth
| Method | Endpoint              | Auth | Description         |
|--------|-----------------------|------|---------------------|
| POST   | `/api/auth/login`     | No   | Admin login         |
| GET    | `/api/auth/me`        | Yes  | Get current admin   |
| PUT    | `/api/auth/change-password` | Yes | Change password |

### Notices
| Method | Endpoint           | Auth | Description      |
|--------|--------------------|------|------------------|
| GET    | `/api/notices`     | No   | List notices     |
| GET    | `/api/notices/:id` | No   | Single notice    |
| POST   | `/api/notices`     | Yes  | Create notice    |
| PUT    | `/api/notices/:id` | Yes  | Update notice    |
| DELETE | `/api/notices/:id` | Yes  | Delete notice    |

### Faculty
| Method | Endpoint            | Auth | Description    |
|--------|---------------------|------|----------------|
| GET    | `/api/faculty`      | No   | List faculty   |
| POST   | `/api/faculty`      | Yes  | Add faculty    |
| PUT    | `/api/faculty/:id`  | Yes  | Update faculty |
| DELETE | `/api/faculty/:id`  | Yes  | Delete faculty |

### Gallery
| Method | Endpoint            | Auth | Description    |
|--------|---------------------|------|----------------|
| GET    | `/api/gallery`      | No   | List images    |
| POST   | `/api/gallery`      | Yes  | Upload image   |
| PUT    | `/api/gallery/:id`  | Yes  | Update image   |
| DELETE | `/api/gallery/:id`  | Yes  | Delete image   |

### Courses
| Method | Endpoint            | Auth | Description    |
|--------|---------------------|------|----------------|
| GET    | `/api/courses`      | No   | List courses   |
| POST   | `/api/courses`      | Yes  | Create course  |
| PUT    | `/api/courses/:id`  | Yes  | Update course  |
| DELETE | `/api/courses/:id`  | Yes  | Delete course  |

### Contact
| Method | Endpoint               | Auth | Description       |
|--------|------------------------|------|-------------------|
| POST   | `/api/contact`         | No   | Submit message    |
| GET    | `/api/contact`         | Yes  | List messages     |
| PUT    | `/api/contact/:id/read`| Yes  | Mark as read      |
| DELETE | `/api/contact/:id`     | Yes  | Delete message    |

### About
| Method | Endpoint     | Auth | Description        |
|--------|--------------|------|--------------------|
| GET    | `/api/about` | No   | Get about content  |
| PUT    | `/api/about` | Yes  | Update about content|

### Stats
| Method | Endpoint     | Auth | Description        |
|--------|--------------|------|--------------------|
| GET    | `/api/stats` | Yes  | Dashboard stats    |

---

## 🚢 Production Deployment

### Backend (e.g. Railway, Render, VPS)
1. Set all environment variables
2. Run `npm start`

### Frontend (e.g. Vercel, Netlify)
1. Set `VITE_API_URL` to your backend URL
2. Run `npm run build`
3. Deploy the `dist/` folder

---

## 📦 Features Summary

- ✅ Fully responsive mobile-first design
- ✅ JWT authentication for admin
- ✅ Full CRUD for Notices, Faculty, Courses, Gallery, About, Contact
- ✅ Cloudinary image upload with preview
- ✅ Drag & drop image upload
- ✅ Rich text content support (HTML)
- ✅ Search, filter, pagination
- ✅ Skeleton loaders & toast notifications
- ✅ Framer Motion animations throughout
- ✅ SEO meta tags, Open Graph, robots.txt, sitemap.xml
- ✅ Gallery lightbox with category filter
- ✅ Unread message notifications
- ✅ Auto-seeding of default data

---

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with expiry
- Protected admin routes (frontend + backend)
- Input validation on all endpoints
- CORS configured for specific origins
- File upload validation (type + size)

---

*Built with ❤️ for K N Singh Inter College, Masuriyapur, Azamgarh, UP*

# SeekhoPakistan (SeekhoPK)

A full-stack MERN Learning Management System where students can browse and enroll in courses, watch lessons and track their progress, instructors can create and manage what they teach and admin can manage both. Built as a university final project (MERN Stack Web Development).

**Live demo:** (https://seekho-pk.vercel.app/)
**Repository:** https://github.com/razamughal333/SeekhoPk

---

## Overview

SeekhoPakistan supports three roles:

- **Student** — browse courses, enroll, work through lessons, and track
  progress on a dashboard (progress updates live as lessons are marked complete)
- **Instructor** — create, edit, and delete their own courses, and add
  lessons (title + video/content link) to each one
- **Admin** — view platform-wide analytics, manage all users

Authentication is JWT-based with bcrypt password hashing. Backend routes
are protected by role-aware middleware; the frontend restricts dashboard
pages the same way.

## Tech stack

**Frontend:** React 19, Vite, React Router, Tailwind CSS v4, Axios
**Backend:** Node.js, Express 5, MongoDB with Mongoose
**Auth:** JWT (jsonwebtoken), bcryptjs
**Hosting (suggested):** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Features

- Course browsing, search, and category filtering
- Course CRUD for instructors, with an optional cover image (via URL)
- Role-based dashboards for Student, Instructor, and Admin
- Lessons per course: instructors add lesson title + content URL
  (YouTube links auto-embed as video); students work through them in
  a dedicated lesson player, mark each complete, and auto-advance to
  the next one
- Live progress tracking: enrollment progress is calculated from
  completed lessons ÷ total lessons, not a static value
- Admin analytics (user/course/enrollment counts) and user management

## Project structure

```
SeekhoPk/
├── backend/
│   ├── config/         # database connection
│   ├── controllers/    # route handler logic
│   ├── middleware/     # auth (JWT + role guard), error handler
│   ├── models/         # User, Course, Enrollment, Lesson
│   ├── routes/         # /api/auth, /api/courses, /api/enroll, /api/admin, /api/lessons
│   └── server.js
└── frontend/
    ├── public/
    │   ├── images/          # hero-banner.jpg, auth-side.jpg (original SVG art)
    │   ├── favicon.svg / .ico
    │   └── apple-touch-icon.png
    └── src/
        ├── components/  # Navbar, Footer, Layout, CourseRow, ImageWithFallback
        ├── context/     # AuthContext (global login state)
        ├── pages/       # Home, CourseListing, CourseDetail, About, CourseLearn, Login, Register
        │   └── dashboards/  # Student, Instructor, Admin dashboards, CourseForm, LessonManager
        ├── routes/      # ProtectedRoute (role-gated routing)
        ├── services/    # axios calls, grouped by domain
        └── utils/       # embed.js (YouTube URL helper)
```

## Getting started

### Prerequisites

- Node.js (LTS)
- A MongoDB Atlas account (free tier) with a connection string

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_string
PORT=5000
```

Run it:

```bash
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected: ...`.

### Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## API endpoints

| Method | Route                          | Access            | Description                                   |
| ------ | ------------------------------ | ----------------- | --------------------------------------------- |
| POST   | /api/auth/register             | Public            | Register a new user                           |
| POST   | /api/auth/login                | Public            | Log in, returns JWT                           |
| GET    | /api/auth/me                   | Private           | Current logged-in user                        |
| GET    | /api/courses                   | Public            | List all courses                              |
| GET    | /api/courses/:id               | Public            | Single course detail                          |
| POST   | /api/courses                   | Instructor, Admin | Create a course                               |
| PUT    | /api/courses/:id               | Owner or Admin    | Update a course                               |
| DELETE | /api/courses/:id               | Owner or Admin    | Delete a course                               |
| GET    | /api/courses/:courseId/lessons | Public            | List lessons for a course                     |
| POST   | /api/courses/:courseId/lessons | Owner or Admin    | Add a lesson to a course                      |
| PUT    | /api/lessons/:id               | Owner or Admin    | Update a lesson                               |
| DELETE | /api/lessons/:id               | Owner or Admin    | Delete a lesson                               |
| POST   | /api/enroll                    | Student           | Enroll in a course                            |
| GET    | /api/my-courses                | Student           | List the student's enrollments                |
| POST   | /api/complete-lesson           | Student           | Mark a lesson complete, recalculates progress |
| GET    | /api/admin/users               | Admin             | List all users                                |
| DELETE | /api/admin/users/:id           | Admin             | Delete a user                                 |
| GET    | /api/admin/analytics           | Admin             | Platform-wide counts                          |

## Author

**Raza Ahmed Mughal**
GitHub: [razamughal333](https://github.com/razamughal333)
Portfolio: [razamughal333.github.io/Portfolio](https://razamughal333.github.io/Portfolio)

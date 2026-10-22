# HireNova — Job Portal Platform

HireNova is a full-stack job portal platform that connects job seekers with recruiters. Candidates can explore job opportunities, apply for jobs, and track their application status, while recruiters can publish job openings and manage applicants from their dashboard.

## Live Demo

- **Frontend:** [HireNova — Live Website](https://hire-hub-beryl-omega.vercel.app)
- **Backend API:** [Render API](https://hirenova-qst5.onrender.com/api/job)
- **GitHub Repository:** [HireNova Source Code](https://github.com/Yadnesh2026/HireHub)

## Features

### Candidate Features
- Register and log in securely.
- Browse and search available job listings.
- View job details, descriptions, skills, salary, and location.
- Apply for jobs by uploading a resume.
- Track applications and view their status.
- View and update profile information.

### Recruiter Features
- Register and log in as a recruiter.
- Access a dedicated recruiter dashboard.
- Create and publish job openings.
- View posted jobs and application statistics.
- Review applicants for posted jobs.
- Shortlist or reject candidates.
- Track pending applications.

### Security and Access Control
- JWT-based authentication.
- Role-based access control for candidates and recruiters.
- Protected API routes using authentication and role middleware.
- Recruiter authorization checks for managing applications.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- CSS Modules
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Multer for resume uploads

### Deployment
- Vercel — Frontend hosting
- Render — Backend hosting
- MongoDB Atlas — Database hosting

## Project Structure

```text
HireHub/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

*Note: Adjust folder names in this structure if they differ from the actual repository.*

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Yadnesh2026/HireHub.git
cd HireHub
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=1000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
```

Use the actual environment variable names expected by your backend configuration. Never commit real secrets to GitHub.

Start the backend:

```bash
npm run dev
```

If your backend does not have a `dev` script, use the start command defined in its `package.json`.

### 3. Set up the frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:1000/api
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/user` | Register an account |
| POST | `/api/login` | Log in |
| GET | `/api/job` | Get job listings |
| GET | `/api/job/:id` | Get job details |
| POST | `/api/job` | Create a job — recruiter only |
| GET | `/api/myjobs` | Get the recruiter's jobs |
| POST | `/api/application/:jobId` | Apply for a job — candidate only |
| GET | `/api/application` | Get the candidate's applications |
| GET | `/api/applicants` | View applicants — recruiter only |
| PATCH | `/api/application/:id/status` | Update application status — authorized recruiter |
| GET | `/api/profile` | Get the logged-in user's profile |
| PUT | `/api/profile` | Update profile information |

## Application Workflow

1. A user registers as a candidate or recruiter.
2. The user logs in and receives a JWT.
3. Candidates browse jobs and submit applications with resumes.
4. Recruiters publish job listings and review applications.
5. Recruiters update application statuses to pending, shortlisted, or rejected.
6. Candidates can track their application statuses.

## Environment Variables

Keep environment variables in local configuration files and hosting-provider settings. Do not commit `.env` or `.env.local` files containing credentials.

Configure the backend variables in Render and `NEXT_PUBLIC_API_URL` in Vercel.

## Future Improvements

- Email notifications for application updates.
- Advanced job filters and pagination.
- Recruiter and candidate profile enhancements.
- Improved resume management.
- Automated tests and expanded validation.
- Enhanced mobile responsiveness.

## Author

**Yadnesh Vidulkar**

Full-stack web development project built to practice frontend development, REST API design, authentication, role-based authorization, database integration, and deployment.

---

*HireNova — Connecting talent with opportunity.*

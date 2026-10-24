# HireNova — Job Portal Platform

HireNova is a full-stack job portal platform that connects job seekers with recruiters. Candidates can explore job opportunities, apply for jobs, and track their application status, while recruiters can publish job openings and manage applicants from their dashboard.

## Live Demo

- **Frontend:** [HireNova — Live Website](https://hire-hub-beryl-omega.vercel.app)
- **Backend API:** [Render API](https://hirenova-qst5.onrender.com/api)
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

### Database

- MongoDB Atlas

## DevOps & CI/CD

DevOps practices have been incorporated into HireNova to improve build validation, application portability, and development workflows.

### Tools & Technologies

- **Git & GitHub:** Version control and source code management.
- **GitHub Actions:** Automates configured CI checks when code changes are pushed to GitHub.
- **Docker:** Containerizes application services for consistent execution across environments.
- **Docker Compose:** Configures and runs multiple containers together during local development.
- **Vercel:** Frontend hosting and deployment.
- **Render:** Backend hosting and deployment.
- **MongoDB Atlas:** Cloud database hosting.

### DevOps Workflow

1. Manage application code using Git and GitHub.
2. Use GitHub Actions to run configured continuous integration checks.
3. Build and run application containers using Docker.
4. Use Docker Compose to manage containers together in a local environment.
5. Deploy the frontend through Vercel and the backend through Render.
6. Store application data in MongoDB Atlas.

### Key Learnings

- Configuring GitHub Actions workflows using YAML.
- Automating build validation with CI workflows.
- Building and running Docker images and containers.
- Understanding container ports, environment variables, and logs.
- Managing multi-container applications using Docker Compose.
- Understanding the differences between Continuous Integration (CI) and Continuous Deployment (CD).

## Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

The frontend and backend are deployed separately, while MongoDB Atlas provides cloud database services.

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
├── .github/
│   └── workflows/
│       └── ci.yml
│
└── README.md
```

*Note: Adjust the folder names and workflow filename if they differ from your actual repository. Do not commit `.env` or `.env.local` files containing secrets.*

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Yadnesh2026/HireHub.git
cd HireHub
```

### 2. Set Up the Backend

Navigate to the backend directory:

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

Use the actual environment variable names expected by your backend configuration. Never commit real credentials or secrets to GitHub.

Start the backend using the script defined in your `backend/package.json`. If your project has a `dev` script, run:

```bash
npm run dev
```

### 3. Set Up the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:1000/api
```

Make sure this variable name matches the one used in your frontend code.

Start the frontend:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## API Overview

The following table summarizes the main API endpoints used by the application. Confirm each endpoint against your backend routes if you make changes.

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
3. Candidates browse job listings and submit applications with resumes.
4. Recruiters publish job listings and review applications.
5. Recruiters update application statuses to `pending`, `shortlisted`, or `rejected`.
6. Candidates track their application statuses through their dashboard.

## Environment Variables

Keep environment variables in local configuration files and hosting-provider settings.

- **Backend:** Configure the required environment variables in Render.
- **Frontend:** Configure `NEXT_PUBLIC_API_URL` in Vercel.
- **Local development:** Use `.env` for the backend and `.env.local` for the frontend, as required by your configuration.
- **Security:** Never commit database credentials, JWT secrets, API keys, or other sensitive values to GitHub.

## Future Improvements

- Email notifications for application updates.
- Advanced job filters and pagination.
- Recruiter and candidate profile enhancements.
- Improved resume management.
- Automated tests and expanded validation.
- Enhanced mobile responsiveness.
- Expanded monitoring and deployment automation.

## Author

**Yadnesh Vidulkar**

Full-stack web development project built to practise frontend development, REST API design, authentication, role-based authorization, database integration, containerization, CI workflows, and deployment.

**HireNova — Connecting talent with opportunity.**

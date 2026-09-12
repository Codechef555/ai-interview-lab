AI Interview Lab 🤖

An AI-powered technical interview platform that combines conversational AI, real-time voice interaction, GitHub-based candidate context, and interview evaluation of era.


Overview

AI Interview Lab is a full-stack monorepo for conducting interactive technical interviews with an AI interviewer.

The application is designed around a simple flow:

1. A candidate provides their GitHub profile and interview information.
2. The backend retrieves GitHub metadata to provide context for the interview.
3. An interview session is created and persisted with Prisma/PostgreSQL.
4. The frontend connects the candidate to a real-time voice interview.
5. Candidate responses are stored for evaluation and review.
6. The candidate can view the resulting interview experience through a dedicated result page.

The repository is organized as a Turborepo workspace with separate frontend and backend applications plus shared packages.

✨ Features

- 🎙️ Real-time AI interviews using OpenAI's Realtime API.
- 🗣️ Voice-based interaction for a more natural interview experience.
- 🧑‍💻 GitHub-aware interviews by retrieving candidate GitHub information before the interview.
- 📝 Interview session management with persistent interview records.
- 💬 Response persistence for candidate answers.
- 📊 Interview result flow with a dedicated result route.
- ⚡ Fast local development powered by Bun.
- 🧩 Monorepo architecture powered by Turborepo.
- 🎨 Modern frontend built with React, Tailwind CSS, Radix UI components, and React Router.
- 🗄️ PostgreSQL + Prisma for application data.
- 🔒 Environment-based secrets for external API credentials.

🏗️ Architecture

┌──────────────────────────┐
│        Frontend          │
│     React + Bun          │
│                          │
│  Form → Interview →      │
│         Result           │
└────────────┬─────────────┘
             │ HTTP / SDP
             ▼
┌──────────────────────────┐
│         Backend          │
│ Express + TypeScript     │
│                          │
│ • Interview creation     │
│ • GitHub profile data    │
│ • Realtime session setup │
│ • Response persistence   │
└────────────┬─────────────┘
             │
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐  ┌───────────────┐
│ PostgreSQL │  │ OpenAI        │
│ + Prisma   │  │ Realtime API  │
└────────────┘  └───────────────┘

🛠️ Tech Stack

Frontend

- React 19
- TypeScript
- React Router
- Tailwind CSS 4
- Radix UI
- Lucide React
- Sonner
- Bun

Backend

- TypeScript
- Bun
- Express 5
- Prisma 7
- PostgreSQL
- Axios
- Zod
- WebSocket support
- OpenAI Realtime API

Monorepo / Tooling

- Turborepo
- Bun workspaces
- Prettier
- ESLint
- Shared TypeScript configuration
- Shared UI package

📁 Project Structure

ai-interview-lab/
├── apps/
│   ├── backend/
│   │   ├── prisma/              # Prisma schema and database resources
│   │   ├── scrapers/            # GitHub/profile scraping logic
│   │   ├── db.ts                # Database client
│   │   ├── index.ts             # Express API server
│   │   ├── sideband.ts          # Realtime session sideband logic
│   │   ├── types.ts             # Backend types / validation
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/       # UI and interview components
│       │   ├── lib/              # Frontend utilities
│       │   ├── App.tsx           # Application routes
│       │   └── frontend.tsx
│       └── package.json
│
├── packages/
│   ├── eslint-config/            # Shared ESLint configuration
│   ├── typescript-config/        # Shared TypeScript configuration
│   └── ui/                       # Shared UI components
│
├── package.json
├── turbo.json
├── bun.lock
└── LICENSE

🚀 Getting Started

Prerequisites

Make sure you have:

- "Bun" (https://bun.sh/) 1.4+
- Node.js 18+
- PostgreSQL
- An OpenAI API key with access to the Realtime API

1. Clone the repository

git clone https://github.com/Codechef555/ai-interview-lab.git
cd ai-interview-lab

2. Install dependencies

bun install

The repository uses Bun workspaces and Turborepo, so dependencies can be installed from the repository root.

3. Configure environment variables

Create an environment file for the backend and configure the credentials required by your local setup.

At minimum, the realtime session endpoint expects:

OPENAI_KEY=your_openai_api_key

You will also need to configure the PostgreSQL connection expected by the Prisma setup.

«Never commit API keys, database passwords, or other secrets to Git.»

4. Configure the database

After configuring PostgreSQL and the appropriate Prisma environment variables, initialize the database according to the Prisma schema:

cd apps/backend
bunx prisma generate
bunx prisma migrate dev
cd ../..

If your environment uses a different Prisma migration workflow, use the corresponding Prisma command for your deployment setup.

5. Start the development environment

From the repository root:

bun dev

This runs the workspace development tasks through Turborepo.

The backend is configured to listen on:

http://localhost:3001

The frontend development server is started by the frontend Bun configuration.

🧪 Useful Commands

Run these from the repository root:

# Start all development apps
bun dev

# Build all apps and packages
bun run build

# Run linting
bun run lint

# Check TypeScript types
bun run check-types

# Format TypeScript/TSX/Markdown files
bun run format

You can also target a specific workspace with Turborepo:

bunx turbo dev --filter=frontend
bunx turbo dev --filter=backend

bunx turbo build --filter=frontend
bunx turbo build --filter=backend

🔌 API Overview

The backend exposes the following core endpoints:

Create a pre-interview session

POST /api/v1/pre-interview

Creates an interview record after validating the candidate's GitHub URL and retrieving GitHub metadata.

Create a realtime interview session

POST /api/v1/session/:interviewId

Creates an OpenAI Realtime session using the browser's SDP payload and associates the realtime call with the interview.

Save a candidate response

POST /api/v1/session/user/response/:interviewId

Persists a candidate's response against the interview session.

🧭 Frontend Routes

The frontend currently exposes these primary routes:

Route| Purpose
"/"| Candidate/interview setup form
"/interview/:interviewId"| Live interview experience
"/result/:interviewId"| Interview result experience

🔐 Security Notes

This project handles API credentials and candidate information, so keep the following practices in place:

- Store secrets in environment variables.
- Do not expose "OPENAI_KEY" to the browser.
- Keep database credentials server-side.
- Validate incoming API payloads.
- Review CORS configuration before production deployment.
- Avoid logging sensitive interview data or credentials.
- Add authentication and authorization before exposing the API publicly.

🗺️ Development Roadmap

Potential areas for future improvement include:

- [ ] Candidate authentication and user accounts
- [ ] More detailed interview scoring and analytics
- [ ] Structured evaluation across technical and communication skills
- [ ] Interview history and dashboards
- [ ] Better error handling and API validation
- [ ] Automated tests and end-to-end tests
- [ ] Production-ready CORS and security configuration
- [ ] Rate limiting and abuse protection
- [ ] Deployment documentation
- [ ] CI/CD pipeline
- [ ] More interview types and difficulty levels

📄 License

This project is licensed under the MIT License. See "LICENSE" (LICENSE) for details.

🔗 Repository

GitHub: https://github.com/Codechef555/ai-interview-lab

---

Built with ❤️ using Bun, React, TypeScript, Express, Prisma, PostgreSQL, and OpenAI.


#Author

Md. Karaamathullah Sheriff 

Open source contributor 

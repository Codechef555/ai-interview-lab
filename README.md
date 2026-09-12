# AI Interview Lab 🤖

**AI Interview Lab** is an AI-powered technical interview platform that simulates interactive technical interviews using **real-time voice conversations, GitHub-based candidate context, automatic transcript collection, and AI-generated interview evaluation**.

The project is built as a full-stack **Bun + Turborepo monorepo** with a React frontend, Express/TypeScript backend, PostgreSQL database, OpenAI Realtime API, Deepgram speech-to-text, and Google Gemini for interview evaluation.

> 🚧 **Project Status:** Active development / prototype

---

## ✨ Features

* 🎙️ **Real-time AI voice interviewer**

  * Uses OpenAI's Realtime API for conversational interview interaction.
  * Browser audio is connected to the realtime model using WebRTC/SDP.

* 🧑‍💻 **GitHub-aware interviews**

  * Candidates provide their GitHub profile before starting.
  * The backend retrieves public repository information.
  * Repository names, descriptions, full names, and star counts are provided as interview context.

* 🗣️ **Speech-to-text**

  * Candidate microphone audio is streamed to Deepgram.
  * Transcribed candidate responses are persisted in the database.

* 🧠 **AI-powered interview evaluation**

  * Completed interview conversations are evaluated using Google Gemini.
  * The evaluator generates:

    * Interview score out of 10
    * Written feedback

* 💾 **Persistent interview sessions**

  * Interview sessions and conversation messages are stored using Prisma and PostgreSQL.

* 📜 **Interview transcript**

  * Candidate and AI interviewer messages are stored with timestamps.

* ⚡ **Bun-powered development**

  * Fast package installation and local development using Bun.

* 🧩 **Monorepo architecture**

  * Managed using Turborepo and Bun workspaces.

* 🎨 **Modern React frontend**

  * React 19
  * Tailwind CSS 4
  * Radix UI
  * Lucide React
  * React Router
  * Sonner notifications

---

# 🏗️ Architecture

```text
                         ┌─────────────────────────┐
                         │        Candidate        │
                         │                         │
                         │ GitHub URL + Microphone │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       React Frontend    │
                         │                         │
                         │  Form → Interview →     │
                         │          Result         │
                         └────────────┬────────────┘
                                      │
                         HTTP / SDP / WebSocket
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    Express Backend      │
                         │      TypeScript         │
                         │                         │
                         │ • Interview creation    │
                         │ • GitHub scraping       │
                         │ • Realtime session     │
                         │ • Transcript storage    │
                         │ • Result generation     │
                         └───────┬─────────┬───────┘
                                 │         │
                    ┌────────────┘         └──────────────┐
                    ▼                                     ▼
          ┌─────────────────┐                    ┌──────────────────┐
          │   PostgreSQL    │                    │  External AI     │
          │   + Prisma 7    │                    │    Services      │
          │                 │                    │                  │
          │ Interviews      │                    │ OpenAI Realtime  │
          │ Messages        │                    │ Deepgram STT     │
          │ Scores           │                    │ Gemini Evaluation │
          │ Feedback         │                    │                  │
          └─────────────────┘                    └──────────────────┘
```

---

# 🔄 Interview Flow

```text
1. Candidate enters GitHub profile
             │
             ▼
2. Backend validates GitHub URL
             │
             ▼
3. GitHub repositories are retrieved
             │
             ▼
4. Interview record is created
             │
             ▼
5. Browser establishes realtime audio connection
             │
             ▼
6. OpenAI Realtime session is created
             │
             ▼
7. AI interviewer receives GitHub context
             │
             ▼
8. AI asks technical questions
             │
             ▼
9. Candidate responds through microphone
             │
             ├──────────────► OpenAI Realtime
             │
             └──────────────► Deepgram transcription
                                  │
                                  ▼
                         Candidate response
                         stored in PostgreSQL
                                  │
                                  ▼
10. Interview result requested
             │
             ▼
11. Gemini evaluates transcript
             │
             ▼
12. Score + feedback + transcript displayed
```

---

# 🛠️ Tech Stack

## Frontend

| Technology     | Purpose               |
| -------------- | --------------------- |
| React 19       | UI                    |
| TypeScript     | Type safety           |
| React Router   | Client-side routing   |
| Tailwind CSS 4 | Styling               |
| Radix UI       | UI primitives         |
| Lucide React   | Icons                 |
| Sonner         | Notifications         |
| Axios          | HTTP requests         |
| Deepgram SDK   | Speech transcription  |
| Bun            | Runtime / development |

## Backend

| Technology          | Purpose                             |
| ------------------- | ----------------------------------- |
| TypeScript          | Backend development                 |
| Bun                 | Runtime                             |
| Express 5           | REST API                            |
| Prisma 7            | ORM                                 |
| PostgreSQL          | Persistent database                 |
| Axios               | GitHub API requests                 |
| Zod                 | Request / response validation       |
| WebSocket           | OpenAI Realtime sideband connection |
| OpenAI Realtime API | AI interviewer                      |
| Google Gemini       | Interview evaluation                |
| Deepgram            | Speech-to-text                      |
| HTTPS Proxy Agent   | GitHub request proxy support        |

## Monorepo / Tooling

* Turborepo
* Bun workspaces
* Prettier
* ESLint
* Shared TypeScript configuration
* Shared UI package

---

# 📁 Project Structure

```text
ai-interview-lab/
│
├── apps/
│   │
│   ├── backend/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   │
│   │   ├── scrapers/
│   │   │   └── github.ts
│   │   │
│   │   ├── db.ts
│   │   ├── index.ts
│   │   ├── result.ts
│   │   ├── sideband.ts
│   │   ├── types.ts
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   ├── Form.tsx
│       │   │   ├── Interview.tsx
│       │   │   └── Result.tsx
│       │   │
│       │   ├── lib/
│       │   │   └── config.ts
│       │   │
│       │   ├── App.tsx
│       │   └── frontend.tsx
│       │
│       └── package.json
│
├── packages/
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/
│
├── package.json
├── turbo.json
├── bun.lock
└── LICENSE
```

---

# 🗄️ Database Schema

The application currently uses PostgreSQL with Prisma 7.

## Interview

Stores the overall interview session.

```text
Interview
├── id
├── githubMetadata
├── status
├── score
├── feedback
└── conversations[]
```

## Message

Stores individual candidate and interviewer messages.

```text
Message
├── id
├── message
├── type
├── interviewId
└── createdAt
```

Message types currently include:

```text
User
Assistant
```

Interview status values:

```text
Pre
Inprogress
Done
```

---

# 🤖 AI Components

## OpenAI Realtime

The live interview uses OpenAI's Realtime API.

The backend creates the realtime call using the candidate's browser SDP payload and configures the session with:

```text
Model: gpt-realtime-2.1
Voice: marin
```

The backend also establishes a sideband WebSocket connection to the realtime call so that interviewer responses can be captured and persisted.

---

## 🎙️ Deepgram

Candidate microphone audio is captured in the browser and streamed to Deepgram for transcription.

The resulting transcript is sent to:

```text
POST /api/v1/session/user/response/:interviewId
```

and stored as a `User` message in PostgreSQL.

---

## 📊 Gemini Evaluation

After the interview, the stored conversation is evaluated using:

```text
Model: gemini-2.5-flash
```

The evaluator returns structured JSON:

```json
{
  "feedback": "Interview feedback...",
  "score": 8
}
```

The score represents the candidate's overall interview performance on a scale of **0–10**.

---

# 🔌 API

## Create Pre-Interview Session

```http
POST /api/v1/pre-interview
```

### Request

```json
{
  "github": "https://github.com/username"
}
```

### Response

```json
{
  "id": "interview-id"
}
```

The endpoint:

1. Validates the GitHub URL.
2. Extracts the GitHub username.
3. Retrieves repository metadata.
4. Creates a new interview record.
5. Returns the interview ID.

---

## Create Realtime Interview Session

```http
POST /api/v1/session/:interviewId
```

The browser sends its SDP offer to the backend.

The backend:

1. Creates an OpenAI Realtime call.
2. Uses the server-side OpenAI API key.
3. Returns the SDP answer.
4. Initializes the realtime sideband connection.
5. Associates the realtime call with the interview.

---

## Save Candidate Response

```http
POST /api/v1/session/user/response/:interviewId
```

### Request

```json
{
  "message": "Candidate response..."
}
```

The response is stored as a `User` message.

---

## Get Interview Result

```http
GET /api/v1/result/:interviewId
```

Returns the interview score, feedback, and transcript.

The result is evaluated using Gemini when the interview has not yet reached the `Done` state.

---

# 🧭 Frontend Routes

| Route                     | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `/`                       | GitHub URL / interview setup             |
| `/interview/:interviewId` | Live voice interview                     |
| `/result/:interviewId`    | Interview score, feedback and transcript |

---

# 🚀 Getting Started

## Prerequisites

Install the following:

* [Bun](https://bun.sh/) 1.4+
* Node.js 18+
* PostgreSQL
* OpenAI API key with Realtime API access
* Google Gemini API key
* Deepgram API credentials

---

## 1. Clone the Repository

```bash
git clone https://github.com/Codechef555/ai-interview-lab.git

cd ai-interview-lab
```

---

## 2. Install Dependencies

```bash
bun install
```

The project uses Bun workspaces and Turborepo, so dependencies are installed from the repository root.

---

# 🔐 3. Configure Environment Variables

Create the appropriate environment configuration for the backend.

At minimum, the backend currently expects:

```env
OPENAI_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
PROXY_URL=your_proxy_url
```

If proxy support is not required in your environment, configure the GitHub scraper accordingly before running the application.

### Important

**Never commit API keys, database credentials, proxy credentials, or other secrets to Git.**

The OpenAI API key must remain server-side and must never be exposed to the browser.

---

# 🗃️ 4. Configure PostgreSQL

The project uses Prisma 7 with the PostgreSQL adapter.

From the backend directory:

```bash
cd apps/backend
```

Generate the Prisma client:

```bash
bunx prisma generate
```

Run database migrations:

```bash
bunx prisma migrate dev
```

Return to the repository root:

```bash
cd ../..
```

---

# ▶️ 5. Start Development

From the repository root:

```bash
bun dev
```

Turborepo will start the configured development tasks.

The backend currently listens on:

```text
http://localhost:3001
```

The frontend development server is configured separately through the frontend Bun setup.

> **Note:** Verify `apps/frontend/src/lib/config.ts` if your frontend backend URL differs from the local backend configuration.

---

# 🧪 Useful Commands

Run from the repository root.

### Start development

```bash
bun dev
```

### Build all applications

```bash
bun run build
```

### Run linting

```bash
bun run lint
```

### Check TypeScript

```bash
bun run check-types
```

### Format the project

```bash
bun run format
```

### Run only the frontend

```bash
bunx turbo dev --filter=frontend
```

### Run only the backend

```bash
bunx turbo dev --filter=backend
```

### Build only the frontend

```bash
bunx turbo build --filter=frontend
```

### Build only the backend

```bash
bunx turbo build --filter=backend
```

---

# 🔒 Security Considerations

This application processes API credentials, GitHub information, voice transcripts, and interview results.

Before deploying publicly, consider implementing:

* Authentication and authorization
* Rate limiting
* Production CORS configuration
* Secure secret management
* API request validation
* GitHub API abuse protection
* Deepgram credential protection
* OpenAI API abuse protection
* Input sanitization
* Secure database configuration
* HTTPS
* Interview ownership checks
* Protection against unauthorized access to interview IDs
* Removal of sensitive information from logs

### Never expose server-side API keys

The following credentials should remain on the backend:

```text
OPENAI_KEY
GEMINI_API_KEY
DATABASE_URL
PROXY_URL
```

---

# 🗺️ Roadmap

The following improvements are planned or recommended for future versions:

* [ ] Candidate authentication
* [ ] User accounts
* [ ] Interview history
* [ ] Candidate dashboard
* [ ] Multiple interview types
* [ ] Difficulty selection
* [ ] Role-specific interviews
* [ ] Resume-based interview questions
* [ ] Job-description-based interviews
* [ ] More detailed scoring
* [ ] Technical skill scoring
* [ ] Communication scoring
* [ ] Problem-solving scoring
* [ ] Code evaluation
* [ ] Coding interview mode
* [ ] Interview duration controls
* [ ] Better interview completion flow
* [ ] Automated tests
* [ ] End-to-end tests
* [ ] Production-ready CORS
* [ ] Rate limiting
* [ ] CI/CD
* [ ] Production deployment documentation
* [ ] Improved error handling
* [ ] Interview analytics
* [ ] Interview comparison/history

---

# ⚠️ Current Development Notes

This repository is actively evolving. Some parts of the realtime voice flow and result experience are still under development.

In particular, production deployment should include additional work around:

* Secure Deepgram authentication
* Authentication/authorization
* Error handling
* Realtime connection lifecycle management
* Interview completion detection
* Production frontend/backend configuration
* Result polling and state management
* API validation and rate limiting

The current implementation should therefore be considered a **working prototype rather than a production-ready recruitment platform**.

---

# 📄 License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for details.

---

# 🔗 Repository

**GitHub:** https://github.com/Codechef555/ai-interview-lab

---

# 👨‍💻 Author

**Md. Karaamathullah Sheriff**

Open Source Contributor

---

## ❤️ Built With

```text
Bun
React
TypeScript
Express
Prisma
PostgreSQL
OpenAI Realtime API
Deepgram
Google Gemini
Turborepo
Tailwind CSS
```

Built with ❤️ to explore the future of AI-powered technical interviews.

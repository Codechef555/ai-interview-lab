# AI Interviewer

> An AI-powered technical interview platform designed to simulate realistic interviews, evaluate candidate responses, and provide actionable feedback.

AI Interviewer combines conversational AI, voice interaction, and interview evaluation to create an interactive technical interview experience.

The platform is designed to conduct structured interviews across different technical domains while dynamically adapting the conversation based on the candidate's responses.

---

## Overview

Traditional interview preparation often relies on static question banks and predefined practice tests.

**AI Interviewer** takes a conversational approach.

The system acts as an intelligent interviewer that can:

* Generate relevant technical questions
* Conduct interactive interviews
* Ask contextual follow-up questions
* Understand candidate responses
* Adapt interview difficulty
* Evaluate technical answers
* Provide structured feedback
* Track interview performance

The goal is to create an interview experience that closely resembles a real technical interview.

---

## ✨ Features

### 🤖 AI-Powered Interviews

Generate dynamic interview questions using large language models instead of relying exclusively on static question banks.

### 💬 Conversational Interviews

The interviewer can maintain context throughout the session and generate follow-up questions based on previous responses.

### 🎤 Voice-Based Interaction

Support voice-driven interviews using speech recognition technology for a more natural interview experience.

### 🧠 Adaptive Questioning

Interview difficulty and question selection can adapt according to the candidate's performance.

### 📊 Interview Evaluation

Analyze responses across multiple dimensions, including:

* Technical correctness
* Problem-solving ability
* Communication
* Depth of understanding
* Approach and reasoning

### 📈 Performance Tracking

Store interview sessions and evaluation results to make it possible to analyze performance over time.

### 🏗️ Modular Architecture

The application is structured as a monorepo with independently maintainable frontend, backend, and shared packages.

---

## 🏛️ Architecture

```text
                         ┌─────────────────────┐
                         │      Candidate      │
                         └──────────┬──────────┘
                                    │
                              Voice / Text
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend      │
                         │       React        │
                         └──────────┬──────────┘
                                    │
                           HTTP / WebSocket
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Backend      │
                         │   Express + Bun    │
                         └───────┬─────┬──────┘
                                 │     │
                   ┌─────────────┘     └──────────────┐
                   ▼                                  ▼
          ┌─────────────────┐                ┌─────────────────┐
          │   Google Gemini │                │     Deepgram    │
          │       LLM       │                │  Speech / Voice │
          └────────┬────────┘                └────────┬────────┘
                   │                                  │
                   └──────────────┬───────────────────┘
                                  ▼
                         ┌─────────────────────┐
                         │      PostgreSQL     │
                         │       + Prisma      │
                         └─────────────────────┘
```

---

## 🧱 Project Structure

```text
ai-interviewer/
│
├── apps/
│   │
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── backend/
│       ├── prisma/
│       ├── scrapers/
│       ├── src/
│       └── package.json
│
├── packages/
│   │
│   ├── ui/
│   │   ├── components/
│   │   └── package.json
│   │
│   ├── eslint-config/
│   │
│   └── typescript-config/
│
├── package.json
├── turbo.json
├── bun.lock
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| React        | User interface              |
| TypeScript   | Type-safe development       |
| React Router | Application routing         |
| Tailwind CSS | Styling                     |
| Radix UI     | Accessible UI primitives    |
| Lucide       | Icons                       |
| Bun          | Runtime and package manager |

### Backend

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Bun        | Runtime                 |
| TypeScript | Type-safe backend       |
| Express    | HTTP API                |
| WebSockets | Real-time communication |
| PostgreSQL | Primary database        |
| Prisma     | Database ORM            |
| Zod        | Schema validation       |

### AI & Voice

| Technology    | Purpose                                   |
| ------------- | ----------------------------------------- |
| Google Gemini | Interview intelligence and generation     |
| Deepgram      | Speech recognition and voice capabilities |

### Development

| Technology | Purpose                |
| ---------- | ---------------------- |
| Turborepo  | Monorepo orchestration |
| ESLint     | Code quality           |
| Prettier   | Code formatting        |
| TypeScript | Static type checking   |

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* [Bun](https://bun.sh/)
* Node.js 18+
* PostgreSQL
* Google Gemini API credentials
* Deepgram API credentials

---

### 1. Clone the repository

```bash
git clone https://github.com/<username>/ai-interviewer.git

cd ai-interviewer
```

---

### 2. Install dependencies

```bash
bun install
```

---

### 3. Configure environment variables

Create the required environment files.

Example backend configuration:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai_interviewer"

GEMINI_API_KEY="your_gemini_api_key"

DEEPGRAM_API_KEY="your_deepgram_api_key"
```

Additional environment variables may be required depending on the deployment environment.

> Never commit secrets or environment files containing credentials.

---

## 🗄️ Database Setup

The backend uses PostgreSQL with Prisma.

Generate the Prisma client:

```bash
cd apps/backend

bunx prisma generate
```

Run database migrations:

```bash
bunx prisma migrate dev
```

Open Prisma Studio:

```bash
bunx prisma studio
```

---

## ▶️ Running the Application

Start the complete development environment:

```bash
bun dev
```

### Frontend

```bash
cd apps/frontend

bun dev
```

### Backend

```bash
cd apps/backend

bun run index.ts
```

---

## 🧪 Development Commands

From the project root:

```bash
# Start development servers
bun dev

# Build all applications
bun run build

# Run ESLint
bun run lint

# Type check
bun run check-types

# Format source code
bun run format
```

---

## 🔄 Interview Lifecycle

A typical interview session follows this workflow:

```text
┌───────────────┐
│ Create Session│
└───────┬───────┘
        │
        ▼
┌──────────────────┐
│ Configure Interview│
│ • Role            │
│ • Difficulty      │
│ • Topics          │
│ • Interview Type  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Start Interview  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Generate Question│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Candidate Answer │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Analyze Response │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Generate Follow- │
│ Up / Next Question│
└────────┬─────────┘
         │
         └──────────────┐
                        │
                        ▼
                Continue Interview
                        │
                        ▼
                 ┌──────────────┐
                 │ Final Report │
                 └──────────────┘
```

---

## 🎯 Interview Types

The platform is designed to support multiple interview formats.

### Technical Interviews

Evaluate knowledge of:

* Data Structures & Algorithms
* Object-Oriented Programming
* Databases
* Operating Systems
* Computer Networks
* Programming Languages
* Software Engineering

### System Design

Evaluate:

* Architecture
* Scalability
* Reliability
* Distributed systems
* Database design
* API design
* Trade-offs

### Coding Interviews

Support:

* Problem solving
* Algorithm design
* Complexity analysis
* Code quality
* Edge-case handling

### Behavioral Interviews

Evaluate:

* Communication
* Leadership
* Decision making
* Conflict resolution
* Team collaboration

### Resume-Based Interviews

Generate questions based on a candidate's:

* Resume
* Projects
* Experience
* Technical skills

---

## 📊 Evaluation

Interview results can be evaluated across multiple dimensions.

| Category           | Description                                |
| ------------------ | ------------------------------------------ |
| Technical Accuracy | Correctness of the response                |
| Problem Solving    | Reasoning and approach                     |
| Communication      | Clarity and structure                      |
| Depth              | Understanding beyond surface-level answers |
| Efficiency         | Ability to reach an effective solution     |
| Confidence         | Quality and consistency of responses       |

The evaluation system can produce both quantitative scores and qualitative feedback.

---

## 🗺️ Roadmap

### Core Interview Experience

* [ ] Interview configuration
* [ ] Interview session management
* [ ] AI-generated questions
* [ ] Context-aware follow-up questions
* [ ] Interview history

### Voice

* [ ] Speech-to-text
* [ ] Real-time voice interaction
* [ ] Streaming responses
* [ ] Voice activity detection
* [ ] Natural turn-taking

### AI

* [ ] Adaptive interview difficulty
* [ ] Context-aware questioning
* [ ] Structured AI outputs
* [ ] Interview evaluation
* [ ] Personalized feedback
* [ ] Interview scoring

### Analytics

* [ ] Performance dashboard
* [ ] Topic-wise performance
* [ ] Historical performance
* [ ] Weak-area detection
* [ ] Progress tracking

### Advanced Features

* [ ] Resume-based interviews
* [ ] Job-description-based interviews
* [ ] Coding environments
* [ ] System-design interviews
* [ ] RAG-powered question generation
* [ ] Multiple AI model support
* [ ] Custom interview configurations

---

## 🔐 Security Considerations

The application handles potentially sensitive information such as interview responses and candidate data.

Security considerations include:

* Secure API key management
* Environment-based secrets
* Server-side AI credentials
* Input validation
* Authentication and authorization
* Database access controls
* Secure WebSocket connections
* Protection against prompt injection
* Rate limiting
* Secure logging

---

## 📦 Deployment

The application is structured to support independent deployment of the frontend and backend.

A typical production architecture can be deployed as:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │   CDN / Proxy   │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
       ┌────────────┐    ┌────────────┐
       │  Frontend  │    │  Backend   │
       │   React    │    │   Bun/API  │
       └────────────┘    └─────┬──────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             ┌────────────┐       ┌────────────┐
             │ PostgreSQL │       │ AI / Voice │
             │            │       │ Providers  │
             └────────────┘       └────────────┘
```

---

## 📈 Future Architecture

As the system grows, the architecture can evolve toward:

```text
                  ┌────────────────────┐
                  │     Frontend       │
                  └─────────┬──────────┘
                            │
                            ▼
                  ┌────────────────────┐
                  │    API Gateway     │
                  └─────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
       ┌───────────┐  ┌───────────┐  ┌───────────┐
       │ Interview │  │ Evaluation│  │  Voice    │
       │ Service   │  │ Service   │  │  Service  │
       └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                  ┌────────────────────┐
                  │    PostgreSQL      │
                  └────────────────────┘
```

This allows individual components to scale independently as the platform evolves.

---

## 📚 Resources

* [Bun](https://bun.sh/)
* [Turborepo](https://turbo.build/)
* [React](https://react.dev/)
* [Prisma](https://www.prisma.io/)
* [Google Gemini](https://ai.google.dev/)
* [Deepgram](https://deepgram.com/)

---

## 📄 License

This project currently does not include an explicit open-source license.

If the project is released publicly for use or contribution, add an appropriate `LICENSE` file and update this section accordingly.

---

## 🚧 Project Status

**Active Development**

The platform is currently under active development. Features, architecture, and implementation details may evolve as the system progresses toward a production-ready AI interview experience.

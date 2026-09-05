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

🤝 Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a feature branch:
   
   git checkout -b feature/my-feature

3. Make your changes.

4. Run formatting, linting, type checks, and tests where applicable.

5. Commit your changes:
   
   git commit -m "feat: add my feature"

6. Push your branch and open a pull request.

📄 License

This project is licensed under the MIT License. See "LICENSE" (LICENSE) for details.

🔗 Repository

GitHub: https://github.com/Codechef555/ai-interview-lab

---

Built with ❤️ using Bun, React, TypeScript, Express, Prisma, PostgreSQL, and OpenAI.



# Turborepo starter pack 

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
bun dlx turbo build
bun exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
bun exec turbo build --filter=docs
bun exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
bun exec turbo dev
bun exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
bun exec turbo dev --filter=web
bun exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
bun exec turbo login
bun exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
bun exec turbo link
bun exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

<h1 align="center">Elrecord Backend</h1>

<p align="center">
  <strong>A Powerful & Scalable Chat Application Backend</strong>
</p>

<p align="center">
  Elrecord is a highly scalable, real-time backend infrastructure designed for a feature-rich community and messaging application. Inspired by platforms like Discord, it robustly supports direct messaging (DMs), group chatting, large-scale community servers, dynamic voice/video interactions, and comprehensive background processing.
</p>

---

## 🚀 Key Features

*   **Real-Time Messaging**: Built entirely on top of `Socket.IO` to ensure lightweight, instant message delivery and immediate state updates between clients.
*   **Direct & Community Conversations**:
    *   **Direct Messaging (DM)**: Fast, real-time 1-on-1 conversations.
    *   **Group Chats (Rooms)**: Multi-user group environments (supporting up to 5 concurrent users, with configurable boundaries).
    *   **Servers/Communities**: Massive hubs tailored to support larger groups (up to 100 users, configurable) built directly into the core ecosystem.
*   **Friendships & Social Graph**: End-to-end `FriendRequest` and social graphs. Easily send, accept, and reject connection requests.
*   **Advanced Authentication**: Full-fledged session and authentication strategies. Incorporates robust JWT mechanisms and structured **OTP (One-Time Passwords)** for foolproof email/action verifications.
*   **Background Jobs & Queues**: Leverage `BullMQ` intertwined with `Redis` to manage background communications (e.g., mail sending, push notifications) flawlessly without blocking the main event loop.
*   **Uncompromising Security**: Implements industry-grade security protocols utilizing `Helmet`, advanced algorithmic Rate-Limiting, strict CORS origin policies, and heavily safeguarded endpoints against brute-force/abuse.
*   **Data Structure**: Features a beautifully orchestrated dual-database flow, capitalizing mostly on **PostgreSQL (via Prisma ORM)** for strictly relational data (Users, Friends, OTPs, Roles) and supplementary Document-based storage as needed.

---

## 🛠 Tech Stack & Ecosystem

### Core Runtime & Frameworks
*   **Node.js**: Underlying JS runtime executing the non-blocking I/O operations.
*   **TypeScript**: Ensures strictly typed interfaces and enterprise-style codebase reliability.
*   **Express.js**: Foundation of the API request/response cycle.

### Data Layer
*   **PostgreSQL**: Handled completely via **Prisma ORM**; hosts the core structure (`Users`, `Friends`, `DMs`, `OTP`, `Rooms`).
*   **MongoDB**: Accessible (via `Mongoose`) for flexible document-driven structures, logging, or non-relational configurations.
*   **Redis**: Key-value store executing session storage, caching operations, and powering BullMQ.

### Utilities
*   **Socket.IO**: Bi-directional asynchronous event emitter acting as the backbone for chat/voice signaling.
*   **BullMQ**: High-performance background worker handling delayed or compute-intensive jobs.
*   **Swagger (OpenAPI)**: Clean, self-updating interactive API documentation interface.
*   **Jest**: Integrated testing framework supporting the testing suites.
*   **Docker & Docker Compose**: Automated containerization allowing localized isolated spinning up to match production.

---

## 📂 Architecture Overview

The backend relies on modularizing boundaries. Core logic is heavily abstracted to minimize cross-contamination across domains.

```tree
src/
├── Common/         # Reusable application guards, pipes, schemas, and structural utility logic.
├── Module/         # The isolated business domain areas (Controllers, Services, Routes):
│   ├── auth/       # Authentication, Sign In, Sign Up logic.
│   ├── user/       # End-user profile operations and queries.
│   ├── friends/    # Managing the friend request graph (Send, Accept, Reject actions).
│   └── otp/        # Safe one-time credential management and email verification logic.
├── Queue/          # Dedicated worker initializations intercepting BullMQ dispatch events.
├── core/           # Bootstrap contexts (DB Initializations, Redis Integrations, Env Checkers).
├── utils/          # Pure helper constructs, rate limiters, formatters.
├── app.config.ts   # Express bootstrap layer (Security middlewares, body parsers, limits).
├── app.module.ts   # Absolute route registrar dynamically mapping Modules onto /api/v1/ routes.
└── app.ts          # Root entry point resolving HTTP and Socket.IO servers.
```

---

## ⚙️ Prerequisites

To run this backend locally, ensure that your ecosystem satisfies the following constraints:
*   **Node.js**: `v18.x` or higher (utilizing `pnpm` as tracking manager).
*   **pnpm**: Recommended for faster module resolutions.
*   **Redis Server**: Running locally or exposed via URI.
*   **PostgreSQL**: Available on port 5432 or equivalently routable.
*   *(Optional)* **Docker Desktop**: In case you intend to spin up required DB environments without cluttering hosts.

---

## 📦 Installation & Setup

1. **Clone the Source:**
   ```bash
   git clone <repository-url>
   cd elrecord/Backend
   ```

2. **Retrieve Dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Blueprint:**
   Duplicate the provided `.env.dev` script to `.env` and fill the variables corresponding to your localized configuration:

   ```env
   NODE_ENV=development
   PORT=9999
   API_ENDPOINT_URL=http://localhost:9999

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/elrecord?schema=public"
   MONGODB_URI="mongodb://localhost:27017/elrecord"

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # Security Signatures
   JWT_SECRET="<YOUR_SECRET>"
   ```

4. **Prepare the Data Layer:**
   Deploy the relational blueprints mapped in Prisma to your connected Postgres instance:
   ```bash
   # Generates TypeScript typings out of the Prisma definitions
   pnpm dlx prisma generate

   # Syncs the DB schema aggressively
   pnpm dlx prisma db push
   ```

---

## 🚀 Running the App

### 🛠 Development Workflow
This boots the API server wrapped with `Nodemon` (hot-reloading enabled) while simultaneously firing up the background Queue Workers side-by-side using `concurrently`.
```bash
pnpm dev
```

### 🚢 Production Deployment
Prepare the robust transpiled scripts into `/dist` and ignite natively:
```bash
pnpm build
pnpm start
```

### 🐳 Docker Compose (Easiest Isolated Environment)
Avoid manually spinning up Redis or DB's, rely on Docker to bind everything appropriately:
```bash
docker-compose up -d
```

---

## 📜 Available Scripts

| Command | Action Handled |
| :--- | :--- |
| `pnpm dev` | Executes development engine alongside Queue Worker. |
| `pnpm build` | Typescript transpilation (Outputs strictly typed bundle to `/dist`). |
| `pnpm start` | Bootstraps production-ready bundled Javascript file. |
| `pnpm lint` | Triggers ESLint execution across the codebase, scanning for layout standard faults. |
| `pnpm test` | Locates and sequentially triggers Jest. |
| `pnpm taze:update` | Updates deeply nested dependencies via `taze` seamlessly. |

---

## 🛡 API Security & Standards

*   All heavy file streams are constrained effectively (Maximum payload of `75MB` limits configured internally via the application layer).
*   Traffic originates globally from strictly `allowedOrigins` (Vercel, FlyIO implementations supported actively).
*   Real-visitor IP proxying implemented (Handling `cf-connecting-ip`, `x-real-ip`).

---

## 🤝 Contribution Guidelines

1. **Fork** the Repository to your namespace.
2. Checkout logically named feature branches: `git checkout -b feature/cool-chat-addition`
3. Commit neatly (We advise angular-style commit patterns). `git commit -m "feat(socket): add broadcasting for new friendships"`
4. Push safely: `git push origin feature/cool-chat-addition`
5. Open an insightful **Pull Request**.

---

<p align="center">
  <i>Created securely using TypeScript & Express. For more structural questions, please view `/docs` or the API mapping.</i>
</p>

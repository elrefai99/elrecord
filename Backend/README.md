# Elrecord Backend

Elrecord is a powerful, scalable backend for a real-time chat application inspired by Discord. It supports direct messaging, group chats, and server-based communities with voice/video call capabilities.

## 🚀 Features

- **Direct Messaging (DM)**: Real-time 1-on-1 chat between users.
- **Group Chats**: Create groups with up to **5 users**, featuring integrated call functionality.
- **Servers**: Community hubs supporting up to **100 users**.
- **Scalability via Payments**: Premium options to expand server capacity beyond the default limits.
- **Real-time Communication**: Powered by Socket.IO for instant messaging and state updates.
- **Background Processing**: Efficient job queues using BullMQ and Redis.
- **Robust Security**: Implements Helmet, Rate Limiting, and CORS policies.
- **Media Management**: AWS S3 integration for file uploads.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**:
  - **PostgreSQL** (via Prisma ORM) - Primary relational data.
  - **MongoDB** (via Mongoose) - Flexible document storage.
- **Caching & Queues**: Redis & BullMQ.
- **Real-time**: Socket.IO.
- **Validation**: `class-validator`, `express-validator`.
- **API Documentation**: Swagger UI.
- **Containerization**: Docker & Docker Compose.

## 📂 Project Structure

```
src/
├── Common/         # Shared utilities and constants
├── Module/         # Feature modules (Auth, User, Chat, etc.)
├── Queue/          # Background job workers (BullMQ)
├── core/           # Core configurations (DB, Redis, Env)
├── middleware/     # Global middlewares
├── utils/          # Helper functions
├── app.ts          # Application entry point
└── app.module.ts   # Main route assembler
```

## ⚙️ Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **pnpm** (Package Manager)
- **Redis** (for caching and queues)
- **PostgreSQL**
- **MongoDB**

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd elrecord
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory based on `.env.dev` or the example below:

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
   
   # Authentication
   JWT_SECRET=your_super_secret_key
   
   # AWS S3 (if applicable)
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=your_bucket
   ```

4. **Database Setup:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

## 🚀 Running the Application

### Development Mode
Runs the server with hot-reload (Nodemon) and starts the queue worker.
```bash
pnpm dev
```

### Production Mode
Builds the TypeScript code and runs the compiled JavaScript.
```bash
pnpm build
pnpm start
```

### Docker
You can also run the application using Docker Compose:
```bash
docker-compose up -d
```

## 📜 Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Start the development server with hot-reload. |
| `pnpm build` | Compile TypeScript to JavaScript in `dist/`. |
| `pnpm start` | Run the production build. |
| `pnpm lint` | Lint the codebase using ESLint. |
| `pnpm test` | Run tests using Jest. |
| `pnpm taze:update` | Update dependencies. |

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.

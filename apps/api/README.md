# API Server

A NestJS-based REST API server for the AI Training Jobs platform. This API provides endpoints for user management, task management, and other core functionalities.

## Features

- **RESTful API**: Built with NestJS
- **Type Safety**: Full TypeScript support
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Validation**: Request validation with class-validator
- **Documentation**: Swagger/OpenAPI documentation
- **Testing**: Jest for unit and e2e tests
- **Caching**: Redis integration

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- Redis (v6 or later)
- npm (v8 or later)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the api directory with the following variables:
   ```env
   # Application
   NODE_ENV=development
   PORT=3000
   API_PREFIX=api
   API_VERSION=v1

   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_training_jobs?schema=public"

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # JWT
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRATION=1d

   # Swagger
   SWAGGER_TITLE=AI Training Jobs API
   SWAGGER_DESCRIPTION=The AI Training Jobs API documentation
   SWAGGER_VERSION=1.0
   SWAGGER_PATH=docs
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Push schema to database
   npm run prisma:push

   # Seed initial data
   npm run prisma:seed
   ```

4. **Start Development Server**
   ```bash
   npm run start:dev
   ```

## Project Structure

```
api/
├── src/
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   ├── tasks/          # Task management
│   ├── reviews/        # Review management
│   ├── submissions/    # Submission handling
│   ├── wallet/         # Wallet and transactions
│   ├── notifications/  # Notification system
│   ├── common/         # Shared utilities
│   └── main.ts         # Application entry point
├── test/              # Test files
└── prisma/            # Database schema and migrations
```

## Available Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run e2e tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed database
- `npm run prisma:studio` - Open Prisma Studio

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Users
- `GET /users` - List users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Tasks
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Reviews
- `GET /reviews` - List reviews
- `POST /reviews` - Create review
- `GET /reviews/:id` - Get review details
- `PUT /reviews/:id` - Update review

### Submissions
- `GET /submissions` - List submissions
- `POST /submissions` - Create submission
- `GET /submissions/:id` - Get submission details
- `PUT /submissions/:id` - Update submission

### Wallet
- `GET /wallet` - Get wallet details
- `POST /wallet/deposit` - Deposit funds
- `POST /wallet/withdraw` - Withdraw funds
- `GET /wallet/transactions` - List transactions

## Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow NestJS best practices
   - Use dependency injection
   - Write unit tests

2. **API Design**
   - Follow RESTful principles
   - Use proper HTTP methods
   - Implement proper error handling
   - Add request validation

3. **Database**
   - Use Prisma for database operations
   - Write migrations for schema changes
   - Add indexes for performance
   - Handle relationships properly

4. **Testing**
   - Write unit tests for services
   - Write e2e tests for controllers
   - Mock external dependencies
   - Test error cases

## Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   # Set production environment variables
   NODE_ENV=production
   ```

2. **Build the Application**
   ```bash
   npm run build
   ```

3. **Database Migration**
   ```bash
   npm run prisma:push
   ```

4. **Start Production Server**
   ```bash
   npm run start:prod
   ```

### Docker Deployment
```bash
# Build Docker image
docker build -t ai-training-jobs-api .

# Run container
docker run -p 3000:3000 ai-training-jobs-api
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure database exists

2. **Redis Connection Issues**
   - Verify Redis server is running
   - Check Redis connection settings
   - Ensure Redis port is accessible

3. **API Issues**
   - Check API logs
   - Verify environment variables
   - Ensure all services are running

### Getting Help

- Check the [Issues](https://github.com/yourusername/ai-training-jobs/issues) page
- Review the [Wiki](https://github.com/yourusername/ai-training-jobs/wiki)
- Contact the development team 
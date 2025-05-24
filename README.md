# NexusLoop

A modern, scalable application built with NestJS, React, and Prisma. NexusLoop is designed to provide a robust platform for managing and automating various business processes with a focus on performance, scalability, and developer experience.

## Features

- **Modern Tech Stack**: Built with NestJS, React, and Prisma for optimal performance and developer experience
- **Type Safety**: Full TypeScript support across the entire application
- **API Documentation**: Auto-generated Swagger documentation
- **Database Management**: Prisma ORM with PostgreSQL for robust data handling
- **Caching**: Redis integration for improved performance
- **Authentication**: JWT-based authentication system
- **Modular Architecture**: Monorepo structure using Turborepo for better code organization
- **Development Tools**: Hot reloading, linting, and testing setup

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- Redis (v6 or later)
- npm (v8 or later)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexusloop.git
   cd nexusloop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Application
   NODE_ENV=development
   PORT=3000
   API_PREFIX=api
   API_VERSION=v1

   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexusloop?schema=public"

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # JWT
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRATION=1d

   # Swagger
   SWAGGER_TITLE=NexusLoop API
   SWAGGER_DESCRIPTION=The NexusLoop API documentation
   SWAGGER_VERSION=1.0
   SWAGGER_PATH=docs
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data
   npm run db:seed
   ```

5. **Start Development Servers**
   ```bash
   # Start all services
   npm run dev

   # Or start individual services
   npm run dev:api     # API server
   npm run dev:web     # Web application
   ```

## Project Structure

```
nexusloop/
├── apps/
│   ├── api/          # NestJS API server
│   └── web/          # React web application
├── packages/
│   ├── config/       # Shared configuration
│   ├── db/           # Database package
│   ├── types/        # Shared TypeScript types
│   └── ui/           # Shared UI components
└── package.json
```

## Available Scripts

- `npm run build` - Build all packages
- `npm run dev` - Start all services in development mode
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## API Documentation

Once the API server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow the existing code style
   - Run `npm run lint` before committing

2. **Git Workflow**
   - Create feature branches from `main`
   - Use conventional commits
   - Submit PRs for review

3. **Testing**
   - Write unit tests for new features
   - Maintain test coverage
   - Run tests before committing

4. **Documentation**
   - Update README.md for major changes
   - Document API changes in Swagger
   - Add JSDoc comments for complex functions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Architecture Overview

### Backend (NestJS)
- RESTful API endpoints
- JWT authentication
- Request validation
- Error handling
- Database integration
- Caching layer

### Frontend (React)
- Modern UI components
- State management
- Form handling
- API integration
- Responsive design

### Shared Packages
- **config**: Environment and application configuration
- **db**: Database models and migrations
- **types**: Shared TypeScript interfaces and types
- **ui**: Reusable React components

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
   npm run db:push
   ```

4. **Start Production Server**
   ```bash
   npm run start:prod
   ```

### Docker Deployment
```bash
# Build Docker image
docker build -t nexusloop .

# Run container
docker run -p 3000:3000 nexusloop
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

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify all dependencies are installed

4. **API Issues**
   - Check API logs
   - Verify environment variables
   - Ensure all services are running

### Getting Help

- Check the [Issues](https://github.com/yourusername/nexusloop/issues) page
- Review the [Wiki](https://github.com/yourusername/nexusloop/wiki)
- Contact the development team 
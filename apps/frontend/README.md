# Frontend Application

A modern React application built with Next.js, TypeScript, and Tailwind CSS. This frontend application provides a user interface for the AI Training Jobs platform.

## Features

- **Modern UI**: Built with Next.js 14 and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Authentication**: JWT-based authentication with protected routes
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Light and dark mode
- **Component Library**: Reusable UI components
- **State Management**: React Context for global state
- **API Integration**: Type-safe API client

## Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the frontend directory with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── lib/             # Utility functions and API client
│   ├── styles/          # Global styles
│   └── types/           # TypeScript types
├── public/              # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Component Library

The application uses a custom component library built with Tailwind CSS. Key components include:

- **Button**: Various button styles and variants
- **Card**: Container for content
- **Input**: Form input fields
- **Label**: Form labels
- **Badge**: Status indicators
- **Sidebar**: Navigation sidebar
- **Topbar**: Top navigation bar

## Authentication

The application uses JWT-based authentication with the following features:

- Protected routes
- Login/Register forms
- Token refresh
- Session management
- User profile

## API Integration

The frontend communicates with the backend API using a type-safe API client:

- Axios for HTTP requests
- TypeScript types for request/response
- Error handling
- Token management
- Request/response interceptors

## Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow the existing code style
   - Run `npm run lint` before committing

2. **Component Development**
   - Create components in the `components` directory
   - Use TypeScript interfaces for props
   - Add JSDoc comments for complex components
   - Follow the existing component patterns

3. **State Management**
   - Use React Context for global state
   - Keep component state local when possible
   - Use custom hooks for reusable logic

4. **Testing**
   - Write unit tests for components
   - Test user interactions
   - Maintain test coverage

## Deployment

### Production Build

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm run start
   ```

### Environment Variables

Required environment variables for production:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Clear `.next` directory
   - Check for TypeScript errors
   - Verify all dependencies are installed

2. **API Connection Issues**
   - Verify API server is running
   - Check API URL in environment variables
   - Ensure CORS is properly configured

3. **Authentication Issues**
   - Check token storage
   - Verify token expiration
   - Ensure proper error handling

### Getting Help

- Check the [Issues](https://github.com/yourusername/ai-training-jobs/issues) page
- Review the [Wiki](https://github.com/yourusername/ai-training-jobs/wiki)
- Contact the development team 
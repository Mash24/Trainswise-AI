const { execSync } = require('child_process');
const path = require('path');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Create .env files if they don't exist
const apiEnvPath = path.join(__dirname, '../apps/api/.env');
const frontendEnvPath = path.join(__dirname, '../apps/frontend/.env');

// API .env
const apiEnvContent = `# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexusloop?schema=public"
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexusloop_test?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# App
NODE_ENV="development"
PORT=3001

# CORS
CORS_ORIGIN="http://localhost:3000"`;

// Frontend .env
const frontendEnvContent = `# API
NEXT_PUBLIC_API_URL="http://localhost:3001"`;

// Write .env files
require('fs').writeFileSync(apiEnvPath, apiEnvContent);
require('fs').writeFileSync(frontendEnvPath, frontendEnvContent);

// Install dependencies
console.log('Installing dependencies...');
runCommand('npm install');

// Generate Prisma client
console.log('Generating Prisma client...');
runCommand('cd apps/api && npx prisma generate');

// Run database migrations
console.log('Running database migrations...');
runCommand('cd apps/api && npx prisma migrate dev');

console.log('Setup completed successfully!');
console.log('\nTo start the application:');
console.log('1. Start the API: cd apps/api && npm run start:dev');
console.log('2. Start the Frontend: cd apps/frontend && npm run dev'); 
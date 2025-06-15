#!/bin/bash

# Remove node_modules and build artifacts
echo "Cleaning node_modules and build artifacts..."
rm -rf node_modules apps/api/node_modules apps/frontend/node_modules packages/*/node_modules
rm -rf dist apps/api/dist apps/frontend/.next

# Reset the dev database
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nexusloop?schema=public"
npx prisma migrate reset --schema=apps/api/prisma/schema.prisma --force --skip-seed

# Install dependencies
echo "Installing dependencies..."
npm install

# Generate Prisma client
npx prisma generate --schema=apps/api/prisma/schema.prisma

echo "Dev environment reset complete." 
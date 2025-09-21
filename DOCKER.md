# Docker Setup for Polling Next.js App

This document explains how to run the polling application using Docker.

## Files Created

- `Dockerfile` - Multi-stage build for optimized production image
- `.dockerignore` - Excludes unnecessary files from Docker context
- `docker-compose.yml` - Easy container orchestration
- `next.config.ts` - Updated with `output: 'standalone'` for Docker optimization

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the application
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the application
docker-compose down
```

### Option 2: Using Docker Commands

```bash
# Build the image
docker build -t polling-next .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BEE_API_URL=http://your-api-server.com \
  polling-next

# Run with environment file
docker run -p 3000:3000 --env-file .env.local polling-next
```

## Environment Variables

Set these environment variables for your deployment:

- `NEXT_PUBLIC_BEE_API_URL` - Your API server URL (required for client-side)
- `NODE_ENV` - Set to `production` for production builds

### Example .env.local
```
NEXT_PUBLIC_BEE_API_URL=http://34.18.142.59:8080
```

## Docker Image Details

The Dockerfile uses a multi-stage build:

1. **deps** - Installs only production dependencies
2. **builder** - Builds the Next.js application
3. **runner** - Creates the final lightweight production image

### Image Optimizations

- Uses Alpine Linux for smaller image size
- Leverages Next.js standalone output for minimal runtime
- Runs as non-root user for security
- Excludes development dependencies and source code

## Deployment

### Local Development
```bash
docker-compose up --build
```

### Production Deployment
```bash
# Build for production
docker build -t polling-next:latest .

# Run with production settings
docker run -d \
  --name polling-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BEE_API_URL=https://your-production-api.com \
  --restart unless-stopped \
  polling-next:latest
```

### Container Registry
```bash
# Tag for registry
docker tag polling-next:latest your-registry/polling-next:latest

# Push to registry
docker push your-registry/polling-next:latest
```

## Troubleshooting

### Common Issues

1. **Environment variables not working**: Make sure you use `NEXT_PUBLIC_` prefix for client-side variables

2. **Port conflicts**: Change the host port in docker-compose.yml or docker run command

3. **Build failures**: Check that all dependencies are properly listed in package.json

### Debugging

```bash
# View container logs
docker-compose logs polling-app

# Access container shell
docker-compose exec polling-app sh

# Check container status
docker-compose ps
```

## Performance Notes

- The image uses Next.js standalone output for optimal performance
- Static assets are properly cached
- The container runs as a non-root user for security
- Memory usage is optimized through multi-stage builds

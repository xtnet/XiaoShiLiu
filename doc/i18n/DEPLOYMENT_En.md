# Deployment Guide

This document provides detailed instructions for deploying the Xiaoshiliu Image-Text Community project, including deployment processes and configuration instructions.

## Deployment Methods

The project supports two deployment methods:

1. **Docker One-Click Deployment** (Recommended) - Simple and fast, suitable for production environments
2. **Traditional Deployment** - Manual configuration, suitable for development environments

---

## 🐳 Docker One-Click Deployment (Recommended)

### Environment Requirements

- Docker >= 20.0
- Docker Compose >= 2.0
- Available Memory >= 2GB
- Available Disk Space >= 5GB

### Images and Version Information

| Component | Image/Source | Version/Tag | Description |
|-----------|--------------|-------------|-------------|
| Database | mysql | 8.0 | Uses official image `mysql:8.0`, utf8mb4 default configuration |
| Backend Runtime | node | 18-alpine | `express-project/Dockerfile` uses `node:18-alpine` |
| Frontend Build | node | 18-alpine | `vue3-project/Dockerfile` build stage uses |
| Frontend Runtime | nginx | alpine | Uses `nginx:alpine` to serve static files |
| Compose Health Check | wget | - | Frontend health check uses `wget --spider http://localhost/` |

> Note: The above versions are consistent with `docker-compose.yml` and frontend/backend `Dockerfile`; if changes are needed, please synchronize corresponding files and documentation.

### Quick Start

#### 1. Clone the Project

```bash
git clone https://github.com/ZTMYO/XiaoShiLiu.git
cd XiaoShiLiu
```

#### 2. Configure Environment Variables (Optional)

```bash
# Optional: If you have custom environment variables, you can create a .env file
# This repository does not provide .env.docker, if no special requirements, you can skip directly and use default values in docker-compose.yml
```

#### 3. One-Click Start

**Windows Users:**
```powershell
# Start services
.\deploy.ps1

# Rebuild and start
.\deploy.ps1 -Build

# Start and seed sample data (optional)
.\deploy.ps1 -Build -Seed
# Or seed separately after services are started
.\deploy.ps1 -Seed

# Check service status
.\deploy.ps1 -Status

# View logs
.\deploy.ps1 -Logs

# Stop services
.\deploy.ps1 -Stop
```

**Linux/macOS Users:**
```bash
# Give script execution permissions
chmod +x deploy.sh

# Start services
./deploy.sh

# Rebuild and start
./deploy.sh --build

# Check service status
./deploy.sh --status

# View logs
./deploy.sh --logs

# Stop services
./deploy.sh --stop
```

#### 4. Access the Application

After services start successfully, you can access through the following addresses:

| Service | Address | Description |
|---------|---------|-------------|
| Frontend Interface | http://localhost | Main access entry |
| Backend API | http://localhost:3001 | API endpoints |
| Database | localhost:3306 | MySQL database |

### Docker Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │     MySQL       │
│   (Nginx)       │◄───┤   (Express)     │◄───┤   (Database)    │
│   Port: 80      │    │   Port: 3001    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Environment Variable Configuration

The project uses `.env` files for configuration, main configuration items:

```env
# Database configuration
DB_HOST=mysql
DB_USER=xiaoshiliu_user
DB_PASSWORD=123456
DB_NAME=xiaoshiliu

# JWT configuration
JWT_SECRET=xiaoshiliu_secret_key_2025_docker
JWT_EXPIRES_IN=7d

# Upload configuration
UPLOAD_MAX_SIZE=50mb
# Image upload strategy (local: local storage, imagehost: third-party image hosting)
UPLOAD_STRATEGY=imagehost

# Local storage configuration
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# Third-party image hosting configuration
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000

# API configuration
API_BASE_URL=http://localhost:3001
```

### Common Commands

```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Enter container (alpine images usually don't have bash, please use sh)
docker-compose exec backend sh
# Or enter MySQL client
docker-compose exec mysql mysql -u root -p

# Backup database
docker-compose exec mysql mysqldump -u root -p xiaoshiliu > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p xiaoshiliu < backup.sql
```

### Data Persistence

Docker deployment uses data volumes for data persistence:

- `mysql_data`: MySQL database files
- `backend_uploads`: Backend upload files

### Troubleshooting

#### 1. Port Conflicts

If you encounter port conflicts, you can modify port mappings in `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Modify frontend port
  backend:
    ports:
      - "3002:3001"  # Modify backend port
```

#### 2. Insufficient Memory

Ensure the system has enough memory, you can check resource usage with:

```bash
docker stats
```

#### 3. Database Connection Failure / Data Seeding

- Check if database service is running normally:

```bash
docker-compose logs mysql
```

- Seed sample data (Windows):
```powershell
.\deploy.ps1 -Seed
```

- Seed sample data (manual execution):
```bash
docker-compose exec -T backend node scripts/generate-data.js
```

#### 4. Cleanup and Reset

If you encounter issues and need to start over:

```bash
# Windows
.\deploy.ps1 -Clean

# Linux/macOS
./deploy.sh --clean
```

---

## 📋 Traditional Deployment Method

## Environment Requirements

| Component | Version Requirement | Description |
|-----------|--------------------|--------------|
| Node.js | >= 16.0.0 | Runtime environment |
| MySQL | >= 5.7 | Database |
| MariaDB | >= 10.3 | Database (optional) |
| npm | >= 8.0.0 | Package manager |
| yarn | >= 1.22.0 | Package manager (optional) |
| Browser | ES6+ support | Modern browser |

## Quick Start

### 1. Install Dependencies

```bash
# Using cnpm
cnpm install
# Or using yarn
yarn install
```

### 2. Configure Backend API Address

Create environment configuration file (optional):

```bash
# Copy environment configuration template
cp .env.example .env
```

Edit `.env` file to configure backend API address:

```env
# Backend API address
VITE_API_BASE_URL=http://localhost:3001

# Other configurations...
```

### 3. Start Development Server

```bash
# Start development server
npm run dev

# Or using yarn
yarn dev
```

Development server will start at `http://localhost:5173`

### 4. Build Production Version

```bash
# Build production version
npm run build

# Preview production version
npm run preview
```

## Backend Service Configuration

⚠️ **Important Reminder**: The frontend project needs to work with backend services

1. **Start Backend Service**:
   ```bash
   # Enter backend project directory
   cd ../express-project
   
   # Install backend dependencies
   npm install
   
   # Start backend service
   npm start
   ```

2. **Backend Service Address**: `http://localhost:3001`

3. **API Documentation**: Check the `API_DOCS.md` file in the backend project

## Development Environment Configuration

### Environment Check

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

### Development Server

```bash
# Start development server (hot reload)
npm run dev

# Access address: http://localhost:5173
```

### Code Standards

- Use Vue 3 Composition API
- Follow Vue.js official style guide
- Component naming uses PascalCase
- File naming uses kebab-case

## Configuration File Description

### Frontend Configuration Files (vue3-project directory)

| File | Description |
|------|-------------|
| `.env` | Environment variable configuration file |
| `vite.config.js` | Vite build tool configuration |
| `package.json` | Project dependencies and script configuration |
| `jsconfig.json` | JavaScript project configuration |

### Backend Configuration Files (express-project directory)

| File | Description |
|------|-------------|
| `config/config.js` | Main configuration file |
| `config/database.js` | Database configuration |
| `.env` | Environment variable configuration file |
| `database_design.md` | Database design documentation |
| `scripts/init-database.js` | Database initialization script |
| `generate-data.js` | Test data generation script |

## npm Script Commands

### Frontend Scripts (execute in vue3-project directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production version |
| `npm run preview` | Preview production version |

### Backend Scripts (execute in express-project directory)

| Command | Description |
|---------|-------------|
| `npm start` | Start server |
| `npm run dev` | Start development server (hot reload) |
| `npm run init-db` | Initialize database |
| `npm run generate-data` | Generate test data |

## Environment Variable Configuration

### Frontend Environment Variables (vue3-project/.env)

```env
# API server address
VITE_API_BASE_URL=http://localhost:3001/api

# Other frontend configurations
VITE_APP_TITLE=Xiaoshiliu Image-Text Community
VITE_USE_REAL_API=true
```

### Backend Environment Variables (express-project/.env)

```env
# Server configuration
NODE_ENV=development
PORT=3001

# JWT configuration
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# Database configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# API configuration
API_BASE_URL=http://localhost:3001

# Upload configuration
UPLOAD_MAX_SIZE=50mb
```

## Database Script Description

All database-related scripts in the project are unified in the `express-project/scripts/` directory for easy management and use:

### Script File Introduction

#### 1. Database Initialization Script
- **File Location**: `scripts/init-database.js`
- **Function**: Create database and all data table structures
- **Usage**:
  ```bash
  cd express-project
  node scripts/init-database.js
  ```
- **Description**: Must be run on first deployment, will automatically create `xiaoshiliu` database and 12 data tables

#### 2. Test Data Generation Script
- **File Location**: `scripts/generate-data.js`
- **Function**: Generate simulated users, posts, comments and other test data
- **Usage**:
  ```bash
  cd express-project
  node scripts/generate-data.js
  ```
- **Description**: Optional run, used to quickly populate test data, including 50 users, 200 posts, 800 comments, etc.

#### 3. SQL Initialization File
- **File Location**: `scripts/init-database.sql`
- **Function**: Pure SQL version of database initialization script
- **Usage**: Can be executed directly in MySQL client
- **Description**: Same function as `init-database.js`, provides SQL version for reference

#### 4. Sample Image Update Script
- **File Location**: `scripts/update-sample-images.js`
- **Function**: Automatically get latest image links and update sample images in database
- **Usage**:
  ```bash
  cd express-project
  node scripts/update-sample-images.js
  ```
- **Description**:
  - Automatically get latest image links from Liciyuan API
  - Update `imgLinks/avatar_link.txt` (50 avatar links)
  - Update `imgLinks/post_img_link.txt` (300 post image links)
  - Batch update user avatars and post images in database
  - Support statistics display of image counts before and after update

## Development Environment Startup Process

### 1. Start Backend Service

```bash
# Open first terminal, enter backend directory
cd express-project

# Install backend dependencies (first run)
npm install

# Configure database (first run)
# Edit config/config.js or .env file

# Initialize database (first run)
node scripts/init-database.js

# Generate test data (optional)
node scripts/generate-data.js

# Start backend service
npm start
# Backend service runs at http://localhost:3001
```

### 2. Start Frontend Service

```bash
# Open second terminal, enter frontend directory
cd vue3-project

# Install frontend dependencies (first run)
npm install

# Configure API address (optional)
# Edit .env file, set VITE_API_BASE_URL

# Start frontend development server
npm run dev
# Frontend service runs at http://localhost:5173
```

### 3. Access Application

| Service | Address |
|---------|----------|
| Frontend Interface | http://localhost:5173 |
| Backend API | http://localhost:3001 |

---

*Last Updated: January 16, 2025*
*Deployment Guide Version: 1.0.3*
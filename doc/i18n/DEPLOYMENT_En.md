# Deployment Guide

This document provides a detailed description of the deployment process and configuration instructions for the XiaoShiLiu image and text community project.

## Deployment Methods

The project supports two deployment methods:

1. **Docker One-click Deployment** (recommended) - Simple and quick, suitable for production environments
2. **Traditional Deployment** - Manual configuration, suitable for development environments

---

## 🐳 Docker One-click Deployment (Recommended)

### Environment Requirements

- Docker >= 20.0
- Docker Compose >= 2.0
- Available Memory >= 2GB
- Available Disk Space >= 5GB

### Image and Version Description

| Component | Image/Source | Version/Tag | Description |
|-----------|--------------|-------------|-------------|
| Database | mysql | 8.0 | Uses the official image `mysql:8.0` with utf8mb4 default configuration |
| Backend Runtime | node | 18-alpine | `express-project/Dockerfile` uses `node:18-alpine` |
| Frontend Build | node | 18-alpine | `vue3-project/Dockerfile` uses it during the build phase |
| Frontend Runtime | nginx | alpine | Uses `nginx:alpine` to provide static files |
| Compose Health Check | wget | - | Frontend health check uses `wget --spider http://localhost/` |

> Note: The above versions are consistent with `docker-compose.yml` and the front-end `Dockerfile`; if changes are required, please adjust the corresponding files and documentation accordingly.
### Quick Start

#### 1. Clone the Project

```bash
git clone https://github.com/ZTMYO/XiaoShiLiu.git
cd XiaoShiLiu
```

#### 2. Configure Environment Variables (Optional)

```bash
# Optional: If you have custom environment variables, you can create a .env file
# This repository does not provide .env.docker, if there is no special need, you can skip it and use the default values in docker-compose.yml
```

#### 3. One-click Start

**Windows Users:**

```powershell
# Start services
.\deploy.ps1

# Rebuild and start
.\deploy.ps1 -Build

# Start and seed example data (optional)
.\deploy.ps1 -Build -Seed
# Or seed data separately after the service has started
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
# Give the script execution permission
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

After the service starts successfully, you can access the application through the following addresses:

| Service | Address | Description |
|---------|---------|-------------|
| Frontend Interface | http://localhost:8080 | Main access entry |
| Backend API | http://localhost:3001 | API service |
| Database | localhost:3307 | MySQL database |

### Docker Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │     MySQL       │
│   (Nginx)       │◄───┤   (Express)     │◄───┤   (Database)    │
│   Port: 80      │    │   Port: 3001    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Environment Variable Configuration

The project uses a `.env` file for configuration, with separate environment settings for the frontend and backend:

#### Backend Environment Variables (express-project/.env)

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=xiaoshiliu_secret_key_2025
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=xiaoshiliu
DB_PORT=3306

# Upload Configuration
UPLOAD_MAX_SIZE=50mb
# Image Upload Strategy (local: Local Storage, imagehost: Third-party Image Hosting)
UPLOAD_STRATEGY=imagehost

# Local Storage Configuration
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# Third-party Image Hosting Configuration
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000
# Upload Strategy: local (Local Storage) or imagehost (Third-party Image Hosting)
UPLOAD_STRATEGY=local

# Local Storage Configuration
LOCAL_UPLOAD_DIR=uploads
LOCAL_BASE_URL=http://localhost:3001

# Third-party Image Hosting Configuration
IMAGEHOST_API_URL=https://api.xinyew.cn/api/jdtc
IMAGEHOST_TIMEOUT=60000

# API Configuration
API_BASE_URL=http://localhost:3001

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Environment Variables (vue3-project/.env)

```env
# API Base URL Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Use Real API
VITE_USE_REAL_API=true

# Application Title
VITE_APP_TITLE=Small石榴 Image and Text Community
```

#### Docker Environment Variable Description

When deploying with Docker, environment variables are configured through `docker-compose.yml`:

```env
# Database Configuration (Docker Environment)
DB_HOST=mysql
DB_USER=xiaoshiliu_user
DB_PASSWORD=123456
DB_NAME=xiaoshiliu

# JWT Configuration
JWT_SECRET=xiaoshiliu_secret_key_2025_docker
JWT_EXPIRES_IN=7d

# Upload Configuration
UPLOAD_MAX_SIZE=50mb
# Image Upload Strategy (local: Local Storage, imagehost: Third-party Image Hosting)
UPLOAD_STRATEGY=imagehost

# API Configuration
API_BASE_URL=http://localhost:3001
```

### Common Commands

```bash
# View Service Status
docker-compose ps

# View Service Logs
docker-compose logs -f

# Restart a Specific Service
docker-compose restart backend

# Enter a Container (Alpine images usually do not have bash, please use sh)
docker-compose exec backend sh
# Or enter the MySQL client
docker-compose exec mysql mysql -u root -p

# Backup Database
docker-compose exec mysql mysqldump -u root -p xiaoshiliu > backup.sql

# Restore Database
docker-compose exec -T mysql mysql -u root -p xiaoshiliu < backup.sql
```

### Data Persistence

Docker Deployment Using Data Volumes for Data Persistence:

- `mysql_data`: MySQL database files
- `backend_uploads`: Backend upload files

### Troubleshooting

#### 1. Port Conflict

If you encounter a port conflict, you can modify the port mapping in the `docker-compose.yml` file:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Modify the frontend port
  backend:
    ports:
      - "3002:3001"  # Modify the backend port
```

#### 2. Insufficient Memory

Ensure that the system has enough memory, and you can check resource usage with the following command:

```bash
docker stats
```

#### 3. Database Connection Failure / Data Injection

- Check if the database service is started normally:

```bash
docker-compose logs mysql
```

- Inject sample data (Windows):
```powershell
.\deploy.ps1 -Seed
```

- Inject sample data (manual execution):
```bash
docker-compose exec -T backend node scripts/generate-data.js
```

#### 4. File Upload Permission Issues

**Problem Phenomenon**:
- When the frontend uploads a file, it returns a 400 error
- The backend logs show: `EACCES: permission denied, open '/app/uploads/xxx.png'`

**Reason Analysis**:
Permission issue with the uploads directory inside the Docker container, the directory belongs to the root user, but the application runs under the nodejs user.

**Solution**:

1. **Check uploads directory permissions**:
```bash
docker-compose exec backend ls -la /app/uploads
```

2. **Fix permission issues**:
```bash
# Modify the directory owner using the root user
docker-compose exec --user root backend chown -R nodejs:nodejs /app/uploads
```

3. **Verify permission fix**:
```bash
# Confirm that the directory now belongs to the nodejs user
docker-compose exec backend ls -la /app/uploads
```

**Preventive Measures**:
- Ensure that the uploads directory permissions are set correctly in the Dockerfile
- Automatically fix permissions issues at container startup

#### 5. Upload Strategy Configuration

The project supports two file upload strategies:

**Local Storage Mode** (recommended for development and small deployments):
```yaml
# Set in docker-compose.yml
environment:
  UPLOAD_STRATEGY: local
```

**Third-party Image Hosting Mode** (recommended for production environments):
```yaml
# Set in docker-compose.yml
environment:
  UPLOAD_STRATEGY: imagehost
```

#### 6. Cleanup and Reset

If you need to restart from scratch due to issues:

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
|-----------|---------------------|-------------|
| Node.js   | >= 16.0.0           | Runtime environment |
| MySQL     | >= 5.7               | Database     |
| MariaDB   | >= 10.3             | Database (optional) |
| npm       | >= 8.0.0             | Package manager |
| yarn      | >= 1.22.0            | Package manager (optional) |
| Browser   | Supports ES6+       | Modern browser |

## Quick Start

### 1. Install Dependencies

```bash
# Use cnpm
cnpm install
# Or use yarn
yarn install
```

### 2. Configure Backend API Address

Create an environment configuration file (optional):

```bash
# Copy environment configuration template
cp .env.example .env
```

Edit the `.env` file to configure the backend API address:

```env
# Backend API address
VITE_API_BASE_URL=http://localhost:3001

# Other configurations...
```

### 3. Start the Development Server

```bash
# Start the development server
npm run dev

# Or use yarn
yarn dev

The development server will start at `http://localhost:5173`.

### 4. Build Production Version

```bash
# Build production version
npm run build

# Preview production version
npm run preview
```

## Backend Service Configuration

⚠️ **Important Reminder**: The front-end project needs to be used with the backend service.

1. **Start Backend Service**:
   ```bash
   # Navigate to the backend project directory
   cd ../express-project
   
   # Install backend dependencies
   npm install
   
   # Start backend service
   npm start
   ```

2. **Backend Service Address**: `http://localhost:3001`

3. **API Documentation**: Check the `API_DOCS.md` file in the backend project.

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

### Code Specification

- Use Vue 3 Composition API
- Follow the Vue.js official style guide
- Component naming in PascalCase
- File naming in kebab-case

## Configuration File Description

### Frontend Configuration Files (in vue3-project directory)

| File | Description |
|------|------|
| `.env` | Environment variable configuration file |
| `vite.config.js` | Vite build tool configuration |
| `package.json` | Project dependencies and scripts configuration |
| `jsconfig.json` | JavaScript project configuration |

### Backend Configuration Files (in express-project directory)

| File | Description |
|------|------|
| `config/config.js` | Main configuration file |
| `.env` | Environment variable configuration file |
| `database_design.md` | Database design document |
| `scripts/init-database.js` | Database initialization script |
| `generate-data.js` | Test data generation script |

## npm Script Commands

### Frontend Scripts (to be executed in vue3-project directory)

| Command | Description |
|------|------|
| `npm run dev` | Start development server |
| `npm run build` | Build production version |
| `npm run preview` | Preview production version |

### Backend Scripts (to be executed in express-project directory)

| Command | Description |
|------|------|
| `npm start` | Start server |
| `npm run dev` | Start development server (hot reload) |
| `npm run init-db` | Initialize database |
| `npm run generate-data` | Generate test data |

## Environment Variable Configuration

### Frontend Environment Variables (in vue3-project/.env)

```env
# API server address
VITE_API_BASE_URL=http://localhost:3001/api

# Other frontend configurations
VITE_APP_TITLE=Small Pear Graphic Community
VITE_USE_REAL_API=true
```

### Backend Environment Variables (in express-project/.env)

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

The database-related scripts of the project are all placed in the `express-project/scripts/` directory for easy management and use:

### Script File Introduction

#### 1. Database Initialization Script
- **File Location**: `scripts/init-database.js`
- **Function**: Creates the database and all table structures
- **Usage**:
  ```bash
  cd express-project
  node scripts/init-database.js
  ```
- **Description**: Must be run during the first deployment, which will automatically create the `xiaoshiliu` database and 12 data tables

#### 2. Test Data Generation Script
- **File Location**: `scripts/generate-data.js`
- **Function**: Generates simulated test data for users, notes, comments, etc.
- **Usage**:
  ```bash
  cd express-project
  node scripts/generate-data.js
  ```
- **Description**: Optional to run, used for quickly populating test data, including 50 users, 200 notes, and 800 comments, etc.

#### 3. SQL Initialization File
- **File Location**: `scripts/init-database.sql`
- **Function**: Database initialization script in pure SQL
- **Usage**: Can be directly executed in the MySQL client
- **Description**: Functions the same as `init-database.js`, providing an SQL version for reference

#### 4. Sample Image Update Script
- **File Location**: `scripts/update-sample-images.js`
- **Function**: Automatically retrieves the latest image links and updates the sample images in the database
- **Usage**:
  ```bash
  cd express-project
  node scripts/update-sample-images.js
  ```
- **Description**:
  - Automatically retrieves the latest image links from the LiCiYuan API
  - Updates `imgLinks/avatar_link.txt` (50 avatar links)
  - Updates `imgLinks/post_img_link.txt` (300 note image links)
  - Batch updates user avatars and note images in the database
  - Supports statistical display of the number of images before and after the update

## Development Environment Startup Process

### 1. Starting the Backend Service

```bash
# Open the first terminal, enter the backend directory
cd express-project

# Install backend dependencies (first run)
npm install

# Configure the database (first run)
# Edit config/config.js or .env file

# Initialize the database (first run)
node scripts/init-database.js

# Generate test data (optional)
node scripts/generate-data.js

# Start the backend service
npm start
# The backend service runs at http://localhost:3001
```

### 2. Starting the Frontend Service

```bash
# Open the second terminal, enter the frontend directory
cd vue3-project

# Install frontend dependencies (first run)
npm install

# Configure API address (optional)
# Edit .env file, set VITE_API_BASE_URL

# Start the frontend development server
npm run dev
# The frontend service runs at http://localhost:5173
```

### 3. Accessing the Application

| Service | Address |
|---------|---------|
| Frontend Interface | http://localhost:5173 |
| Backend API | http://localhost:3001 |
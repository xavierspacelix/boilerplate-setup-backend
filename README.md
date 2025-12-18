# RestFul API - Boilerplate

RestFul API for Chat System Groupware App with comprehensive configuration and modern development setup.

## All Configurations As A Sign That This Boilerplate Already Has What

### 🚀 Server & Framework

- **Express.js v5.2.1** - Fast, unopinionated, minimalist web framework for Node.js
- **TypeScript v5.9.3** - Static type checking and enhanced development experience
- **HTTP Server** - Built-in HTTP server with graceful shutdown capabilities

### 🔧 Development Tools

- **ESLint v9.39.2** - Code linting with TypeScript and Prettier integration
- **Prettier v3.7.4** - Code formatting with consistent style (semi-colons, single quotes, trailing commas)
- **Husky v9.1.7** - Git hooks for automated code quality checks
- **Lint-staged v16.2.7** - Linting only staged files before commits
- **TS-Node-Dev v2.0.0** - Development execution for TypeScript with hot reloading

### 📁 Project Configuration

- **TSConfig** - Advanced TypeScript configuration with path aliases:
  - `@config/*` → `src/config/*`
  - `@errors/*` → `src/errors/*`
  - `@i18n/*` → `src/i18n/*`
  - `@utils/*` → `src/utils/*`
  - `@middlewares/*` → `src/middlewares/*`
  - `@types/*` → `src/types/*`
  - `@docs/*` → `src/docs/*`
  - `@routes/*` → `src/routes/*`
  - `@controllers/*` → `src/controllers/*`
  - `@services/*` → `src/services/*`
  - `@dtos/*` → `src/dtos/*`

### 🌍 Internationalization (i18n)

- **i18next v25.7.3** - Internationalization framework
- **i18next-fs-backend v2.6.1** - File system backend for translations
- **i18next-http-middleware v3.9.0** - HTTP middleware integration

### 📊 Logging & Monitoring

- **Pino v10.1.0** - High-performance logging library
- **Pino-Http v11.0.0** - HTTP request/response logging
- **Pino-Pretty v13.1.3** - Formatted console output for development
- **Pino-Roll v4.0.0** - Log rotation functionality

### 💾 Data Validation & Documentation

- **Zod v4.2.1** - Runtime validation with static type inference
- **@asteasolutions/zod-to-openapi v8.2.0** - Generate OpenAPI schemas from Zod validators
- **Swagger-UI-Express v5.0.1** - Interactive API documentation

### 🛡️ Security & Protection

- **CORS** - Cross-Origin Resource Sharing configuration
- **Rate Limiting** - Request rate limiting with configurable window and max requests
- **Cookie Parser** - Cookie parsing middleware for Express

### 🔐 Environment & Configuration

- **Dotenv v17.2.3** - Environment variable management
- **Environment Variables** - Configured with .env.example template:
  - `NODE_ENV` - Application environment
  - `VERSION` - Application version
  - `DATE_TIMEZONE` - Timezone configuration
  - `HOST` - Server host
  - `PORT` - Server port
  - `REFRESH_TTL` - Token refresh time-to-live
  - `REDIS_HOST` - Redis server host
  - `REDIS_PORT` - Redis server port
  - `REDIS_USER` - Redis username
  - `REDIS_PASSWORD` - Redis password
  - `FILE_HOST` - File hosting configuration
  - `MINIO_MODE` - MinIO operation mode
  - `MINIO_INTERNAL_ENDPOINT` - MinIO internal endpoint
  - `MINIO_PUBLIC_ENDPOINT` - MinIO public endpoint
  - `MINIO_ROOT_USER` - MinIO root username
  - `MINIO_ROOT_PASSWORD` - MinIO root password
  - `MINIO_PORT` - MinIO server port
  - `MINIO_BUCKETNAME` - Default MinIO bucket name
  - `COMMON_RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds
  - `COMMON_RATE_LIMIT_MAX_REQUESTS` - Maximum requests per rate limit window
  - `CORS_ORIGIN` - CORS origin configuration
  - `ALLOWED_MIME_TYPES` - Allowed file MIME types for uploads

### 🗄️ External Services

- **Redis v5.10.0** - In-memory data structure store for caching/pub-sub
- **PostgreSQL** - Relational database with Drizzle ORM integration
- **MinIO v8.0.6** - Object storage service for file management
- **JSON Web Token (JWT)** - For authentication and authorization

### 🗃️ Database & ORM

- **Drizzle ORM v0.45.1** - Type-safe SQL toolkit for Node.js and TypeScript
- **Drizzle Kit** - Database migration and schema management tools
- **Database Migrations** - Automated schema migration system

### 📁 File Handling & Upload

- **File Upload** - Configured file upload handling with MIME type validation
- **Multipart Forms** - Support for multipart form data processing

### 🔒 Code Quality & Standards

- **EditorConfig** - Consistent coding styles across editors
- **Git Attributes** - Proper line ending handling
- **Conventional Commits v20.2.0** - Commit message standard via commitlint
- **TypeScript Strict Mode** - Enhanced type safety with strict checks
- **No Unchecked Indexed Access** - Prevents undefined access errors
- **No Implicit Override** - Explicit method overrides
- **Prettier Configuration** - Formatting rules: semi-colon enabled, single quotes, trailing commas es5, printWidth 80

### 🛠️ Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn format` - Format all files with Prettier
- `yarn format:check` - Check formatting without applying changes
- `yarn prepare` - Initialize Husky git hooks

### 🏗️ Folder Structure

```
src/
├── app.ts                    # Express app configuration
├── index.ts                  # Main server entry point
├── config/                   # Environment and configuration
├── docs/                     # API documentation (OpenAPI)
├── dtos/                     # Data Transfer Objects
├── errors/                   # Custom error handling
├── i18n/                     # Internationalization setup
├── locales/                  # Translation files
├── middlewares/              # Express middlewares
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

### 🚨 Error Handling

- **Graceful Shutdown** - Proper cleanup on SIGINT/SIGTERM signals
- **Uncaught Exception Handling** - Catch and handle runtime errors
- **Unhandled Rejection Handling** - Handle promise rejections
- **Custom Error Middleware** - Centralized error handling

### ⚙️ Package Management

- **Yarn v1.22.22** - Fast, reliable package manager
- **Yarn Classic** - Package management with lockfile support

### 🔄 Others

- **UUID v13.0.0** - Unique identifier generation
- **Global Variable Support** - Support for global variables in browser environments
- **ES Module Interop** - ES module interoperability
- **Source Map** - Source map support for debugging compiled TypeScript code

---

## ✅ Boilerplate Features Checklist

This boilerplate comes with the following pre-configured features:

### 🚀 Development Foundation

- [x] **Express.js** - Robust web framework
- [x] **TypeScript** - Static type checking
- [x] **HTTP Server** - Production-ready server with graceful shutdown

### 🛠️ Development Tools & Quality

- [x] **ESLint** - Code linting
- [x] **Prettier** - Code formatting
- [x] **Husky** - Git hooks
- [x] **Lint-staged** - Staged file linting
- [x] **TS-Node-Dev** - Hot reloading in development
- [x] **EditorConfig** - Consistent editor settings
- [x] **Commitlint** - Conventional commit messages
- [x] **TypeScript Strict Mode** - Advanced type safety

### 🌐 Server & Middleware

- [x] **CORS** - Cross-origin resource sharing
- [x] **Rate Limiting** - Request throttling
- [x] **Cookie Parser** - Cookie handling middleware
- [x] **Swagger UI** - API documentation interface

### 🔐 Security & Validation

- [x] **Zod** - Runtime validation
- [x] **Environment Validation** - Zod-based environment checking
- [x] **CORS Configuration** - Origin restrictions
- [x] **JWT** - Token-based authentication

### 🗄️ Database & Storage

- [x] **PostgreSQL** - Relational database
- [x] **Drizzle ORM** - Type-safe queries
- [x] **Drizzle Kit** - Migration tools
- [x] **Redis** - In-memory data store
- [x] **MinIO** - Object storage
- [x] **Database Migrations** - Automated schema system

### 🌍 Localization

- [x] **i18next** - Internationalization
- [x] **Middleware Integration** - HTTP request localization

### 📊 Logging & Monitoring

- [x] **Pino Logger** - High-performance logging
- [x] **HTTP Request Logging** - Request/response tracking
- [x] **Pretty Console Output** - Formatted development logs
- [x] **Log Rotation** - Automatic log file management

### 📁 File Handling

- [x] **File Upload** - Configured file uploads
- [x] **MIME Type Validation** - File type restrictions
- [x] **MinIO Integration** - Cloud storage connectivity
- [x] **MIME Validation** - Content type checking

### 🔧 Configuration

- [x] **Dotenv** - Environment variable management
- [x] **Path Aliases** - Clean import statements
- [x] **TypeScript Configuration** - Advanced compiler options
- [x] **ES Module Support** - ESNext module support

### 🚨 Error Handling

- [x] **Graceful Shutdown** - Proper resource cleanup
- [x] **Exception Handling** - Global error catching
- [x] **Custom Error Middleware** - Centralized error responses

### 📦 Package Management

- [x] **Yarn** - Package management
- [x] **Dependency Management** - Comprehensive package list
- [x] **Lockfile Management** - Consistent dependency versions

### 🔄 Additional Functionality

- [x] **UUID Generation** - Unique identifiers
- [x] **Global Variable Support** - Global variable support
- [x] **ES Module Interop** - ES module compatibility
- [x] **Source Maps** - Effective debugging

This boilerplate provides a solid foundation for building scalable and maintainable REST APIs with comprehensive tooling and configuration for modern Node.js development.

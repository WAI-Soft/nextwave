# Backend Integration Guide

This document explains how the NextWave frontend connects to the Laravel backend.

## Architecture Overview

The frontend uses a **hybrid approach** that tries to connect to the backend API first, and falls back to localStorage if the backend is unavailable. This ensures the app works even when the backend is down.

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the frontend root (already created):

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=NextWave
VITE_APP_URL=http://localhost:3000
```

### 2. Start the Backend

Navigate to the backend directory and start the Laravel server:

```bash
cd nextwave-backend

# Install dependencies (if not already done)
composer install

# Generate application key (if not already done)
php artisan key:generate

# Run migrations
php artisan migrate

# Start the server
php artisan serve
```

The backend will run on `http://localhost:8000`

### 3. Start the Frontend

In the frontend directory:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Services

### Project Service (`src/services/projectService.ts`)

Handles all project-related operations:

- `getPublicProjects()` - Get all published projects (public)
- `getProject(id)` - Get single project by ID (public)
- `getAdminProjects()` - Get all projects including drafts (admin only)
- `createProject(data)` - Create new project (admin only)
- `updateProject(id, data)` - Update project (admin only)
- `deleteProject(id)` - Delete project (admin only)
- `uploadImage(file)` - Upload project image (admin only)

### Auth Service (`src/services/authService.ts`)

Handles authentication:

- `login(credentials)` - Admin login
- `logout()` - Admin logout
- `getCurrentUser()` - Get current authenticated user
- `isAuthenticated()` - Check if user is logged in
- `getToken()` - Get stored auth token

### Contact Service (`src/services/contactService.ts`)

Handles contact form submissions:

- `submitContactForm(data)` - Submit contact form

## API Client (`src/lib/api.ts`)

The API client handles:

- Base URL configuration
- Authentication token management
- Request/response handling
- Error handling
- File uploads
- CORS credentials

## How It Works

### 1. Project Context

The `ProjectContext` (`src/contexts/ProjectContext.tsx`) manages project state:

1. **On Mount**: Tries to fetch projects from backend
   - If authenticated: Fetches all projects (including drafts)
   - If not authenticated: Fetches only published projects
   - If backend fails: Falls back to localStorage

2. **CRUD Operations**: 
   - Tries backend API first
   - Falls back to localStorage if backend fails
   - Automatically syncs with localStorage when in fallback mode

### 2. Authentication Flow

1. User logs in via admin dashboard
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is included in all subsequent API requests
5. On logout, token is removed

### 3. Fallback Mechanism

The app gracefully handles backend unavailability:

```typescript
try {
  // Try backend API
  const projects = await projectService.getPublicProjects();
  setUseBackend(true);
} catch (error) {
  // Fall back to localStorage
  console.warn('Backend unavailable, using localStorage');
  setUseBackend(false);
  // Load from localStorage
}
```

## Backend API Endpoints

### Public Endpoints

- `GET /api/v1/projects` - Get all published projects
- `GET /api/v1/projects/{id}` - Get single project
- `POST /api/v1/contact` - Submit contact form
- `GET /api/v1/health` - Health check

### Admin Endpoints (Require Authentication)

- `POST /api/v1/admin/login` - Admin login
- `POST /api/v1/admin/logout` - Admin logout
- `GET /api/v1/admin/me` - Get current user
- `GET /api/v1/admin/projects` - Get all projects (including drafts)
- `POST /api/v1/admin/projects` - Create project
- `PUT /api/v1/admin/projects/{id}` - Update project
- `DELETE /api/v1/admin/projects/{id}` - Delete project
- `POST /api/v1/admin/upload` - Upload image

## CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

Add your production URL to `nextwave-backend/config/cors.php` when deploying.

## Testing the Integration

### 1. Test Backend Connection

Open browser console and check for:

```
✅ Projects loaded from backend
```

If you see:

```
⚠️ Backend unavailable, using localStorage fallback
```

The app is running in fallback mode.

### 2. Test Admin Features

1. Navigate to `/admin/dashboard`
2. Login with admin credentials
3. Try creating/editing/deleting projects
4. Check browser console for API calls

### 3. Test Public Features

1. Navigate to `/portfolio`
2. Projects should load from backend
3. Check browser Network tab for API calls to `/api/v1/projects`

## Troubleshooting

### Backend Not Connecting

1. **Check backend is running**: Visit `http://localhost:8000/api/v1/health`
2. **Check CORS**: Look for CORS errors in browser console
3. **Check .env**: Ensure `VITE_API_URL` is correct
4. **Restart frontend**: After changing .env, restart `npm run dev`

### Authentication Issues

1. **Check token**: Open browser DevTools > Application > Local Storage
2. **Check token expiration**: Tokens expire after 24 hours (configurable)
3. **Clear storage**: `localStorage.clear()` and login again

### CORS Errors

1. **Check backend CORS config**: `nextwave-backend/config/cors.php`
2. **Add frontend URL**: Add your frontend URL to `allowed_origins`
3. **Restart backend**: `php artisan serve`

## Production Deployment

### Frontend

1. Update `.env`:
```env
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_APP_URL=https://yourdomain.com
```

2. Build:
```bash
npm run build
```

### Backend

1. Update `nextwave-backend/config/cors.php`:
```php
'allowed_origins' => [
    'https://yourdomain.com',
],
```

2. Update `nextwave-backend/.env`:
```env
APP_URL=https://api.yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
```

3. Deploy backend to your server

## Benefits of This Approach

1. **Resilience**: App works even when backend is down
2. **Development**: Can develop frontend without backend running
3. **Testing**: Easy to test with mock data
4. **Migration**: Smooth transition from localStorage to backend
5. **User Experience**: No disruption if backend has issues

## Next Steps

1. Set up database for backend
2. Create admin user account
3. Test all CRUD operations
4. Configure production environment
5. Set up CI/CD pipeline

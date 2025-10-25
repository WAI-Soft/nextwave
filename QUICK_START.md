# Quick Start Guide - Backend Integration

## 🚀 Getting Started

### Step 1: Start the Backend

Open a **new terminal** and run:

```bash
# Windows
start-backend.bat

# Or manually:
cd nextwave-backend
php artisan serve
```

The backend will start on `http://localhost:8000`

### Step 2: Verify Backend is Running

Open your browser and visit:
```
http://localhost:8000/api/v1/health
```

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "version": "1.0.0"
}
```

### Step 3: Frontend is Already Running

The frontend is already running on `http://localhost:3000`

Open the browser console and look for:
- ✅ `Projects loaded from backend` - Backend connected successfully
- ⚠️ `Backend unavailable, using localStorage fallback` - Running in offline mode

## 🎯 What's Been Set Up

### ✅ API Services Created

1. **API Client** (`src/lib/api.ts`)
   - Handles all HTTP requests
   - Manages authentication tokens
   - Handles errors gracefully

2. **Project Service** (`src/services/projectService.ts`)
   - Get/Create/Update/Delete projects
   - Upload images
   - Admin and public endpoints

3. **Auth Service** (`src/services/authService.ts`)
   - Login/Logout
   - Token management
   - User authentication

4. **Contact Service** (`src/services/contactService.ts`)
   - Contact form submissions

### ✅ Context Updated

**ProjectContext** now:
- Tries to fetch from backend first
- Falls back to localStorage if backend unavailable
- Automatically syncs data
- Works offline

### ✅ Environment Configuration

`.env` file created with:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=NextWave
VITE_APP_URL=http://localhost:3000
```

## 🧪 Testing the Integration

### Test 1: Check Backend Connection

1. Open browser console (F12)
2. Refresh the page
3. Look for: `✅ Projects loaded from backend`

### Test 2: Test Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/dashboard`
2. Try adding a new project
3. Check browser Network tab for API calls

### Test 3: Test Portfolio

1. Navigate to: `http://localhost:3000/portfolio`
2. Projects should load from backend
3. Check Network tab for: `GET /api/v1/projects`

## 📊 How It Works

```
┌─────────────┐
│  Frontend   │
│ (React App) │
└──────┬──────┘
       │
       │ Try Backend First
       ▼
┌─────────────┐     Success     ┌──────────────┐
│ API Client  │ ───────────────>│   Backend    │
│             │                 │  (Laravel)   │
│             │<─────────────── │              │
└──────┬──────┘     Data        └──────────────┘
       │
       │ If Backend Fails
       ▼
┌─────────────┐
│ localStorage│
│  (Fallback) │
└─────────────┘
```

## 🔧 Backend Setup (If Not Done)

If the backend database isn't set up yet:

```bash
cd nextwave-backend

# 1. Copy environment file
copy .env.example .env

# 2. Generate app key
php artisan key:generate

# 3. Create database (MySQL)
# Create a database named: nextwave_backend

# 4. Update .env with your database credentials
# DB_DATABASE=nextwave_backend
# DB_USERNAME=root
# DB_PASSWORD=your_password

# 5. Run migrations
php artisan migrate

# 6. (Optional) Seed with sample data
php artisan db:seed

# 7. Start server
php artisan serve
```

## 🎨 Features

### ✅ Hybrid Mode
- Works with or without backend
- Seamless fallback to localStorage
- No user disruption

### ✅ Authentication
- JWT token-based auth
- Secure admin routes
- Auto token refresh

### ✅ Error Handling
- Graceful error messages
- Automatic retry logic
- User-friendly notifications

### ✅ CORS Configured
- Frontend and backend can communicate
- Credentials supported
- Multiple origins allowed

## 📝 API Endpoints Available

### Public
- `GET /api/v1/projects` - Get published projects
- `GET /api/v1/projects/{id}` - Get single project
- `POST /api/v1/contact` - Submit contact form

### Admin (Requires Auth)
- `POST /api/v1/admin/login` - Login
- `POST /api/v1/admin/logout` - Logout
- `GET /api/v1/admin/projects` - Get all projects
- `POST /api/v1/admin/projects` - Create project
- `PUT /api/v1/admin/projects/{id}` - Update project
- `DELETE /api/v1/admin/projects/{id}` - Delete project
- `POST /api/v1/admin/upload` - Upload image

## 🐛 Troubleshooting

### Backend Not Connecting?

1. **Check if backend is running:**
   ```
   http://localhost:8000/api/v1/health
   ```

2. **Check console for errors:**
   - Open browser DevTools (F12)
   - Look for red errors

3. **Check CORS:**
   - Look for CORS errors in console
   - Verify `nextwave-backend/config/cors.php`

4. **Restart both servers:**
   - Stop frontend: Ctrl+C
   - Stop backend: Ctrl+C
   - Start backend: `php artisan serve`
   - Start frontend: `npm run dev`

### Still Having Issues?

Check `BACKEND_INTEGRATION.md` for detailed troubleshooting.

## 🎉 You're All Set!

The frontend and backend are now connected. The app will:
- ✅ Use backend when available
- ✅ Fall back to localStorage when offline
- ✅ Sync data automatically
- ✅ Handle errors gracefully

Visit `http://localhost:3000` to see it in action!

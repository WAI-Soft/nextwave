# Setup Checklist - Backend Integration

## ✅ Completed

- [x] Fixed all TypeScript errors in frontend
- [x] Created API client (`src/lib/api.ts`)
- [x] Created Project Service (`src/services/projectService.ts`)
- [x] Created Auth Service (`src/services/authService.ts`)
- [x] Created Contact Service (`src/services/contactService.ts`)
- [x] Updated ProjectContext with backend integration
- [x] Created environment configuration (`.env`)
- [x] Frontend is running on http://localhost:3000
- [x] Created documentation files
- [x] Created backend startup script

## ⏳ To Do

### 1. Start the Backend

```bash
# Option 1: Use the script (Windows)
start-backend.bat

# Option 2: Manual
cd nextwave-backend
php artisan serve
```

**Expected:** Backend runs on http://localhost:8000

### 2. Verify Backend Health

Open browser and visit:
```
http://localhost:8000/api/v1/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "version": "1.0.0"
}
```

### 3. Check Frontend Connection

1. Open http://localhost:3000
2. Open browser console (F12)
3. Look for one of these messages:
   - ✅ `Projects loaded from backend` (Backend connected)
   - ⚠️ `Backend unavailable, using localStorage fallback` (Offline mode)

### 4. Test Admin Dashboard

1. Navigate to: http://localhost:3000/admin/dashboard
2. Try adding a new project
3. Check if it appears in the portfolio

### 5. Database Setup (If Not Done)

```bash
cd nextwave-backend

# 1. Create database
# Create MySQL database: nextwave_backend

# 2. Update .env file
# DB_DATABASE=nextwave_backend
# DB_USERNAME=root
# DB_PASSWORD=your_password

# 3. Run migrations
php artisan migrate

# 4. (Optional) Create admin user
php artisan db:seed
```

## 🎯 Quick Test

### Test 1: Backend Connection
```bash
# In browser console (F12)
fetch('http://localhost:8000/api/v1/health')
  .then(r => r.json())
  .then(console.log)
```

**Expected:** `{status: "ok", ...}`

### Test 2: Get Projects
```bash
# In browser console
fetch('http://localhost:8000/api/v1/projects')
  .then(r => r.json())
  .then(console.log)
```

**Expected:** `{data: [...]}`

### Test 3: Admin Login (If you have credentials)
```bash
# In browser console
fetch('http://localhost:8000/api/v1/admin/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'password'
  })
})
  .then(r => r.json())
  .then(console.log)
```

**Expected:** `{data: {user: {...}, token: "..."}}`

## 📋 Verification Checklist

- [ ] Backend server is running (http://localhost:8000)
- [ ] Frontend server is running (http://localhost:3000)
- [ ] Health check endpoint works
- [ ] Projects API endpoint works
- [ ] Frontend loads without errors
- [ ] Browser console shows backend connection status
- [ ] Admin dashboard is accessible
- [ ] Can create/edit/delete projects (if backend connected)

## 🐛 Troubleshooting

### Backend Won't Start

**Issue:** `php artisan serve` fails

**Solutions:**
1. Check PHP is installed: `php --version`
2. Check you're in the right directory: `cd nextwave-backend`
3. Check .env file exists: `copy .env.example .env`
4. Generate app key: `php artisan key:generate`

### CORS Errors

**Issue:** Browser shows CORS errors

**Solutions:**
1. Check `nextwave-backend/config/cors.php`
2. Verify `allowed_origins` includes `http://localhost:3000`
3. Restart backend server

### Frontend Can't Connect

**Issue:** Console shows "Backend unavailable"

**Solutions:**
1. Verify backend is running: Visit http://localhost:8000/api/v1/health
2. Check `.env` file has correct `VITE_API_URL`
3. Restart frontend: Stop and run `npm run dev` again

### Database Errors

**Issue:** Backend shows database connection errors

**Solutions:**
1. Create database: `nextwave_backend`
2. Update `.env` with correct credentials
3. Run migrations: `php artisan migrate`

## 📚 Documentation

- **QUICK_START.md** - Quick setup guide
- **BACKEND_INTEGRATION.md** - Detailed integration guide
- **INTEGRATION_SUMMARY.md** - What was implemented
- **SETUP_CHECKLIST.md** - This file

## 🎉 Success Criteria

You'll know everything is working when:

1. ✅ Backend health check returns OK
2. ✅ Frontend console shows "Projects loaded from backend"
3. ✅ Portfolio page displays projects
4. ✅ Admin dashboard can create/edit/delete projects
5. ✅ No errors in browser console
6. ✅ Network tab shows successful API calls

## 🚀 Current Status

- ✅ Frontend: **RUNNING** on http://localhost:3000
- ⏳ Backend: **NEEDS TO BE STARTED**
- ⏳ Database: **MAY NEED SETUP**

## 📞 Next Action

**Start the backend now:**

```bash
# Open a new terminal
cd nextwave-backend
php artisan serve
```

Then refresh your browser and check the console!

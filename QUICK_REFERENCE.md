# Quick Reference - Database Integration

## 🚀 Quick Start (3 Steps)

### 1. Reset Database
```bash
cd nextwave-backend
reset-database.bat
```

### 2. Start Servers
```bash
# Terminal 1
cd nextwave-backend
php artisan serve

# Terminal 2
npm run dev
```

### 3. Login & Test
- Dashboard: `http://localhost:3000/admin/login`
- Email: `admin@nextwave.com`
- Password: `password123`

---

## 📊 Database Status

### Check Project Count
```bash
cd nextwave-backend
php artisan tinker
\App\Models\Project::count();
```

### List All Projects
```php
\App\Models\Project::all(['id', 'title_en', 'service_category']);
```

### Count Published
```php
\App\Models\Project::where('is_published', 1)->count();
```

---

## 🔄 Common Operations

### Add Project
1. Dashboard → Projects → Add Project
2. Fill form → Add Project
3. Refresh portfolio → See new project ✅

### Edit Project
1. Dashboard → Projects → Edit
2. Modify fields → Update Project
3. Refresh portfolio → See changes ✅

### Delete Project
1. Dashboard → Projects → Delete
2. Confirm → Deleted
3. Refresh portfolio → Project gone ✅

### Hide/Show Project
1. Dashboard → Edit Project
2. Status: Draft (hide) or Published (show)
3. Update Project
4. Refresh portfolio ✅

---

## 🗂️ Database Structure

### Projects Table
- `title_en` / `title_ar` - Project name
- `description_en` / `description_ar` - Description
- `service_category` - Type (branding, websites, advertising, logos, photography)
- `client` - Client name
- `year` - Project year
- `image_path` - Cover image
- `is_published` - Visibility (1=visible, 0=hidden)

### Valid Categories
- `branding` - Brand identity, guidelines
- `websites` - Web design, development
- `advertising` - Digital ads, campaigns
- `logos` - Logo design, brand marks
- `photography` - Product, event photos

---

## 🔗 API Endpoints

### Public (No Auth)
- `GET /api/v1/projects` - All published projects
- `GET /api/v1/projects/{id}` - Single project

### Admin (Auth Required)
- `GET /api/v1/admin/projects` - All projects
- `POST /api/v1/admin/projects` - Create project
- `PUT /api/v1/admin/projects/{id}` - Update project
- `DELETE /api/v1/admin/projects/{id}` - Delete project

---

## 🐛 Troubleshooting

### No projects on portfolio?
```bash
# Check backend running
php artisan serve

# Check database
php artisan tinker
\App\Models\Project::count();

# Check .env
VITE_API_URL=http://localhost:8000/api/v1
```

### Can't login?
```bash
# Reset database
php artisan migrate:fresh --seed

# Clear browser localStorage
# Try again with: admin@nextwave.com / password123
```

### Changes not saving?
```bash
# Check database file exists
dir database\database.sqlite

# Check backend logs
type storage\logs\laravel.log

# Check browser console for errors
```

---

## 📁 Important Files

### Backend
- `database/seeders/ProjectSeeder.php` - Real project data
- `app/Http/Controllers/ProjectController.php` - API logic
- `database/database.sqlite` - Database file
- `reset-database.bat` - Quick reset script

### Frontend
- `src/contexts/ProjectContext.tsx` - State management
- `src/services/projectService.ts` - API calls
- `src/pages/admin/Dashboard.tsx` - Admin interface
- `src/pages/Portfolio.tsx` - Public portfolio

### Documentation
- `INTEGRATION_COMPLETE.md` - Full overview
- `SETUP_DATABASE.md` - Setup instructions
- `TEST_DATABASE_INTEGRATION.md` - Testing guide
- `DATABASE_READY.md` - Integration details
- `QUICK_REFERENCE.md` - This file

---

## ✅ Verification Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Database has 10 projects
- [ ] Can view portfolio page
- [ ] Can login to dashboard
- [ ] Can add new project
- [ ] New project appears on portfolio
- [ ] Can edit project
- [ ] Changes visible on portfolio
- [ ] Can delete project
- [ ] Project removed from portfolio
- [ ] No console errors

---

## 🎯 What You Have Now

✅ **Real Database** - SQLite with 10 real projects
✅ **Admin Dashboard** - Full CRUD operations
✅ **Portfolio Page** - Displays database projects
✅ **Live Updates** - Changes reflect immediately
✅ **Data Persistence** - Survives restarts
✅ **Authentication** - Secure admin access
✅ **Validation** - Proper error handling
✅ **Bilingual** - English & Arabic support

---

## 📞 Need More Help?

1. Read `INTEGRATION_COMPLETE.md` for full details
2. Follow `TEST_DATABASE_INTEGRATION.md` for testing
3. Check browser console for errors
4. Review backend logs: `storage/logs/laravel.log`
5. Verify database: `php artisan tinker`

---

**You're ready to go! 🚀**

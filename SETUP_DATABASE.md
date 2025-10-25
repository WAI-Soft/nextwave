# Database Setup Guide

This guide will help you set up the database with real project data.

## Quick Setup

### 1. Reset Database with Real Data

Run the reset script from the `nextwave-backend` directory:

```bash
cd nextwave-backend
reset-database.bat
```

This will:
- Drop all existing tables
- Run migrations to create fresh tables
- Seed the database with:
  - 1 Admin user
  - 10 Real projects with proper data

### 2. Admin Credentials

After seeding, you can login with:
- **Email**: `admin@nextwave.com`
- **Password**: `password123`

### 3. Verify Database

Check that the database has data:

```bash
php artisan tinker
```

Then run:
```php
\App\Models\Project::count();  // Should return 10
\App\Models\Admin::count();    // Should return 1
```

## Real Projects Included

The seeder creates 10 real projects:

1. **Luxury Brand Identity** (Branding) - Luxe Living Co. - 2024
2. **E-commerce Platform** (Websites) - Fashion Forward - 2024
3. **Digital Advertising Campaign** (Advertising) - TechStart Inc. - 2024
4. **Minimalist Logo Design** (Logos) - StartUp Ventures - 2024
5. **Product Photography** (Photography) - Artisan Goods - 2024
6. **Mobile App Development** (Websites) - FinTech Solutions - 2023
7. **Corporate Branding Package** (Branding) - Global Enterprises - 2023
8. **Social Media Campaign** (Advertising) - Lifestyle Brand Co. - 2023
9. **Event Photography Coverage** (Photography) - Corporate Events Ltd. - 2023
10. **Restaurant Website Redesign** (Websites) - Gourmet Bistro - 2023

All projects are:
- Published and visible on the portfolio
- Have both English and Arabic translations
- Properly categorized (branding, websites, advertising, logos, photography)
- Include client names and years

## How Dashboard Changes Affect Portfolio

### Adding a Project
1. Login to admin dashboard at `/admin/login`
2. Click "Add Project" button
3. Fill in project details
4. Click "Add Project"
5. **Result**: Project immediately appears on portfolio page

### Editing a Project
1. Go to "Projects" tab in dashboard
2. Click "Edit" button on any project
3. Modify project details
4. Click "Update Project"
5. **Result**: Changes immediately reflect on portfolio page

### Deleting a Project
1. Go to "Projects" tab in dashboard
2. Click "Delete" button on any project
3. Confirm deletion
4. **Result**: Project immediately removed from portfolio page

### Publishing/Unpublishing
- Set status to "Published" → Project visible on portfolio
- Set status to "Draft" → Project hidden from portfolio (only visible in admin)

## Database Structure

### Projects Table
- `id` - Unique identifier
- `title_en` - English title
- `title_ar` - Arabic title
- `description_en` - English description
- `description_ar` - Arabic description
- `service_category` - Project type (branding, websites, advertising, logos, photography)
- `client` - Client name
- `year` - Project year
- `image_path` - Cover image URL
- `video_path` - Optional video URL
- `is_published` - Visibility status (1 = published, 0 = draft)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Admins Table
- `id` - Unique identifier
- `name` - Admin name
- `email` - Login email
- `password` - Hashed password
- `email_verified_at` - Email verification timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Troubleshooting

### Database file not found
If you get "database not found" error:
```bash
cd nextwave-backend/database
type nul > database.sqlite
cd ..
php artisan migrate:fresh --seed
```

### Seeder errors
If seeding fails:
1. Check that `ProjectSeeder.php` exists in `database/seeders/`
2. Verify `DatabaseSeeder.php` calls `ProjectSeeder::class`
3. Run: `composer dump-autoload`
4. Try again: `php artisan db:seed`

### Projects not showing on portfolio
1. Check backend is running: `php artisan serve`
2. Verify API URL in `.env`: `VITE_API_URL=http://localhost:8000/api/v1`
3. Check browser console for API errors
4. Verify projects are published: `is_published = 1`

## Manual Database Operations

### View all projects
```bash
php artisan tinker
\App\Models\Project::all();
```

### Create a project manually
```bash
php artisan tinker
```
```php
\App\Models\Project::create([
    'title_en' => 'My Project',
    'title_ar' => 'مشروعي',
    'description_en' => 'Project description',
    'description_ar' => 'وصف المشروع',
    'service_category' => 'branding',
    'client' => 'Client Name',
    'year' => 2024,
    'image_path' => '/path/to/image.png',
    'is_published' => true
]);
```

### Delete all projects
```bash
php artisan tinker
\App\Models\Project::truncate();
```

### Re-seed without dropping tables
```bash
php artisan db:seed --class=ProjectSeeder
```

## Next Steps

1. Start the backend server:
   ```bash
   cd nextwave-backend
   php artisan serve
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Login to admin dashboard:
   - Go to `http://localhost:3000/admin/login`
   - Use credentials above

4. Test the integration:
   - Add a new project in dashboard
   - Check it appears on portfolio page
   - Edit the project
   - Verify changes on portfolio
   - Delete the project
   - Confirm it's removed from portfolio

Your database is now set up with real data and ready to use!

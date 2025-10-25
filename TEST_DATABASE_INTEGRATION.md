# Testing Database Integration

This guide will help you verify that dashboard changes are properly saved to the database and reflected on the portfolio page.

## Prerequisites

1. Backend server running: `cd nextwave-backend && php artisan serve`
2. Frontend server running: `npm run dev`
3. Database seeded with real data (see SETUP_DATABASE.md)

## Test 1: Verify Real Data is Loaded

### Step 1: Check Database
```bash
cd nextwave-backend
php artisan tinker
```

Run these commands:
```php
// Should return 10
\App\Models\Project::count();

// Should show all projects
\App\Models\Project::all(['id', 'title_en', 'service_category', 'is_published']);

// Should return 1
\App\Models\Admin::count();
```

### Step 2: Check Portfolio Page
1. Open browser: `http://localhost:3000/portfolio`
2. You should see 10 projects displayed
3. Try filtering by category (All, Branding, Websites, etc.)
4. Click on a project to see details modal

**Expected Result**: All 10 projects from database are visible

## Test 2: Add New Project from Dashboard

### Step 1: Login to Dashboard
1. Go to: `http://localhost:3000/admin/login`
2. Login with:
   - Email: `admin@nextwave.com`
   - Password: `password123`

### Step 2: Add Project
1. Click "Projects" tab in sidebar
2. Click "Add Project" button
3. Fill in the form:
   - **Project Name**: "Test Project 2024"
   - **Client Name**: "Test Client Inc."
   - **Description**: "This is a test project to verify database integration"
   - **Project Purpose**: "Testing the integration between dashboard and portfolio"
   - **Project Type**: Select "Branding"
   - **Year**: 2024
   - **Cover Image**: Use any image URL or upload
   - **Tags**: Add "Test", "Integration", "Database"
   - **Status**: Published
4. Click "Add Project"

### Step 3: Verify in Database
```bash
php artisan tinker
```

```php
// Should return 11 now
\App\Models\Project::count();

// Find the new project
\App\Models\Project::where('title_en', 'Test Project 2024')->first();
```

### Step 4: Verify on Portfolio
1. Open new tab: `http://localhost:3000/portfolio`
2. Look for "Test Project 2024"
3. Filter by "Branding" category
4. Click on the project to see details

**Expected Result**: 
- Project count increased to 11
- New project visible in database
- New project appears on portfolio page
- Project details match what you entered

## Test 3: Edit Existing Project

### Step 1: Edit from Dashboard
1. In dashboard, go to "Projects" tab
2. Find "Test Project 2024"
3. Click "Edit" button
4. Change:
   - **Project Name**: "Updated Test Project 2024"
   - **Description**: "This project has been updated"
   - **Client Name**: "Updated Client Corp."
5. Click "Update Project"

### Step 2: Verify in Database
```bash
php artisan tinker
```

```php
// Find the updated project
$project = \App\Models\Project::where('title_en', 'Updated Test Project 2024')->first();
echo $project->description_en;
echo $project->client;
```

### Step 3: Verify on Portfolio
1. Refresh portfolio page: `http://localhost:3000/portfolio`
2. Find "Updated Test Project 2024"
3. Click to view details
4. Verify all changes are reflected

**Expected Result**:
- Database shows updated values
- Portfolio shows updated project name
- Project details modal shows updated information

## Test 4: Change Project Status (Publish/Unpublish)

### Step 1: Unpublish Project
1. In dashboard, edit "Updated Test Project 2024"
2. Change **Status** to "Draft"
3. Click "Update Project"

### Step 2: Verify in Database
```bash
php artisan tinker
```

```php
$project = \App\Models\Project::where('title_en', 'Updated Test Project 2024')->first();
echo $project->is_published; // Should be 0
```

### Step 3: Verify on Portfolio
1. Refresh portfolio page
2. Count projects - should be 10 (one less)
3. "Updated Test Project 2024" should NOT be visible

### Step 4: Re-publish Project
1. In dashboard, edit the project again
2. Change **Status** to "Published"
3. Click "Update Project"
4. Refresh portfolio page
5. Project should be visible again (11 total)

**Expected Result**:
- Draft projects hidden from portfolio
- Published projects visible on portfolio
- Database `is_published` field updates correctly

## Test 5: Delete Project

### Step 1: Delete from Dashboard
1. In dashboard, go to "Projects" tab
2. Find "Updated Test Project 2024"
3. Click "Delete" button
4. Confirm deletion

### Step 2: Verify in Database
```bash
php artisan tinker
```

```php
// Should return 10 (back to original)
\App\Models\Project::count();

// Should return null
\App\Models\Project::where('title_en', 'Updated Test Project 2024')->first();
```

### Step 3: Verify on Portfolio
1. Refresh portfolio page
2. Count projects - should be 10
3. "Updated Test Project 2024" should NOT exist

**Expected Result**:
- Project removed from database
- Project removed from portfolio
- No errors or broken links

## Test 6: Category Filtering

### Step 1: Add Projects in Different Categories
Add 3 projects, one in each category:
1. "Branding Test" - Category: Branding
2. "Website Test" - Category: Websites
3. "Photo Test" - Category: Photography

### Step 2: Test Filters on Portfolio
1. Go to portfolio page
2. Click "All" - should show 13 projects
3. Click "Branding" - should show only branding projects
4. Click "Websites" - should show only website projects
5. Click "Photography" - should show only photography projects

### Step 3: Verify in Database
```bash
php artisan tinker
```

```php
// Count by category
\App\Models\Project::where('service_category', 'branding')->count();
\App\Models\Project::where('service_category', 'websites')->count();
\App\Models\Project::where('service_category', 'photography')->count();
```

**Expected Result**:
- Filters work correctly
- Database counts match portfolio counts
- Categories are properly stored

## Test 7: Real-time Updates

### Step 1: Open Both Pages
1. Tab 1: Dashboard at `http://localhost:3000/admin`
2. Tab 2: Portfolio at `http://localhost:3000/portfolio`

### Step 2: Make Changes
1. In dashboard, add a new project
2. Immediately switch to portfolio tab
3. Refresh the page
4. New project should appear

### Step 3: Edit and Delete
1. Edit a project in dashboard
2. Refresh portfolio - changes visible
3. Delete a project in dashboard
4. Refresh portfolio - project gone

**Expected Result**:
- Changes persist across page refreshes
- Database is the single source of truth
- No data loss or inconsistencies

## Common Issues and Solutions

### Issue: Projects not showing on portfolio
**Solution**:
1. Check backend is running: `php artisan serve`
2. Check `.env` has correct API URL: `VITE_API_URL=http://localhost:8000/api/v1`
3. Open browser console, look for API errors
4. Verify projects are published in database

### Issue: "Failed to create project" error
**Solution**:
1. Check validation errors in browser console
2. Ensure all required fields are filled
3. Verify service_category is valid: branding, websites, advertising, logos, photography
4. Check backend logs: `nextwave-backend/storage/logs/laravel.log`

### Issue: Changes not saving to database
**Solution**:
1. Check database file exists: `nextwave-backend/database/database.sqlite`
2. Verify database permissions (should be writable)
3. Check for migration errors: `php artisan migrate:status`
4. Review API responses in browser Network tab

### Issue: Authentication errors
**Solution**:
1. Clear browser localStorage
2. Login again
3. Check token is being sent in API requests (Network tab)
4. Verify Sanctum configuration in backend

## Success Criteria

✅ All 10 seeded projects visible on portfolio
✅ Can add new project from dashboard → appears on portfolio
✅ Can edit project from dashboard → changes reflect on portfolio
✅ Can delete project from dashboard → removed from portfolio
✅ Draft projects hidden from portfolio
✅ Published projects visible on portfolio
✅ Category filters work correctly
✅ Database persists all changes
✅ No console errors
✅ API requests successful (200 status codes)

## Database Verification Commands

Quick commands to verify database state:

```bash
# Count all projects
php artisan tinker --execute="\App\Models\Project::count()"

# List all projects
php artisan tinker --execute="\App\Models\Project::all(['id', 'title_en', 'service_category', 'is_published'])"

# Count published projects
php artisan tinker --execute="\App\Models\Project::where('is_published', 1)->count()"

# Count by category
php artisan tinker --execute="\App\Models\Project::where('service_category', 'branding')->count()"
```

## Next Steps

After all tests pass:
1. ✅ Database integration is working correctly
2. ✅ Dashboard changes are saved to database
3. ✅ Portfolio reflects database state
4. ✅ Ready for production use

You can now confidently use the dashboard to manage your portfolio!

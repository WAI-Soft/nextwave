# Testing Project CRUD Operations

## Prerequisites
✅ Backend server running on http://localhost:8000
✅ Frontend server running on http://localhost:3002

## Test Steps

### Test 1: Add a New Project

1. **Open Admin Dashboard**
   - Navigate to: http://localhost:3002/admin/dashboard
   - Click on "Projects" tab in the sidebar

2. **Add Project**
   - Click "Add Project" button
   - Fill in the form:
     - Project Name: "Test Project 2024"
     - Client Name: "Test Client"
     - Description: "This is a test project to verify CRUD operations"
     - Project Purpose: "Testing the new refresh mechanism"
     - Project Type: Select "branding"
     - Year: 2024
     - Upload or enter a cover image URL
     - Add tags: "Test", "CRUD", "Verification"
     - Status: "Published"
   - Click "Add Project"

3. **Verify in Dashboard**
   - ✅ Success toast should appear: "Project added successfully! Portfolio will update automatically."
   - ✅ New project should appear in the projects table immediately
   - ✅ No page refresh needed

4. **Verify in Portfolio**
   - Open new tab: http://localhost:3002/portfolio
   - ✅ New project should be visible in the portfolio grid
   - ✅ Click on the project to see details in modal
   - ✅ All information should match what you entered

### Test 2: Edit an Existing Project

1. **In Admin Dashboard**
   - Go to Projects tab
   - Find the project you just created
   - Click the "Edit" button (pencil icon)

2. **Update Project**
   - Change Project Name to: "Updated Test Project 2024"
   - Change Description to: "This project has been updated"
   - Add a new tag: "Updated"
   - Click "Update Project"

3. **Verify in Dashboard**
   - ✅ Success toast: "Project updated successfully! Portfolio will update automatically."
   - ✅ Updated information should show immediately in the table
   - ✅ No page refresh needed

4. **Verify in Portfolio**
   - Refresh the portfolio page (or open in new tab)
   - ✅ Project should show updated name and description
   - ✅ New tag should be visible

### Test 3: Change Project Status (Published → Draft)

1. **In Admin Dashboard**
   - Edit the test project
   - Change Status from "Published" to "Draft"
   - Click "Update Project"

2. **Verify in Dashboard**
   - ✅ Project should still be visible in dashboard
   - ✅ Status badge should show "Draft"

3. **Verify in Portfolio**
   - Refresh the portfolio page
   - ✅ Project should NOT be visible (drafts are hidden from public)

### Test 4: Change Project Status (Draft → Published)

1. **In Admin Dashboard**
   - Edit the test project
   - Change Status from "Draft" to "Published"
   - Click "Update Project"

2. **Verify in Portfolio**
   - Refresh the portfolio page
   - ✅ Project should be visible again

### Test 5: Delete a Project

1. **In Admin Dashboard**
   - Find the test project
   - Click the "Delete" button (trash icon)
   - Confirm deletion in the dialog

2. **Verify in Dashboard**
   - ✅ Success toast: "Project deleted successfully! Portfolio will update automatically."
   - ✅ Project should disappear from the table immediately
   - ✅ No page refresh needed

3. **Verify in Portfolio**
   - Refresh the portfolio page
   - ✅ Project should be completely removed

### Test 6: Persistence After Refresh

1. **Add a New Project**
   - Add another test project with status "Published"

2. **Refresh Dashboard**
   - Press F5 or Ctrl+R
   - ✅ Project should still be there

3. **Refresh Portfolio**
   - Press F5 or Ctrl+R
   - ✅ Project should still be visible

4. **Close and Reopen Browser**
   - Close all browser tabs
   - Open new browser window
   - Navigate to portfolio
   - ✅ Project should still be there

### Test 7: Multiple Projects

1. **Add 3 Projects**
   - Add 3 different projects with different types:
     - Project 1: Type "branding", Status "Published"
     - Project 2: Type "websites", Status "Published"
     - Project 3: Type "advertising", Status "Draft"

2. **Verify Dashboard**
   - ✅ All 3 projects should be visible in dashboard

3. **Verify Portfolio**
   - ✅ Only 2 published projects should be visible
   - ✅ Draft project should be hidden

4. **Test Filtering**
   - Click "Branding" filter
   - ✅ Only branding project should show
   - Click "Websites" filter
   - ✅ Only websites project should show
   - Click "All" filter
   - ✅ Both published projects should show

## Expected Behavior Summary

### Dashboard (Admin)
- Shows ALL projects (published + drafts)
- CRUD operations work immediately
- No page refresh needed
- Changes persist after browser refresh

### Portfolio (Public)
- Shows ONLY published projects
- Updates automatically when projects are added/edited/deleted
- Filters work correctly by project type
- Changes persist after browser refresh

## Troubleshooting

### If changes don't appear:

1. **Check Browser Console**
   - Press F12
   - Look for errors in Console tab
   - Check Network tab for failed API calls

2. **Check Backend Logs**
   - Look at the terminal running the backend
   - Check for any error messages

3. **Verify Backend is Running**
   - Open: http://localhost:8000/api/v1/health
   - Should return: `{"status":"ok",...}`

4. **Check Database**
   - Projects should be saved in the database
   - Not just in localStorage

### Common Issues

**Issue:** Projects disappear after refresh
- **Cause:** Backend not running or database not connected
- **Solution:** Start backend server and check database connection

**Issue:** Changes don't appear in portfolio
- **Cause:** Project status is "Draft"
- **Solution:** Change status to "Published" in dashboard

**Issue:** Old data showing
- **Cause:** Browser cache
- **Solution:** Hard refresh (Ctrl+Shift+R) or clear cache

## Success Criteria

✅ All CRUD operations work without page refresh
✅ Changes persist after browser refresh
✅ Dashboard shows all projects
✅ Portfolio shows only published projects
✅ Filters work correctly
✅ No console errors
✅ Data is saved to database (not just localStorage)

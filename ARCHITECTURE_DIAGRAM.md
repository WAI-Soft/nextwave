# Architecture Diagram - Database Integration

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────┐         ┌──────────────────────┐         │
│  │   Portfolio Page     │         │  Admin Dashboard     │         │
│  │  (Public View)       │         │  (Protected)         │         │
│  │                      │         │                      │         │
│  │  - View Projects     │         │  - Add Projects      │         │
│  │  - Filter Categories │         │  - Edit Projects     │         │
│  │  - Project Details   │         │  - Delete Projects   │         │
│  │                      │         │  - Publish/Unpublish │         │
│  └──────────────────────┘         └──────────────────────┘         │
│           │                                   │                      │
└───────────┼───────────────────────────────────┼──────────────────────┘
            │                                   │
            │                                   │
            ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER (React)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              ProjectContext (State Management)                │  │
│  │  - Manages project state                                      │  │
│  │  - Fetches from backend API                                   │  │
│  │  - Falls back to localStorage                                 │  │
│  │  - Provides CRUD methods                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           projectService.ts (API Client)                      │  │
│  │  - getPublicProjects()                                        │  │
│  │  - getAdminProjects()                                         │  │
│  │  - createProject(data)                                        │  │
│  │  - updateProject(id, data)                                    │  │
│  │  - deleteProject(id)                                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               │ HTTP Requests
                               │ (JSON)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER (Laravel)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Routes                                 │  │
│  │                                                               │  │
│  │  Public Routes:                                               │  │
│  │  GET  /api/v1/projects           → index()                   │  │
│  │  GET  /api/v1/projects/{id}      → show()                    │  │
│  │                                                               │  │
│  │  Admin Routes (Protected):                                   │  │
│  │  GET    /api/v1/admin/projects   → adminIndex()              │  │
│  │  POST   /api/v1/admin/projects   → store()                   │  │
│  │  PUT    /api/v1/admin/projects/{id} → update()               │  │
│  │  DELETE /api/v1/admin/projects/{id} → destroy()              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │         ProjectController (Business Logic)                    │  │
│  │  - Validates request data                                     │  │
│  │  - Authenticates admin users                                  │  │
│  │  - Processes CRUD operations                                  │  │
│  │  - Returns JSON responses                                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              Project Model (Eloquent ORM)                     │  │
│  │  - Represents projects table                                  │  │
│  │  - Handles database queries                                   │  │
│  │  - Defines relationships                                      │  │
│  │  - Scopes (published, byCategory)                             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               │ SQL Queries
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (SQLite)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    database.sqlite                            │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────┐    │  │
│  │  │              projects table                          │    │  │
│  │  │  - id (PRIMARY KEY)                                  │    │  │
│  │  │  - title_en, title_ar                                │    │  │
│  │  │  - description_en, description_ar                    │    │  │
│  │  │  - service_category                                  │    │  │
│  │  │  - client                                            │    │  │
│  │  │  - year                                              │    │  │
│  │  │  - image_path, video_path                            │    │  │
│  │  │  - is_published                                      │    │  │
│  │  │  - created_at, updated_at                            │    │  │
│  │  └─────────────────────────────────────────────────────┘    │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────┐    │  │
│  │  │              admins table                            │    │  │
│  │  │  - id (PRIMARY KEY)                                  │    │  │
│  │  │  - name                                              │    │  │
│  │  │  - email (UNIQUE)                                    │    │  │
│  │  │  - password (HASHED)                                 │    │  │
│  │  │  - email_verified_at                                 │    │  │
│  │  │  - created_at, updated_at                            │    │  │
│  │  └─────────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Example 1: Viewing Portfolio (Public)

```
User visits /portfolio
        ↓
Portfolio.tsx loads
        ↓
useProjects() hook called
        ↓
ProjectContext fetches data
        ↓
projectService.getPublicProjects()
        ↓
GET /api/v1/projects
        ↓
ProjectController::index()
        ↓
Project::published()->get()
        ↓
SELECT * FROM projects WHERE is_published = 1
        ↓
Returns JSON array of projects
        ↓
Frontend maps to Project interface
        ↓
Portfolio displays projects
```

### Example 2: Adding Project (Admin)

```
Admin fills form in Dashboard
        ↓
Clicks "Add Project"
        ↓
AddProject.tsx calls addProject()
        ↓
ProjectContext.addProject(data)
        ↓
projectService.createProject(data)
        ↓
POST /api/v1/admin/projects
        ↓
Middleware checks authentication
        ↓
ProjectController::store()
        ↓
Validates request data
        ↓
Project::create($data)
        ↓
INSERT INTO projects VALUES (...)
        ↓
Returns created project as JSON
        ↓
Frontend updates ProjectContext
        ↓
Dashboard shows success message
        ↓
Portfolio automatically shows new project
```

### Example 3: Editing Project (Admin)

```
Admin clicks "Edit" on project
        ↓
EditProject.tsx loads with project data
        ↓
Admin modifies fields
        ↓
Clicks "Update Project"
        ↓
ProjectContext.updateProject(id, data)
        ↓
projectService.updateProject(id, data)
        ↓
PUT /api/v1/admin/projects/{id}
        ↓
Middleware checks authentication
        ↓
ProjectController::update()
        ↓
Validates request data
        ↓
$project->update($data)
        ↓
UPDATE projects SET ... WHERE id = {id}
        ↓
Returns updated project as JSON
        ↓
Frontend updates ProjectContext
        ↓
Dashboard shows success message
        ↓
Portfolio reflects changes
```

### Example 4: Deleting Project (Admin)

```
Admin clicks "Delete" on project
        ↓
Confirmation dialog appears
        ↓
Admin confirms deletion
        ↓
ProjectContext.deleteProject(id)
        ↓
projectService.deleteProject(id)
        ↓
DELETE /api/v1/admin/projects/{id}
        ↓
Middleware checks authentication
        ↓
ProjectController::destroy()
        ↓
$project->delete()
        ↓
DELETE FROM projects WHERE id = {id}
        ↓
Returns success message
        ↓
Frontend removes from ProjectContext
        ↓
Dashboard shows success message
        ↓
Portfolio removes project
```

## Authentication Flow

```
Admin visits /admin/login
        ↓
Enters credentials
        ↓
POST /api/v1/admin/login
        ↓
AdminController::login()
        ↓
Validates credentials
        ↓
SELECT * FROM admins WHERE email = ?
        ↓
Checks password hash
        ↓
Creates Sanctum token
        ↓
Returns token + admin data
        ↓
Frontend stores token in localStorage
        ↓
All subsequent requests include:
Authorization: Bearer {token}
        ↓
Middleware validates token
        ↓
Allows/denies access
```

## Technology Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Laravel 11** - PHP framework
- **Sanctum** - API authentication
- **Eloquent ORM** - Database abstraction
- **SQLite** - Database engine

### Communication
- **REST API** - HTTP/JSON
- **CORS** - Cross-origin requests
- **Bearer Token** - Authentication

## File Structure

```
nextwave/
├── src/                          # Frontend
│   ├── contexts/
│   │   └── ProjectContext.tsx    # State management
│   ├── services/
│   │   └── projectService.ts     # API client
│   ├── pages/
│   │   ├── Portfolio.tsx         # Public view
│   │   └── admin/
│   │       ├── Dashboard.tsx     # Admin home
│   │       ├── AddProject.tsx    # Create form
│   │       └── EditProject.tsx   # Update form
│   └── lib/
│       └── api.ts                # HTTP client
│
└── nextwave-backend/             # Backend
    ├── app/
    │   ├── Http/
    │   │   └── Controllers/
    │   │       └── ProjectController.php  # API logic
    │   └── Models/
    │       └── Project.php       # Database model
    ├── database/
    │   ├── migrations/
    │   │   └── *_create_projects_table.php
    │   ├── seeders/
    │   │   ├── DatabaseSeeder.php
    │   │   └── ProjectSeeder.php # Real data
    │   └── database.sqlite       # Database file
    └── routes/
        └── api.php               # API routes
```

## Key Features

### 1. Real-Time Sync
- Dashboard changes → Database → Portfolio updates
- Single source of truth (database)
- No manual file editing needed

### 2. Data Persistence
- All data stored in SQLite
- Survives server restarts
- No data loss

### 3. Authentication
- Token-based (Sanctum)
- Admin-only CRUD operations
- Public read access

### 4. Validation
- Backend validates all inputs
- Type checking on frontend
- Error messages displayed

### 5. Bilingual Support
- English and Arabic fields
- Language switching
- RTL support

### 6. Category System
- 5 categories: branding, websites, advertising, logos, photography
- Filtering on portfolio
- Validation on backend

### 7. Status Control
- Published = visible on portfolio
- Draft = hidden from public
- Admin sees all

## Performance Considerations

### Database
- Indexes on frequently queried columns
- Efficient queries with Eloquent
- SQLite for simplicity (can upgrade to MySQL/PostgreSQL)

### API
- RESTful design
- JSON responses
- Proper HTTP status codes

### Frontend
- Context API for state
- Lazy loading components
- Optimized re-renders

## Security

### Backend
- CSRF protection
- SQL injection prevention (Eloquent)
- Password hashing (bcrypt)
- Token authentication
- Input validation

### Frontend
- XSS prevention (React escaping)
- Token storage (localStorage)
- Protected routes
- Input sanitization

## Scalability

### Current Setup
- SQLite database (good for < 100k records)
- Single server deployment
- File-based sessions

### Future Upgrades
- Switch to MySQL/PostgreSQL for larger datasets
- Add Redis for caching
- Implement CDN for images
- Add search functionality
- Implement pagination

## Monitoring

### Logs
- Backend: `storage/logs/laravel.log`
- Frontend: Browser console
- API: Network tab

### Database
- `php artisan tinker` for queries
- `php artisan db:show` for structure
- `php artisan db:table projects` for data

## Backup Strategy

### Database Backup
```bash
# Copy database file
copy database\database.sqlite database\backup.sqlite

# Or use Laravel backup
php artisan backup:run
```

### Restore
```bash
# Restore from backup
copy database\backup.sqlite database\database.sqlite
```

---

This architecture provides a solid foundation for a production-ready portfolio management system with full database integration.

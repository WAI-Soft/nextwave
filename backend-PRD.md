# Product Requirements Document (PRD)
## NextWave Backend - Laravel API & Database System

---

## 🎯 **Executive Summary**

This document outlines the requirements for the NextWave backend system, built with the Laravel framework. The backend will serve as a secure and high-performance RESTful API, providing the data layer for both the public-facing website and the admin dashboard. It will leverage Laravel's powerful features, including Eloquent ORM for database interaction, Laravel Sanctum for authentication, and the unified Storage API for media management, ensuring a scalable and maintainable system.

---

## 🏢 **Product Overview**

### **Vision Statement**
To create a state-of-the-art, secure, and scalable backend using Laravel that seamlessly powers the NextWave digital presence, enabling real-time content management and flawless data delivery.

### **Mission Statement**
Develop a clean, well-structured Laravel API that handles all CRUD operations, manages administrator authentication with Sanctum, and efficiently handles media assets using Laravel's Storage facade, creating a reliable foundation for the agency's digital platform.

### **Product Goals**
1.  **Developer Efficiency:** Utilize Laravel's expressive syntax and built-in tools to accelerate development.
2.  **Security:** Implement industry-standard security practices using Laravel Sanctum for token-based API authentication.
3.  **Data Integrity:** Leverage Eloquent ORM and database migrations to ensure a consistent and reliable data structure.
4.  **Scalability:** Build a modular API that can easily accommodate future features like a blog or client portal.
5.  **Maintainability:** Follow Laravel conventions and best practices for clean, readable, and maintainable code.

---

## ⭐ **Core Features & Requirements**

### **1. Authentication & Authorization with Laravel Sanctum**
- **Purpose:** Secure access to all admin-specific API endpoints.
- **Requirements:**
    - **Installation:** Install and configure Laravel Sanctum for API authentication.
    - **Admin Model:** Create an `Admin` model that uses the `HasApiTokens` trait.
    - **Login Endpoint (`POST /api/admin/login`):**
        - Validate incoming email and password.
        - On success, generate a Sanctum token (`$admin->createToken('admin-token')`).
        - Return the plain-text token to the frontend, which will store it and send it in the `Authorization` header (`Bearer TOKEN`) for subsequent requests.
    - **Logout Endpoint (`POST /api/admin/logout`):** Revoke the current user's access token.
    - **Protected Routes:** Apply the `auth:sanctum` middleware to all admin routes (`/api/admin/*`) to ensure they are only accessible with a valid token.

### **2. Content Management API (Projects)**
- **Purpose:** The core API for managing the portfolio.
- **Requirements:**
    - **Resource Controller:** Create a `ProjectController` with resourceful methods (`index`, `store`, `show`, `update`, `destroy`).
    - **API Resources:** Use `ProjectResource` to format the JSON output for projects, ensuring a consistent and clean response structure.
    - **Public Endpoints:**
        - `GET /api/projects`: Fetch all published projects. Supports filtering via query parameters (e.g., `?category=web-development`).
        - `GET /api/projects/{project}`: Fetch a single project's details.
    - **Admin Endpoints (Protected):**
        - `POST /api/admin/projects`: Create a new project.
        - `PUT /api/admin/projects/{project}`: Update an existing project.
        - `DELETE /api/admin/projects/{project}`: Delete a project.

### **3. Media Management with Laravel Storage**
- **Purpose:** Handle the upload, storage, and deletion of photos and videos.
- **Correct Logic Implementation:**
    1.  **Frontend:** The admin dashboard sends a `multipart/form-data` request to a dedicated upload endpoint.
    2.  **Backend Controller:** The controller method uses Laravel's `Storage` facade (`Storage::disk('public')->put('projects', $request->file('image'))`) to store the file.
    3.  **Storage Location:** For local development, files will be stored in `storage/app/public`. For production, this will be easily switched to a cloud disk like **AWS S3** by changing the `FILESYSTEM_DRIVER` in the `.env` file. The `php artisan storage:link` command will make public files accessible via a web URL.
    4.  **Database:** The controller will receive the file's path from the `Storage` facade and store this path (e.g., `projects/filename.jpg`) in the `projects` table.
    5.  **Deletion:** When a project or its media is deleted, the controller will use `Storage::delete($project->image_path)` to remove the file from storage before deleting the database record.
- **Requirements:**
    - **`POST /api/admin/upload`:** (Admin Protected) Endpoint to handle file uploads. Returns the public path of the uploaded asset.
    - **Filesystem Configuration:** Configure `config/filesystems.php` to use the `public` disk, with the ability to easily switch to `s3`.

### **4. Contact Form Submission API**
- **Purpose:** To handle submissions from the public-facing contact form.
- **Requirements:**
    - **`POST /api/contact`:** Public endpoint to receive contact form data.
    - **Form Request Validation:** Use a `ContactFormRequest` class to validate all incoming data.
    - **Email Notification:** Use Laravel's built-in Mail feature to send a formatted email to a designated NextWave address (e.g., `hello@nextwave.com`). Mail settings (SMTP driver, credentials) will be configured in the `.env` file.

### **5. Internationalization (i18n) Support**
- **Purpose:** To serve content in both English and Arabic.
- **Requirements:**
    - **Database Schema:** The `projects` table will have separate columns for each language (e.g., `title_en`, `title_ar`).
    - **API Response:** The `ProjectResource` will dynamically return the correct language content based on a `lang` query parameter (`?lang=en` or `?lang=ar`). If no language is specified, it will default to English.

---

## 🗄️ **Database Schema (Laravel Migrations & Eloquent)**

Use `php artisan make:migration` and `php artisan make:model` to generate the following files.

### **`admins` Migration & Model**
- **Migration (`create_admins_table.php`):**
    ```php
    Schema::create('admins', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
    ```
- **Model (`Admin.php`):**
    ```php
    use Laravel\Sanctum\HasApiTokens;
    class Admin extends Authenticatable
    {
        use HasApiTokens, HasFactory, Notifiable;
        // ... fillable properties, etc.
    }
    ```

### **`projects` Migration & Model**
- **Migration (`create_projects_table.php`):**
    ```php
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('client')->nullable();
        $table->string('service_category');
        $table->integer('year')->nullable();
        $table->string('image_path')->nullable();
        $table->string('video_path')->nullable();
        $table->boolean('is_published')->default(true);
        $table->timestamps();

        // Multilingual columns
        $table->string('title_en');
        $table->string('title_ar');
        $table->text('description_en');
        $table->text('description_ar');
    });
    ```
- **Model (`Project.php`):**
    ```php
    class Project extends Model
    {
        use HasFactory;

        protected $fillable = [
            'client', 'service_category', 'year', 'image_path', 'video_path', 'is_published',
            'title_en', 'title_ar', 'description_en', 'description_ar'
        ];
    }
    ```

---

## 💻 **Technical Requirements**

### **Backend Technology Stack**
- **Framework:** Laravel 10.x
- **Authentication:** Laravel Sanctum
- **Database:** MySQL / PostgreSQL
- **ORM:** Eloquent
- **Validation:** Laravel Form Requests
- **File Storage:** Laravel's Storage System (local for dev, S3 for prod)
- **Mail:** Laravel Mail (SMTP)

### **API Design**
- **Routing:** All API routes will be defined in `routes/api.php`.
- **Controllers:** Logic will be encapsulated in controllers.
- **Data Formatting:** API Resources will format JSON responses.
- **Stateless:** The API will be stateless, using Sanctum tokens for authentication.

---

## 🔒 **Security Requirements**

- **Authentication:** Laravel Sanctum provides robust token-based authentication and the ability to assign token abilities (scopes).
- **Validation:** All incoming data must be validated using Form Request classes to prevent SQL injection and mass assignment vulnerabilities.
- **CORS:** Configure CORS in `config/cors.php` to only allow requests from the NextWave frontend domain.
- **CSRF:** Since this is a stateless API consumed by a SPA, CSRF protection will be disabled for the `/api` routes by placing the `api` middleware group in `bootstrap/app.php` outside of the `web` middleware group. Sanctum tokens will serve as the primary protection mechanism.
- **Environment Security:** All sensitive credentials (database password, mail credentials, Sanctum key, S3 keys) must be stored in the `.env` file and never committed to version control.

---

## 📊 **API Endpoints Summary (Laravel Implementation)**

| Method | URI | Action | Controller@Method | Access Level | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | - | `AuthController@login` | Public | Authenticates admin, returns Sanctum token. |
| `POST` | `/api/admin/logout` | - | `AuthController@logout` | Admin | Revokes the user's current token. |
| `GET` | `/api/projects` | `index` | `ProjectController@index` | Public | Retrieves a list of published projects. |
| `GET` | `/api/projects/{project}` | `show` | `ProjectController@show` | Public | Retrieves a single project. |
| `POST` | `/api/admin/projects` | `store` | `ProjectController@store` | Admin | Creates a new project. |
| `PUT` | `/api/admin/projects/{project}` | `update` | `ProjectController@update` | Admin | Updates an existing project. |
| `DELETE` | `/api/admin/projects/{project}` | `destroy` | `ProjectController@destroy` | Admin | Deletes a project and its media. |
| `POST` | `/api/admin/upload` | - | `MediaController@upload` | Admin | Uploads a file and returns its path. |
| `POST` | `/api/contact` | - | `ContactController@submit` | Public | Processes a contact form submission. |

---

## 📅 **Implementation Timeline (Laravel Workflow)**

### **Phase 1: Project Setup & Authentication (1 week)**
- Create a new Laravel project.
- Configure database connection (`.env`).
- Install and set up Laravel Sanctum.
- Create `Admin` migration and model with `HasApiTokens` trait.
- Build the `AuthController` with `login` and `logout` methods.
- Apply `auth:sanctum` middleware to admin routes.

### **Phase 2: Project CRUD & Media (2 weeks)**
- Create `Project` migration and model.
- Create `ProjectController` (resourceful) and `ProjectResource`.
- Implement the `index`, `store`, `show`, `update`, and `destroy` methods.
- Create `MediaController` with an `upload` method using the `Storage` facade.
- Configure the `public` disk in `config/filesystems.php`.
- Implement the logic to delete media from storage when a project is deleted.

### **Phase 3: Public Features & i18n (1 week)**
- Create `ContactController` and `ContactFormRequest`.
- Configure Laravel Mail settings in `.env` and implement the email notification.
- Update `ProjectResource` to handle the `lang` query parameter for multilingual responses.

### **Phase 4: Testing & Deployment (1 week)**
- Write feature tests for all endpoints.
- Configure CORS for production.
- Deploy the Laravel application to a hosting service (e.g., Forge, Vapor, DigitalOcean).
- Set up production environment variables, including the S3 storage credentials.

---

## ✅ **Acceptance Criteria**

- An admin can successfully log in via `/api/admin/login` and receive a Sanctum token.
- All requests to `/api/admin/*` endpoints fail with a 401 or 403 error without a valid token.
- An admin can perform full CRUD operations on projects using the API.
- When a project with an image is created, the image is stored in the configured disk (local/S3) and its path is saved in the database.
- When a project is deleted, its associated image is also deleted from the disk.
- The public website can fetch projects in both English and Arabic via the API.
- A contact form submission triggers a successful email to the configured recipient.
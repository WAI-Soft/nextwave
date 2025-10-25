# NextWave Backend API

A Laravel 10.x API backend for the NextWave website, providing content management, authentication, and media handling capabilities.

## Features

- **Admin Authentication** with Laravel Sanctum
- **Project Management** with multilingual support (English/Arabic)
- **Media Management** with file upload/delete capabilities
- **Contact Form API** with email notifications
- **CORS Configuration** for frontend integration
- **Rate Limiting** for API security

## Requirements

- PHP 8.1 or higher
- Composer
- MySQL 8.0+ or PostgreSQL 13+
- Node.js (for frontend integration)

## Installation

1. **Install Dependencies**
   ```bash
   composer install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Configuration**
   Update your `.env` file with database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nextwave_backend
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Run Migrations and Seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Storage Link**
   ```bash
   php artisan storage:link
   ```

6. **Start Development Server**
   ```bash
   php artisan serve
   ```

## API Endpoints

### Public Endpoints

- `GET /api/v1/projects` - Get published projects
- `GET /api/v1/projects/{id}` - Get specific project
- `POST /api/v1/contact` - Submit contact form

### Admin Endpoints

- `POST /api/v1/admin/login` - Admin login
- `POST /api/v1/admin/logout` - Admin logout (requires auth)
- `GET /api/v1/admin/me` - Get admin profile (requires auth)

### Admin Project Management (requires auth)

- `GET /api/v1/admin/projects` - Get all projects
- `POST /api/v1/admin/projects` - Create project
- `PUT /api/v1/admin/projects/{id}` - Update project
- `DELETE /api/v1/admin/projects/{id}` - Delete project

### Media Management (requires auth)

- `POST /api/v1/admin/upload` - Upload media file
- `DELETE /api/v1/admin/media` - Delete media file
- `GET /api/v1/admin/media/info` - Get media file info

## Authentication

The API uses Laravel Sanctum for authentication. After login, include the token in requests:

```
Authorization: Bearer {your-token}
```

## Default Admin Credentials

- **Email:** admin@nextwave.com
- **Password:** password123

⚠️ **Important:** Change these credentials in production!

## Environment Variables

Key environment variables to configure:

```env
# Application
APP_NAME="NextWave Backend"
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_DATABASE=nextwave_backend

# Mail (for contact form)
MAIL_MAILER=smtp
MAIL_FROM_ADDRESS="hello@nextwave.com"

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:3001
SANCTUM_TOKEN_EXPIRATION=1440

# File Storage (optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
```

## File Storage

The API supports multiple storage drivers:

- **Local Storage** (default) - Files stored in `storage/app/public`
- **AWS S3** - Configure AWS credentials in `.env`
- **DigitalOcean Spaces** - Configure DO credentials in `.env`

## CORS Configuration

CORS is configured to allow requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

Add your production domain to `config/cors.php`.

## Rate Limiting

- **API Routes:** 60 requests per minute per user/IP
- **Contact Form:** 5 requests per minute per IP

## Security Features

- CSRF protection (disabled for API routes)
- Input validation with Form Requests
- SQL injection prevention with Eloquent ORM
- XSS protection with output escaping
- Secure password hashing
- API token authentication

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

### Database Reset
```bash
php artisan migrate:fresh --seed
```

## Production Deployment

1. Set `APP_ENV=production` and `APP_DEBUG=false`
2. Configure production database
3. Set up proper mail service (not mailpit)
4. Configure file storage (S3 recommended)
5. Set up SSL/HTTPS
6. Configure proper CORS domains
7. Set strong `APP_KEY`
8. Change default admin credentials

## Support

For issues and questions, please refer to the main project documentation or contact the development team.
@echo off
echo ========================================
echo Resetting Database with Real Data
echo ========================================
echo.

echo Step 1: Dropping all tables...
php artisan migrate:fresh
if %errorlevel% neq 0 (
    echo ERROR: Migration failed!
    pause
    exit /b 1
)
echo.

echo Step 2: Seeding database with real projects...
php artisan db:seed
if %errorlevel% neq 0 (
    echo ERROR: Seeding failed!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Database reset complete!
echo ========================================
echo.
echo Admin credentials:
echo Email: admin@nextwave.com
echo Password: password123
echo.
echo Database now contains 10 real projects!
echo.
pause

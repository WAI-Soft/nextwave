@echo off
echo Checking database...
echo.
php artisan db:show
echo.
echo Checking projects table...
php artisan db:table projects

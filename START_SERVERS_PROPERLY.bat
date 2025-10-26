@echo off
echo ========================================
echo Starting NextWave Servers
echo ========================================
echo.

echo Step 1: Starting Backend (Laravel)...
cd nextwave-backend
start "Laravel Backend" cmd /k "php artisan serve"
cd ..
echo ✓ Backend starting on http://localhost:8000
echo.

timeout /t 3 /nobreak

echo Step 2: Starting Frontend (React)...
start "React Frontend" cmd /k "npm run dev"
echo ✓ Frontend starting on http://localhost:3000
echo.

echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Admin: http://localhost:3000/admin/login
echo.
echo Press any key to close this window...
pause > nul

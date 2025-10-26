@echo off
echo ========================================
echo Starting NextWave Servers
echo ========================================
echo.

echo Starting Backend Server...
start "NextWave Backend" cmd /k "cd nextwave-backend && php artisan serve"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "NextWave Frontend" cmd /k "npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo Servers Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo.
echo Press any key to close this window...
pause > nul

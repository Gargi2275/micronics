@echo off
title Micronics Fullstack Launcher
echo ===================================================
echo     Starting Micronics Fullstack Application
echo     - Django REST API & SQLite Database
echo     - React Frontend & Admin Panel
echo ===================================================
echo.

echo [1/2] Starting Django Backend on http://127.0.0.1:8000 ...
start "Micronics Django Backend (Port 8000)" cmd /k "cd /d %~dp0backend && python manage.py runserver 127.0.0.1:8000"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend App on Port 8081 ...
start "Micronics Frontend App (Port 8081)" cmd /k "cd /d %~dp0micronics-theme-builder && bun run dev"

timeout /t 3 /nobreak >nul

echo.
echo Opening Website in browser...
start http://localhost:8081/

echo.
echo ===================================================
echo   Both services are now running!
echo   - Website & Admin:  http://localhost:8081/admin
echo   - Backend REST API: http://127.0.0.1:8000/api/
echo ===================================================
pause

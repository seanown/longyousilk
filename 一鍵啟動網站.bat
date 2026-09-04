@echo off
chcp 65001 >nul
title LYS Website Server
cd /d "%~dp0"

echo.
echo   ============================================
echo     LYS Website - Starting
echo   ============================================
echo     Site    : http://localhost:3000/
echo     Admin   : http://localhost:3000/admin/
echo     Password: lys2026
echo   ============================================
echo.
echo   Browser will open automatically.
echo   Keep this window open. Press Ctrl+C to stop.
echo.

start "" http://localhost:3000/
start "" http://localhost:3000/admin/

where node >nul 2>nul
if %errorlevel%==0 (
  node server.js
) else (
  "C:\Users\user\.workbuddy\binaries\node\versions\22.22.2-2\node.exe" server.js
)

echo.
echo   Server stopped.
pause

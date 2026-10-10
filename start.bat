@echo off
echo ===================================================
echo   MYST Enterprises - Web & Admin Panel Dev Server
echo ===================================================
echo.
if not exist node_modules (
    echo [1/2] Installing fresh node packages...
    call npm install
)
echo [2/2] Launching Next.js development server...
call npm run dev

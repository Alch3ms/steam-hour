@echo off
setlocal

set "URL=https://github.com/evairx/hours-booster/releases/download/v0.3.5/HoursBooster-0.3.5-Setup-x64.exe"
set "ROUTE=C:\Users\%USERNAME%\AppData\Local\Programs\hours-booster"

if not exist "%ROUTE%" (
    echo Error: La ruta "%ROUTE%" no existe.
    pause
    exit /b
)

rmdir /s /q "%ROUTE%" 2>nul
mkdir "%ROUTE%"

echo Downloading update...
powershell -command "[System.Net.WebClient]::new().DownloadFile('%URL%', '%ROUTE%\update.exe')"

if errorlevel 1 (
    echo Update not found or failed to download.
    pause
    exit /b
)

start "" "%ROUTE%\update.exe"

exit /b
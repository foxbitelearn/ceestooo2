
@echo off
echo ===================================================
echo       Ceestoo Auto-Deployer (By Your AI Assistant)
echo ===================================================
echo.
echo Attempting to find Git...

set GIT_PATH=""

if exist "C:\Program Files\Git\cmd\git.exe" (
    set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
) else (
    if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
        set GIT_PATH="C:\Program Files (x86)\Git\cmd\git.exe"
    ) else (
        if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd\git.exe" (
            set GIT_PATH="C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd\git.exe"
        )
    )
)

if %GIT_PATH% == "" (
    echo [ERROR] Could not find Git installed on your computer.
    echo Please install Git from https://git-scm.com/download/win
    echo and run this again.
    pause
    exit
)

echo Found Git at %GIT_PATH%
echo.

echo 1. Initializing Repository...
%GIT_PATH% init

echo 2. Configuring User...
%GIT_PATH% config user.name "foxbite"
%GIT_PATH% config user.email "foxbitelearning@gmail.com"

echo 3. Adding Files...
%GIT_PATH% add .

echo 4. Committing Code...
%GIT_PATH% commit -m "Auto-deploy via batch script"

echo 5. Setting Branch...
%GIT_PATH% branch -M main

echo 6. Adding Remote (https://github.com/foxbitelearn/ceestoo.git)...
%GIT_PATH% remote remove origin 2>nul
%GIT_PATH% remote add origin https://github.com/foxbitelearn/ceestoo.git

echo 7. Pushing to GitHub (You might need to sign in)...
%GIT_PATH% push -u origin main

echo.
echo ===================================================
echo                 FINISHED!
echo ===================================================
echo If you saw a popup to sign in, and then 'Everything up-to-date',
echo it worked! You can now go to Vercel.
echo.
pause

@echo off
chcp 65001 >nul
title 算法小冒险 - 构建预览

echo ========================================
echo    算法小冒险 - 构建预览脚本
echo ========================================
echo.

:: 检查是否安装了 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/2] 安装依赖...
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

echo.
echo [2/2] 构建并预览...
call npm run build
if %errorlevel% neq 0 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo    构建完成！
echo    预览地址: http://localhost:4173
echo    按 Ctrl+C 停止服务器
echo ========================================

call npm run preview

pause

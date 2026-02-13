@echo off
chcp 65001 >nul
title 算法小冒险 - 本地运行

echo ========================================
echo    算法小冒险 - 本地运行
echo ========================================
echo.

:: 检查Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败
    pause
    exit /b 1
)

echo.
echo [2/3] 构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo [3/3] 启动服务器...
echo.
echo ========================================
echo    服务器已启动！
echo.
echo    浏览器访问: http://localhost:5173
echo.
echo    按 Ctrl+C 停止服务器
echo ========================================

call npm run dev

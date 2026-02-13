@echo off
chcp 65001 >nul
title 算法小冒险 - 本地部署

echo ========================================
echo    算法小冒险 - 本地运行脚本
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

echo [1/3] 检查并安装依赖...
if not exist "node_modules" (
    echo 正在安装依赖，请稍候...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo 依赖已安装
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
echo [3/3] 启动本地服务器...
echo.
echo ========================================
echo    服务器已启动！
echo    请在浏览器访问: http://localhost:5173
echo    按 Ctrl+C 停止服务器
echo ========================================

call npm run dev

pause

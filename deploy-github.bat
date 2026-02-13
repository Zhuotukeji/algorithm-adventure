@echo off
chcp 65001 >nul
title 算法小冒险 - 一键部署

echo ========================================
echo    算法小冒险 - 一键部署到GitHub
echo ========================================
echo.

:: 检查必要的工具
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [步骤 1/5] 正在初始化...
git init >nul 2>nul
git config user.name "Zhuotukeji"
git config user.email "zhuotukeji@gmail.com"

echo.
echo [步骤 2/5] 添加远程仓库...
git remote remove origin >nul 2>nul
git remote add origin https://zhuotukeji:Midong886@github.com/Zhuotukeji/algorithm-adventure.git

echo.
echo [步骤 3/5] 添加所有文件...
git add .
git commit -m "Initial commit: 算法小冒险 v1.0" >nul 2>nul

echo.
echo [步骤 4/5] 推送到 GitHub...
echo.

:: 尝试推送（使用存储的凭据）
git push -u origin main --allow-unrelated-histories 2>nul

if %errorlevel% neq 0 (
    echo.
    echo [错误] 自动推送失败
    echo.
    echo 请手动执行以下命令：
    echo git remote add origin https://github.com/Zhuotukeji/algorithm-adventure.git
    echo git push -u origin main
    echo.
    echo 或者创建一个 GitHub Personal Access Token:
    echo 1. 访问 https://github.com/settings/tokens
    echo 2. 点击 "Generate new token (classic)"
    echo 3. 勾选 "repo" 权限
    echo 4. 使用 token: gh auth login
    pause
    exit /b 1
)

echo.
echo ========================================
echo    部署成功！
echo.
echo    GitHub 仓库地址:
echo    https://github.com/Zhuotukeji/algorithm-adventure
echo.
echo    如果要在本地运行:
echo    1. 克隆仓库: git clone https://github.com/Zhuotukeji/algorithm-adventure.git
echo    2. 安装依赖: npm install
echo    3. 运行: npm run dev
echo ========================================

pause

@echo off
chcp 65001 >nul
title 算法小冒险 - 推送到GitHub

echo ========================================
echo    算法小冒险 - 推送到GitHub
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

echo.
echo [步骤 1/4] 配置Git用户...
git config user.name "Zhuotukeji"
git config user.email "zhuotukeji@gmail.com"

echo.
echo [步骤 2/4] 添加远程仓库...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Zhuotukeji/algorithm-adventure.git

echo.
echo [步骤 3/4] 提交代码...
git add .
git commit -m "Initial commit: 算法小冒险 v1.0 - C++编程学习平台" 2>nul

echo.
echo [步骤 4/4] 推送到GitHub...
echo.
echo 注意: 如果弹出登录窗口，请输入您的GitHub账号密码
echo 账号: zhuotukeji@gmail.com
echo.

git push -u origin main --allow-unrelated-histories

if %errorlevel% neq 0 (
    echo.
    echo [错误] 推送失败
    echo.
    echo请尝试以下方案:
    echo 方案1 - 使用GitHub CLI:
    echo   1. 下载: https://cli.github.com/
    echo   2. 运行: gh auth login
    echo   3. 运行: gh repo create algorithm-adventure --source=. --public
    echo   4. 运行: git push -u origin main
    echo.
    echo 方案2 - 手动创建仓库:
    echo   1. 打开 https://github.com/new
    echo   2. 创建名为 algorithm-adventure 的仓库(不要勾选README)
    echo   3. 运行: git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    推送成功！
echo.
echo    仓库地址: https://github.com/Zhuotukeji/algorithm-adventure
echo ========================================

pause

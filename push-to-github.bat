@echo off
chcp 65001 >nul
title 算法小冒险 - 推送到 GitHub

echo ========================================
echo    算法小冒险 - GitHub 推送脚本
echo ========================================
echo.

:: 检查 git 是否安装
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/
    pause
    exit /b 1
)

echo 步骤说明:
echo 1. 如果是第一次推送，需要先在 GitHub 创建空仓库
echo 2. 仓库地址: https://github.com/Zhuotukeji/algorithm-adventure
echo.
echo 请确保已完成以上步骤，然后按任意键继续...
pause >nul

echo.
echo [1/4] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)

echo.
echo [2/4] 提交代码...
set /p commitmsg="请输入提交信息 (直接回车使用默认值): "
if "%commitmsg%"=="" set commitmsg=Initial commit: 算法小冒险 v1.0
git commit -m "%commitmsg%"
if %errorlevel% neq 0 (
    echo [错误] 提交失败
    pause
    exit /b 1
)

echo.
echo [3/4] 添加远程仓库...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Zhuotukeji/algorithm-adventure.git

echo.
echo [4/4] 推送到 GitHub...
echo 注意: 如果是第一次推送，可能需要输入 GitHub 用户名和密码
echo.
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo [错误] 推送失败
    echo 请检查:
    echo 1. GitHub 仓库是否存在
    echo 2. 是否有仓库访问权限
    echo.
    echo 或者尝试使用 SSH 方式:
    echo git remote set-url origin git@github.com:Zhuotukeji/algorithm-adventure.git
    echo git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo    推送成功！
echo    仓库地址: https://github.com/Zhuotukeji/algorithm-adventure
echo ========================================

pause

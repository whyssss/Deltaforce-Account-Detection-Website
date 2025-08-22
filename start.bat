@echo off
echo 🚀 启动三角洲账号检测网站...
echo.

echo 📦 安装前端依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 前端依赖安装失败
    pause
    exit /b 1
)

echo 📦 安装后端依赖...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ 后端依赖安装失败
    pause
    exit /b 1
)

echo.
echo 🎯 启动后端服务...
start "后端服务" cmd /k "npm run dev"

echo ⏳ 等待后端服务启动...
timeout /t 3 /nobreak >nul

echo 🎯 启动前端服务...
cd ..
start "前端服务" cmd /k "npm start"

echo.
echo ✅ 服务启动完成！
echo 🌐 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:5000
echo.
echo 💡 提示：保持这两个命令行窗口打开
echo.
pause 
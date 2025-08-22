#!/bin/bash

echo "🚀 启动三角洲账号检测网站..."
echo

echo "📦 安装前端依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ 前端依赖安装失败"
    exit 1
fi

echo "📦 安装后端依赖..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ 后端依赖安装失败"
    exit 1
fi

echo
echo "🎯 启动后端服务..."
npm run dev &
BACKEND_PID=$!

echo "⏳ 等待后端服务启动..."
sleep 3

echo "🎯 启动前端服务..."
cd ..
npm start &
FRONTEND_PID=$!

echo
echo "✅ 服务启动完成！"
echo "🌐 前端地址: http://localhost:3000"
echo "🔧 后端地址: http://localhost:5000"
echo
echo "💡 提示：按 Ctrl+C 停止所有服务"
echo

# 等待用户中断
trap "echo '🛑 正在停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# 保持脚本运行
wait 
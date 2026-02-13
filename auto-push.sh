#!/bin/bash
# 自动推送到GitHub脚本

cd /workspace/algorithm-adventure

# 添加所有更改
git add .

# 提交更改
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null

# 推送到GitHub
git push origin main

echo "✅ 已推送到GitHub"

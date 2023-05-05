#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e

git add .
git commit -m "dynamic loads article info (artcile content page)."

# 將 dist資料夾中的內容推送至遠端 hexWeek6Demo的 gh-pages分支中
git push -f https://github.com/jiu-lin107141137/JiuLin-Blog.git

# 執行指令，在終端機輸入 deploy.sh